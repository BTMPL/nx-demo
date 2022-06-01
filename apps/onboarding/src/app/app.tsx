import { Routes, Route, Link } from 'react-router-dom'
import { usePath } from './routingContext';

const Home = () => <p>This is Home of onboarding</p>
const Test = () => <p>This is Test of onboarding</p>


export function App() {
  const { getPath, isShell } = usePath()
  return (
    <div style={{marginTop: '1em'}}>
      This is Onboarding app context:
        <ul>
          <li><Link to={getPath('/')}>onboarding -&gt; home</Link></li>
          <li><Link to={getPath('/test')}>onboarding -&gt; test</Link></li>
          {isShell() && <li><Link to={getPath('/transactions', true)}>transactions </Link></li>}
        </ul>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
    </div>
  );
}

export default App;

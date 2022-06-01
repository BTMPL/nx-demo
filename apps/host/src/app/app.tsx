import * as React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import style from './app.module.css'


const Transactions = React.lazy(() => import('transactions/Module'));

const Onboarding = React.lazy(() => import('onboarding/Module'));

const Home = () => <p>This is root home</p>;

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul className={style['shell-header']}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/transactions">Transactions</NavLink>
        </li>

        <li>
          <NavLink to="/onboarding">Onboarding</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route
          path="/onboarding/*"
          element={<Onboarding basename="onboarding" />}
        />
      </Routes>
    </React.Suspense>
  );
}

export default App;

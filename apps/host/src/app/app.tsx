import * as React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import style from './app.module.css'

import { Redux, RootState, useDispatch, userReducer, useSelector } from '@shell-demo/redux';


const Transactions = React.lazy(() => import('transactions/Module'));

const Onboarding = React.lazy(() => import('onboarding/Module'));

const Home = () => <p>This is root home</p>;

const User = () => {
  const user = useSelector((state: RootState) => state.user.userName)
  const dispatch = useDispatch()
  if (user) {
    return (
      <>
        {user}{' '}
        <button onClick={() => dispatch(userReducer.actions.signOut())}>Sign out</button>
      </>
    );
  } else {
    return <button onClick={() => dispatch(userReducer.actions.signIn('Test'))}>Sign in</button>
  }
}

export function App() {
  return (
    <Redux>
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
          <li><User /></li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />

          <Route
            path="/onboarding/*"
            element={<Onboarding />}
          />
        </Routes>
      </React.Suspense>
    </Redux>
  );
}

export default App;

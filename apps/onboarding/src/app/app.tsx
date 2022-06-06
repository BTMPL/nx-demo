import React from 'react';

import { RootState, useSelector, useDispatch, userReducer, ReduxContext } from '@shell-demo/redux';
import { Routes, Route, Link } from 'react-router-dom'
import { usePath } from './routingContext';
import { createSlice } from '@reduxjs/toolkit';

const Home = () => <p>This is Home of onboarding</p>
const Test = () => <p>This is Test of onboarding</p>

const initialState = {
  form: false,
}

const onboardingReducer = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    toggle: (state) => {
      state.form = !state.form
    }
  },
})

type OnboardingState = RootState & {
  onboardingReducer: typeof initialState
}


export function App() {
  const reduxContext = React.useContext(ReduxContext);
  React.useEffect(() => {
    reduxContext.registerReducers({
      onboardingReducer: onboardingReducer.reducer
    })
  }, [reduxContext])
  const { getPath, isShell } = usePath()
  const user = useSelector((state: RootState) => state.user.userName)
  // the ?. is only needed because the registration is async, and we might not have the reducer at init
  const form = useSelector((state: OnboardingState) => state.onboardingReducer?.form)
  const dispatch = useDispatch();
  return (
    <div style={{marginTop: '1em'}}>
      {!isShell() && <div style={{
        padding: '1rem',
        backgroundColor: '#f7f7f7',
        marginBottom: '1em',
      }}>Moje wlasne menu w trybie standalone</div>}
      This is Onboarding app context. You are {user ? `signed in as ${user} ` : `not signed in`}
      {user && <button onClick={() => dispatch(userReducer.actions.signOut())}>sign out</button>}
        <ul>
          <li><Link to={getPath('/')}>onboarding -&gt; home</Link></li>
          <li><Link to={getPath('/test')}>onboarding -&gt; test</Link></li>
          {isShell() && <li><Link to={getPath('/transactions', true)}>transactions </Link></li>}
        </ul>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>

        <button onClick={() => dispatch(onboardingReducer.actions.toggle())}>toggle form</button>
        {form && <p>Show the big onboarding form...</p>}
    </div>
  );
}

export default App;

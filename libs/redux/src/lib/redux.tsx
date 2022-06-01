import React from 'react'
import styles from './redux.module.css';

import { combineReducers, configureStore, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'

const initialState: {
  userName?: string
} = {
  userName: undefined
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    signOut: (state) => {
      state.userName = undefined
    },
  },
})
export const store = configureStore({
  reducer: {
    user: userReducer.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


const ReduxContext = React.createContext({
  registerReducers: (customReducers: Record<string, unknown>) => { return },
})


function Redux(props: { children: React.ReactElement}) {
  const [reducers, setReducers] = React.useState({
    user: userReducer.reducer
  })
  const registerReducers = React.useCallback((customReducers: Record<string, any>) => {
    setReducers((currentReducers) => {
      const newReducers = {
      ...currentReducers,
      ...customReducers,
    }
    store.replaceReducer(combineReducers(newReducers))

    return newReducers
    })
  }, [])

  const value = React.useMemo(() => ({
    registerReducers
  }), [registerReducers])
  return (
    <ReduxContext.Provider value={value}>
      <Provider store={store}>{props.children}</Provider>
    </ReduxContext.Provider>
  );
}

export {
  ReduxContext,
  Redux,
  useSelector,
  useDispatch,
  userReducer,
}
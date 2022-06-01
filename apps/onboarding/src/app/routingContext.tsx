import React from "react";
import config from '../../module-federation.config'


const Context = React.createContext({
  path: config.path
})


export const RouteProvider = ({children}: {children: React.ReactElement}) => {
  return <Context.Provider value={{path: '/'}}>{children}</Context.Provider>
}

export const usePath = () => {
  const ctx = React.useContext(Context);
  return {
    getPath: (to: string, root = false) => `${root ? '' : ctx.path}${to}`,
    isShell: () => ctx.path !== '/'
  }
}
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import Store from "./store/store"
import AppRouter from './components/AppRouter/AppRouter';
import Notification from 'store/notification';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    store: new Store(),
    notification: new Notification()
  }}>
    <AppRouter />
  </Context.Provider>
);


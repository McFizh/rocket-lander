import React from 'react';

type props = {
  children: JSX.Element;
};

type context = {
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StoreContext = React.createContext<context>({
  running: false,
  setRunning: () => {},
});

const Store = ({ children }: props) => {

  const [running, setRunning] = React.useState(false);

  const store = {
    running,
    setRunning
  };

  return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};

export default Store;
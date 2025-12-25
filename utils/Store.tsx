import React from 'react';

type props = {
  children: JSX.Element;
};

type context = {
  running: boolean;
  fuel: number;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setFuel: React.Dispatch<React.SetStateAction<number>>;
};

export const StoreContext = React.createContext<context>({
  running: false,
  fuel: 100,
  setRunning: () => {},
  setFuel: () => {},
});

const Store = ({ children }: props) => {

  const [running, setRunning] = React.useState(false);
  const [fuel, setFuel] = React.useState(100);

  const store = {
    running, setRunning,
    fuel, setFuel
  };

  return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};

export default Store;
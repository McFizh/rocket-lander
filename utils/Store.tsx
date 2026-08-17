import React from 'react';

type props = {
  children: React.ReactNode;
};

type context = {
  running: boolean;
  fuel: number;
  error: string | null;
  elapsedSeconds: number;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setFuel: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setElapsedSeconds: React.Dispatch<React.SetStateAction<number>>;
};

export const StoreContext = React.createContext<context>({
  running: false,
  fuel: 100,
  error: null,
  elapsedSeconds: 0,
  setRunning: () => {},
  setFuel: () => {},
  setError: () => {},
  setElapsedSeconds: () => {},
});

const Store = ({ children }: props) => {

  const [running, setRunning] = React.useState(false);
  const [fuel, setFuel] = React.useState(100);
  const [error, setError] = React.useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

  const store = {
    running, setRunning,
    fuel, setFuel,
    error, setError,
    elapsedSeconds, setElapsedSeconds
  };

  return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};

export default Store;
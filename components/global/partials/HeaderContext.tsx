"use client"
import {createContext, useContext, useEffect, useState} from "react";
import {usePathname} from "next/navigation";

interface PathnameContextProps {
  currentPathname: string;
  previousPathname: string | null;
}

const PathnameContext = createContext<PathnameContextProps | undefined>(undefined);

export const PathnameProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const nextPathname = usePathname();
  const [currentPathname, setCurrentPathname] = useState<string>(nextPathname);
  const [previousPathname, setPreviousPathname] = useState<string | null>(null);

  useEffect(() => {
    if (currentPathname !== nextPathname) {
      setPreviousPathname(currentPathname);
      setCurrentPathname(nextPathname);
    }
  }, [nextPathname, currentPathname]);

  return (
    <PathnameContext.Provider value={{currentPathname, previousPathname}}>
      {children}
    </PathnameContext.Provider>
  );
};


export const useGlobalPathname = () => {
  const context = useContext(PathnameContext);
  if (!context) {
    throw new Error('usePathname must be used within a PathnameProvider');
  }
  return context;
};

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from "react";

interface CurtainContextValue {
  showCurtain: (onClose?: () => void) => void;
  hideCurtain: () => void;
}

interface CurtainProviderProps {
  children: React.ReactNode;
}

const CurtainContext = createContext<CurtainContextValue | undefined>(
  undefined
);

export const useCourtain = () => {
  const context = useContext(CurtainContext);
  if (!context) {
    throw new Error("useCurtain must be used within a CurtainProvider");
  }
  return context;
};

export const CurtainProvider: React.FC<CurtainProviderProps> = ({
  children,
}) => {
  const [isCurtainOpen, setCurtainOpen] = useState(false);
  const [onCloseCallback, setOnCloseCallback] = useState<
    (() => void) | undefined
  >(undefined);

  const showCurtain = useCallback((onClose?: () => void) => {
    setCurtainOpen(true);
    setOnCloseCallback(() => onClose);
  }, []);

  const hideCurtain = useCallback(() => {
    setCurtainOpen(false);
    if (onCloseCallback) {
      onCloseCallback();
      setOnCloseCallback(undefined);
    }
  }, [onCloseCallback]);

  return (
    <CurtainContext.Provider value={{ showCurtain, hideCurtain }}>
      {children}
      {isCurtainOpen && <div className="curtain" onClick={hideCurtain} />}
    </CurtainContext.Provider>
  );
};

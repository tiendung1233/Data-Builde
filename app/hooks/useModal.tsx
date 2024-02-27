import React, { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextProps {
  modalState: Record<string, boolean>;
  setModalState: (key: string, value: boolean) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<Record<string, boolean>>({});

  const contextValue: ModalContextProps = {
    modalState,
    setModalState: (key: string, value: boolean) => {
      setModalState((prev) => ({ ...prev, [key]: value }));
    },
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

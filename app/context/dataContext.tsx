// Create a file named context.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface AppState {
  orders: any[];
  products: any[];
  customers: any[];
}

interface DataContextProps {
  state: AppState;
  dispatch: React.Dispatch<any>; // Replace 'any' with the actual type for the actions
}

const initialState: AppState = {
  orders: [],
  products: [],
  customers: [],
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

const appReducer = (state: AppState, action: any): AppState => {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CUSTOMERS":
      return { ...state, customers: action.payload };
    default:
      return state;
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within an AppProvider");
  }
  return context;
};

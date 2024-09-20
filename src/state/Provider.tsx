import React, { createContext, useContext, useState } from "react";


export interface GlobalState {
 
  searchDrawer: boolean;
  setSearchDrawer: React.Dispatch<React.SetStateAction<boolean>>;


  isProductSerach: boolean;
  setIsProductSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<GlobalState>({


  searchDrawer: false,
  setSearchDrawer: () => { },


  isProductSerach: false,
  setIsProductSearch: () => { }

});

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  

  const [searchDrawer, setSearchDrawer] = useState(false);

  const [isProductSerach, setIsProductSearch] = useState(false);


  const allState: GlobalState = {

    searchDrawer,
    setSearchDrawer,

    isProductSerach,
    setIsProductSearch

  };

  return (
    <Context.Provider value={allState}>
      {children}
    </Context.Provider>
  )
};

export const useGlobalState = (): GlobalState => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }

  return context;
};

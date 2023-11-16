import React, { createContext, useState, useEffect } from 'react';
import storage from '@app/utils/storage';


interface LastSelectedProductSizeContextState {
  lastSelectedProductSize: string | null;
  setLastSelectedProductSize: (size: string | null) => void;
}


const defaultContextValue: LastSelectedProductSizeContextState = {
  lastSelectedProductSize: null,
  setLastSelectedProductSize: () => {}, 
};


export const lastSelectedProductSizeContext = createContext<LastSelectedProductSizeContextState>(defaultContextValue);
export const LastSelectedProductSizeProvider = ({ children }) => {
  const [lastSelectedProductSize, setLastSelectedProductSize] = useState(null);

  useEffect(() => {
    try {
      const size = storage.getString('lastSelectedProductSize');
      if (size) {
        setLastSelectedProductSize(JSON.parse(size));
      }
    } catch {}
  }, []);

  const updateLastSelectedProductSize = (size) => {
    setLastSelectedProductSize(size);
    storage.set('lastSelectedProductSize', JSON.stringify(size));
  };

  return (
    <lastSelectedProductSizeContext.Provider
      value={{
        lastSelectedProductSize,
        setLastSelectedProductSize: updateLastSelectedProductSize,
      }}
    >
      {children}
    </lastSelectedProductSizeContext.Provider>
  );
};

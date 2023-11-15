import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const lastSelectedProductSizeContext = createContext();

export const LastSelectedProductSizeProvider = ({ children }) => {
  const [lastSelectedProductSize, setLastSelectedProductSize] = useState(null);

  useEffect(() => {
    try {
      AsyncStorage.getItem('lastSelectedProductSize').then((size) => {
        setLastSelectedProductSize(JSON.parse(size));
      });
    } catch {}
  }, []);

  return (
    <lastSelectedProductSizeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        lastSelectedProductSize,
        setLastSelectedProductSize,
      }}
    >
      {children}
    </lastSelectedProductSizeContext.Provider>
  );
};

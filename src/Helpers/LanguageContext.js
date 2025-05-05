// LanguageContext.js
import React, {createContext, useState, useContext, useEffect} from 'react';
import {I18nManager} from 'react-native';
import {AsyncStorage} from 'react-native';
import {getRTL} from './RTLUtil';

const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState(getRTL() ? 'ar' : 'en'); // Default language is English

  useEffect(() => {
    // Load the selected language from storage (if available)
    AsyncStorage.getItem('appLanguage').then(storedLanguage => {
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    });
  }, []);

  const switchLanguage = async newLanguage => {
    try {
      // Save the selected language to storage
      await AsyncStorage.setItem('appLanguage', getRTL() ? 'ar' : 'en');
      setLanguage(newLanguage);

      // Set the RTL layout direction for Arabic
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{language, switchLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

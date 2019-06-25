import React, { createContext, useState, useContext } from 'react';

const SearchTermContext = createContext('');
const SearchTermSetterContext = createContext();

const SearchTermProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchTermContext.Provider value={searchTerm}>
      <SearchTermSetterContext.Provider value={setSearchTerm}>
        {children}
      </SearchTermSetterContext.Provider>
    </SearchTermContext.Provider>
  );
};

const useSearchTerm = () => {
  const searchTerm = useContext(SearchTermContext);
  if (searchTerm === undefined) {
    throw new Error('useSearchTerm must be called within a SearchTermProvider');
  }
  return searchTerm;
};

const useSearchTermSetter = () => {
  const setSearchTerm = useContext(SearchTermSetterContext);
  if (setSearchTerm === undefined) {
    throw new Error(
      'useSearchTermSetter must be called within a SearchTermProvider'
    );
  }
  return setSearchTerm;
};

export { SearchTermProvider, useSearchTerm, useSearchTermSetter };

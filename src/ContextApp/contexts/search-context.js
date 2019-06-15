import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();
const SearchSetterContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={searchTerm}>
      <SearchSetterContext.Provider value={setSearchTerm}>
        {children}
      </SearchSetterContext.Provider>
    </SearchContext.Provider>
  );
};

const useSearchTerm = () => {
  const search = useContext(SearchContext);
  if (search === undefined) {
    throw new Error('useSearchTerm must be called within a SearchProvider');
  }
  return search;
};

const useSearchTermSetter = () => {
  const setSearch = useContext(SearchSetterContext);
  if (setSearch === undefined) {
    throw new Error('useSearchTermSetter must be called within a searchTerm');
  }
  return setSearch;
};

export { SearchProvider, useSearchTerm, useSearchTermSetter };

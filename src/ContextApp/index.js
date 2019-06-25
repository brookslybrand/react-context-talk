import React from 'react';

import Header from './components/Header';
import Body from './components/Body';

import fakeData from 'fake-data';
import { SearchTermProvider, useSearchTerm } from './contexts/search-context';
import { ExpandedProvider } from './contexts/expanded-context';
import { ItemsProvider, useItems } from './contexts/items-context';

const App = () => {
  const items = useItems();
  const searchTerm = useSearchTerm();

  const filteredItems = items.filter(({ title }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ExpandedProvider items={items}>
      <div>
        <Header items={items} filteredItems={filteredItems} />
        <Body items={filteredItems} searchTerm={searchTerm} />
      </div>
    </ExpandedProvider>
  );
};

const NoContextApp = () => (
  <SearchTermProvider>
    <ItemsProvider items={fakeData}>
      <App />
    </ItemsProvider>
  </SearchTermProvider>
);

export default NoContextApp;

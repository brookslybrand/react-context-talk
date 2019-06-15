import React, { useReducer } from 'react';

import Header from './components/Header';
import Body from './components/Body';

import fakeData from 'fake-data';
import {
  itemsReducer,
  setItemTitle,
  addItem,
  deleteItem,
  setSubItemAttribute,
  addSubItem,
  deleteSubItem
} from './items-state';
import { SearchProvider, useSearchTerm } from './contexts/search-context';
import { ExpandedProvider } from './contexts/expanded-context';

const App = () => {
  const [items, dispatch] = useReducer(itemsReducer, fakeData);
  const searchTerm = useSearchTerm();

  const handleSetItemTitle = itemId => title =>
    dispatch(setItemTitle(itemId)(title));

  const handleAddItem = itemId => after => dispatch(addItem(itemId)(after));

  const handleDeleteItem = itemId => dispatch(deleteItem(itemId));

  const handleSetSubItemTitle = itemId => subItemId => title => {
    dispatch(setSubItemAttribute(itemId)(subItemId)({ title: title }));
  };

  const handleSetSubItemBody = itemId => subItemId => body =>
    dispatch(setSubItemAttribute(itemId)(subItemId)({ body }));

  const handleAddSubItem = itemId => subItemId => after =>
    dispatch(addSubItem(itemId)(subItemId)(after));

  const handleDeleteSubItem = itemId => subItemId => {
    dispatch(deleteSubItem(itemId)(subItemId));
  };

  const filteredItems = items.filter(({ title }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ExpandedProvider items={items}>
      <div>
        <Header items={items} filteredItems={filteredItems} />
        <Body
          items={filteredItems}
          searchTerm={searchTerm}
          setItemTitle={handleSetItemTitle}
          addItem={handleAddItem}
          deleteItem={handleDeleteItem}
          setSubItemTitle={handleSetSubItemTitle}
          setSubItemBody={handleSetSubItemBody}
          addSubItem={handleAddSubItem}
          deleteSubItem={handleDeleteSubItem}
        />
      </div>
    </ExpandedProvider>
  );
};

const ContextApp = () => (
  <SearchProvider>
    <App />
  </SearchProvider>
);

export default ContextApp;

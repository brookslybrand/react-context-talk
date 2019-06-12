import React, { useReducer, useState } from 'react';

import Header from 'NoContextApp/components/Header';
import Body from 'NoContextApp/components/Body';

import fakeData from 'NoContextApp/state/fake-data';
import {
  itemsReducer,
  init,
  setAllExpanded,
  setItemTitle,
  addItem,
  deleteItem,
  setSubItemAttribute,
  addSubItem,
  deleteSubItem,
  toggleItemExpanded,
  toggleSubItemExpanded
} from 'NoContextApp/state/items-state';

const NoContextApp = () => {
  const [items, dispatch] = useReducer(itemsReducer, fakeData, init);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSetAllExpanded = expanded => dispatch(setAllExpanded(expanded));

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

  const handleToggleItemExpanded = itemIds =>
    dispatch(toggleItemExpanded(itemIds));

  const handleToggleSubItemExpanded = itemId => subItemIds =>
    dispatch(toggleSubItemExpanded(itemId)(subItemIds));

  const filteredItems = items.filter(({ title }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header
        items={items}
        filteredItems={filteredItems}
        setAllExpanded={handleSetAllExpanded}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Body
        items={filteredItems}
        setItemTitle={handleSetItemTitle}
        addItem={handleAddItem}
        deleteItem={handleDeleteItem}
        setSubItemTitle={handleSetSubItemTitle}
        setSubItemBody={handleSetSubItemBody}
        addSubItem={handleAddSubItem}
        deleteSubItem={handleDeleteSubItem}
        toggleItemExpanded={handleToggleItemExpanded}
        toggleSubItemExpanded={handleToggleSubItemExpanded}
      />
    </div>
  );
};

export default NoContextApp;
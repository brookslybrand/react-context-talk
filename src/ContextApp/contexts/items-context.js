import React, { createContext, useReducer, useContext } from 'react';

import { findIndexById, createItem, createSubItem } from 'helpers';

const ItemsContext = createContext();
const ItemsDispatchContext = createContext();

const ItemsProvider = ({ items: originalItems, children }) => {
  const [items, itemsDispatch] = useReducer(itemsReducer, originalItems);

  return (
    <ItemsContext.Provider value={items}>
      <ItemsDispatchContext.Provider value={itemsDispatch}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  );
};

const useItems = () => {
  const items = useContext(ItemsContext);
  if (items === undefined) {
    throw new Error('useItems must be called inside of an ItemsProvider');
  }
  return items;
};

const useItemsDispatch = () => {
  const itemsDispatch = useContext(ItemsDispatchContext);
  if (itemsDispatch === undefined) {
    throw new Error(
      'useItemsDispatch must be called inside of an ItemsProvider'
    );
  }
  return itemsDispatch;
};

const SET_ITEM_TITLE = 'SET_ITEM_TITLE';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const SET_SUB_ITEM_ATTRIBUTE = 'SET_SUB_ITEM_ATTRIBUTE';
const ADD_SUB_ITEM = 'ADD_SUB_ITEM';
const DELETE_SUB_ITEM = 'DELETE_SUB_ITEM';

const itemsReducer = (items, action) => {
  switch (action.type) {
    case SET_ITEM_TITLE: {
      const { itemId, title } = action;
      const itemIndex = findIndexById(items)(itemId);
      // bail if item not found
      if (itemIndex === -1) return items;
      const item = items[itemIndex];
      const itemsCopy = [...items];
      itemsCopy.splice(itemIndex, 1, { ...item, title });
      return itemsCopy;
    }
    case ADD_ITEM: {
      const { itemId, after } = action;
      const itemIndex = findIndexById(items)(itemId);
      const itemsCopy = [...items];
      const newItem = createItem(itemsCopy);
      // if after === true, add the new index after the item
      itemsCopy.splice(itemIndex + (after ? 1 : 0), 0, newItem);
      return itemsCopy;
    }
    case DELETE_ITEM: {
      const { itemId } = action;
      const itemIndex = findIndexById(items)(itemId);
      // bail if item not found
      if (itemIndex === -1) return items;
      const itemsCopy = [...items];
      itemsCopy.splice(itemIndex, 1);
      return itemsCopy;
    }
    case SET_SUB_ITEM_ATTRIBUTE: {
      const { itemId, subItemId, attribute } = action;
      const itemIndex = findIndexById(items)(itemId);
      // bail if item not found
      if (itemIndex === -1) return items;
      const item = items[itemIndex];
      const subItemsCopy = [...item.subItems];
      const subItemIndex = findIndexById(subItemsCopy)(subItemId);
      const subItem = subItemsCopy[subItemIndex];
      subItemsCopy.splice(subItemIndex, 1, { ...subItem, ...attribute });
      const itemsCopy = [...items];
      const newItem = { ...item, subItems: subItemsCopy };
      itemsCopy.splice(itemIndex, 1, newItem);
      return itemsCopy;
    }
    case ADD_SUB_ITEM: {
      const { itemId, subItemId, after } = action;
      const itemIndex = findIndexById(items)(itemId);
      // bail if item not found
      if (itemIndex === -1) return items;
      const itemsCopy = [...items];
      const item = itemsCopy[itemIndex];
      const subItemsCopy = [...item.subItems];
      const subItemIndex = findIndexById(subItemsCopy)(subItemId);
      const newSubItem = createSubItem(subItemsCopy);
      // if after === true, add the new index after the subItem
      subItemsCopy.splice(subItemIndex + (after ? 1 : 0), 0, newSubItem);
      itemsCopy.splice(itemIndex, 1, {
        ...item,
        subItems: subItemsCopy
      });
      return itemsCopy;
    }
    case DELETE_SUB_ITEM: {
      const { itemId, subItemId } = action;
      const itemIndex = findIndexById(items)(itemId);
      // bail if item not found
      if (itemIndex === -1) return items;
      const itemsCopy = [...items];
      const item = itemsCopy[itemIndex];
      const subItemsCopy = [...item.subItems];
      const subItemIndex = findIndexById(subItemsCopy)(subItemId);
      subItemsCopy.splice(subItemIndex, 1);
      itemsCopy.splice(itemIndex, 1, { ...item, subItems: subItemsCopy });
      return itemsCopy;
    }
    default: {
      return items;
    }
  }
};

// actions

const setItemTitle = itemId => title => ({
  type: SET_ITEM_TITLE,
  itemId,
  title
});

const addItem = itemId => after => ({
  type: ADD_ITEM,
  itemId,
  after
});

const deleteItem = itemId => ({
  type: DELETE_ITEM,
  itemId
});

const setSubItemAttribute = itemId => subItemId => attribute => ({
  type: SET_SUB_ITEM_ATTRIBUTE,
  itemId,
  subItemId,
  attribute
});

const addSubItem = itemId => subItemId => after => ({
  type: ADD_SUB_ITEM,
  itemId,
  subItemId,
  after
});

const deleteSubItem = itemId => subItemId => ({
  type: DELETE_SUB_ITEM,
  itemId,
  subItemId
});

export {
  ItemsProvider,
  useItems,
  useItemsDispatch,
  setItemTitle,
  addItem,
  deleteItem,
  setSubItemAttribute,
  addSubItem,
  deleteSubItem
};

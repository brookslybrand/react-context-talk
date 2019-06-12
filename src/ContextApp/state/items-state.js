import { findIndexById, createItem, createSubItem } from './helpers';

const SET_ALL_EXPANDED = 'SET_ALL_EXPANDED';
const SET_ITEM_TITLE = 'SET_ITEM_TITLE';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const SET_SUB_ITEM_ATTRIBUTE = 'SET_SUB_ITEM_ATTRIBUTE';
const ADD_SUB_ITEM = 'ADD_SUB_ITEM';
const DELETE_SUB_ITEM = 'DELETE_SUB_ITEM';
const TOGGLE_ITEM_EXPANDED = 'TOGGLE_ITEM_EXPANDED';
const TOGGLE_SUB_ITEM_EXPANDED = 'TOGGLE_SUB_ITEM_EXPANDED';

const itemsReducer = (items, action) => {
  switch (action.type) {
    case SET_ALL_EXPANDED: {
      const { expanded } = action;
      return items.map(item => {
        const newSubItems = item.subItems.map(subItem => ({
          ...subItem,
          expanded
        }));
        return { ...item, subItems: newSubItems, expanded };
      });
    }
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
      // bail if item not found
      if (itemIndex === -1) return items;
      const itemsCopy = [...items];
      const newItem = { ...createItem(itemsCopy), expanded: DEFAULT_EXPANDED };
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
      const newSubItem = {
        ...createSubItem(subItemsCopy),
        expanded: DEFAULT_EXPANDED
      };
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
    case TOGGLE_ITEM_EXPANDED: {
      const { itemIds } = action;
      return items.map(item => {
        const expanded = itemIds.includes(item.id);
        const subItems = expanded
          ? item.subItems
          : item.subItems.map(item => ({ ...item, expanded }));
        return {
          ...item,
          expanded,
          subItems
        };
      });
    }
    case TOGGLE_SUB_ITEM_EXPANDED: {
      const { itemId, subItemIds } = action;
      const itemIndex = findIndexById(items)(itemId);
      // bail if item not found
      if (itemIndex === -1) return items;
      const item = items[itemIndex];
      const newSubItems = item.subItems.map(subItem => ({
        ...subItem,
        expanded: subItemIds.includes(subItem.id)
      }));
      const itemsCopy = [...items];
      const newItem = { ...item, subItems: newSubItems };
      itemsCopy.splice(itemIndex, 1, newItem);
      return itemsCopy;
    }
    default: {
      return items;
    }
  }
};

const DEFAULT_EXPANDED = true;

const init = initialState =>
  initialState.map(item => {
    const updatedSubItems = item.subItems.map(subItem => ({
      ...subItem,
      expanded: DEFAULT_EXPANDED
    }));
    const updatedItem = {
      ...item,
      subItems: updatedSubItems,
      expanded: DEFAULT_EXPANDED
    };
    return updatedItem;
  });

// actions

const setAllExpanded = expanded => ({
  type: SET_ALL_EXPANDED,
  expanded
});

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

const toggleItemExpanded = itemIds => ({
  type: TOGGLE_ITEM_EXPANDED,
  itemIds
});

const toggleSubItemExpanded = itemId => subItemIds => ({
  type: TOGGLE_SUB_ITEM_EXPANDED,
  itemId,
  subItemIds
});

export {
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
};

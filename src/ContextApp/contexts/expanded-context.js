import React, {
  createContext,
  useReducer,
  useRef,
  useEffect,
  useContext
} from 'react';

export const DEFAULT_EXPANDED = true;

const ExpandedContext = createContext('');
const ExpandedDispatchContext = createContext();

const ExpandedProvider = ({ items, children }) => {
  const oldItemsRef = useRef(items);
  const [expandedItems, expandedItemsDispatch] = useReducer(
    expandedReducer,
    expandAll(items)(DEFAULT_EXPANDED)
  );

  // any time the original items update, figure out what changed
  useEffect(() => {
    const oldItems = oldItemsRef.current;
    const newItemIds = new Set(items.map(({ id }) => id));
    const prevItemIds = new Set(oldItems.map(({ id }) => id));

    items.forEach(({ id }) => {
      // if the item was added, add it to the state
      if (!prevItemIds.has(id)) {
        expandedItemsDispatch({ type: ADD_ID, itemId: id });
      }
    });

    oldItems.forEach(({ id }) => {
      // if the item was removed, remove it from the state
      if (!newItemIds.has(id)) {
        expandedItemsDispatch({ type: DELETE_ID, itemId: id });
      }
    });

    oldItemsRef.current = items;
  }, [items]);

  return (
    <ExpandedContext.Provider value={expandedItems}>
      <ExpandedDispatchContext.Provider value={expandedItemsDispatch}>
        {children}
      </ExpandedDispatchContext.Provider>
    </ExpandedContext.Provider>
  );
};

const useExpanded = () => {
  const expandedItems = useContext(ExpandedContext);
  if (expandedItems === undefined) {
    throw new Error('useExpanded must be called within a ExpandedProvider');
  }
  return expandedItems;
};

const useExpandedDispatch = () => {
  const expandedItemsDispatch = useContext(ExpandedDispatchContext);
  if (expandedItemsDispatch === undefined) {
    throw new Error(
      'useExpandedDispatch must be called within a expandedItems'
    );
  }
  return expandedItemsDispatch;
};

const SET_ALL_EXPANDED = 'SET_ALL_EXPANDED';
const SET_EXPANDED_ITEMS = 'SET_EXPANDED_ITEMS';
const ADD_ID = 'ADD_ID';
const DELETE_ID = 'DELETE_ID';

const expandedReducer = (state, action) => {
  switch (action.type) {
    case SET_ALL_EXPANDED: {
      return expandAll(action.items)(action.expanded);
    }
    case SET_EXPANDED_ITEMS: {
      const { itemIds } = action;
      const someExpanded = !!itemIds.length;
      return { ...state, someExpanded, items: itemIds };
    }
    case ADD_ID: {
      const { itemId } = action;
      const items = DEFAULT_EXPANDED ? state.items.concat(itemId) : state.items;

      const someExpanded = !!items.length;
      return { ...state, items, someExpanded };
    }
    case DELETE_ID: {
      const { itemId } = action;
      const items = [...state.items];
      // if the item was expanded, remove it
      const itemIndex = items.findIndex(id => id === itemId);
      if (itemIndex !== -1) items.splice(itemIndex, 1);

      const someExpanded = !!items.length;
      return { ...state, items, someExpanded };
    }
    default: {
      return state;
    }
  }
};

const expandAll = items => expanded => {
  const itemIds = items.map(({ id }) => id);
  return {
    someExpanded: expanded,
    items: expanded ? itemIds : []
  };
};

const setAllExpanded = items => expanded => ({
  type: SET_ALL_EXPANDED,
  items,
  expanded
});

const setExpandedItems = itemIds => ({
  type: SET_EXPANDED_ITEMS,
  itemIds
});

export {
  ExpandedProvider,
  useExpanded,
  useExpandedDispatch,
  setAllExpanded,
  setExpandedItems
};

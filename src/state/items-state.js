const SET_ALL_EXPANDED = 'SET_ALL_EXPANDED'
const SET_ITEM_TITLE = 'SET_ITEM_TITLE'
const SET_SUB_ITEM_TITLE = 'SET_SUB_ITEM_TITLE'
const SET_SUB_ITEM_DESCRIPTION = 'SET_SUB_ITEM_DESCRIPTION'
const TOGGLE_ITEM_EXPANDED = 'TOGGLE_ITEM_EXPANDED'
const TOGGLE_SUB_ITEM_EXPANDED = 'TOGGLE_SUB_ITEM_EXPANDED'

const itemsReducer = (items, action) => {
  switch (action.type) {
    case SET_ALL_EXPANDED: {
      const { expanded } = action
      return items.map(item => {
        const newSubItems = item.subItems.map(subItem => ({
          ...subItem,
          expanded
        }))
        return { ...item, subItems: newSubItems, expanded }
      })
    }
    case SET_ITEM_TITLE: {
      const { itemId, title } = action
      const itemIndex = findIndexById(items)(itemId)
      // bail if item not found
      if (itemIndex === -1) return items
      const item = items[itemIndex]
      const itemsCopy = [...items]
      itemsCopy.splice(itemIndex, 1, { ...item, title })
      return itemsCopy
    }
    case SET_SUB_ITEM_TITLE: {
      const { itemId, subItemId, title } = action
      const itemIndex = findIndexById(items)(itemId)
      // bail if item not found
      if (itemIndex === -1) return items
      const item = items[itemIndex]
      const subItemsCopy = [...item.subItems]
      const subItemIndex = findIndexById(subItemsCopy)(subItemId)
      const subItem = subItemsCopy[subItemIndex]
      subItemsCopy.splice(subItemIndex, 1, { ...subItem, title })
      const itemsCopy = [...items]
      const newItem = { ...item, subItems: subItemsCopy }
      itemsCopy.splice(itemIndex, 1, newItem)
      return itemsCopy
    }
    case SET_SUB_ITEM_DESCRIPTION: {
      const { itemId, subItemId, description } = action
      const itemIndex = findIndexById(items)(itemId)
      // bail if item not found
      if (itemIndex === -1) return items
      const item = items[itemIndex]
      const subItemsCopy = [...item.subItems]
      const subItemIndex = findIndexById(subItemsCopy)(subItemId)
      const subItem = subItemsCopy[subItemIndex]
      subItemsCopy.splice(subItemIndex, 1, { ...subItem, description })
      const itemsCopy = [...items]
      const newItem = { ...item, subItems: subItemsCopy }
      itemsCopy.splice(itemIndex, 1, newItem)
      return itemsCopy
    }
    case TOGGLE_ITEM_EXPANDED: {
      const { itemIds } = action
      return items.map(item => {
        const expanded = itemIds.includes(item.id)
        const subItems = expanded
          ? item.subItems
          : item.subItems.map(item => ({ ...item, expanded }))
        return {
          ...item,
          expanded,
          subItems
        }
      })
    }
    case TOGGLE_SUB_ITEM_EXPANDED: {
      const { itemId, subItemIds } = action
      const itemIndex = findIndexById(items)(itemId)
      // bail if item not found
      if (itemIndex === -1) return items
      const item = items[itemIndex]
      const newSubItems = item.subItems.map(subItem => ({
        ...subItem,
        expanded: subItemIds.includes(subItem.id)
      }))
      const itemsCopy = [...items]
      const newItem = { ...item, subItems: newSubItems }
      itemsCopy.splice(itemIndex, 1, newItem)
      return itemsCopy
    }
    default: {
      return items
    }
  }
}

const init = initialState =>
  initialState.map(item => {
    const updatedSubItems = item.subItems.map(subItem => ({
      ...subItem,
      expanded: false
    }))
    const updatedItem = { ...item, subItems: updatedSubItems, expanded: false }
    return updatedItem
  })

const findIndexById = arr => idToFind =>
  arr.findIndex(({ id }) => id === idToFind)

// actions

const setAllExpanded = expanded => ({
  type: SET_ALL_EXPANDED,
  expanded
})

const setItemTitle = itemId => title => ({
  type: SET_ITEM_TITLE,
  itemId,
  title
})

const setSubItemTitle = itemId => subItemId => title => ({
  type: SET_SUB_ITEM_TITLE,
  itemId,
  subItemId,
  title
})

const setSubItemDescription = itemId => subItemId => description => ({
  type: SET_SUB_ITEM_DESCRIPTION,
  itemId,
  subItemId,
  description
})

const toggleItemExpanded = itemIds => ({
  type: TOGGLE_ITEM_EXPANDED,
  itemIds
})

const toggleSubItemExpanded = itemId => subItemIds => ({
  type: TOGGLE_SUB_ITEM_EXPANDED,
  itemId,
  subItemIds
})

export {
  itemsReducer,
  init,
  setAllExpanded,
  setSubItemTitle,
  setSubItemDescription,
  setItemTitle,
  toggleItemExpanded,
  toggleSubItemExpanded
}

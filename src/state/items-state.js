const SET_ALL_EXPANDED = 'SET_ALL_EXPANDED'
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
  toggleItemExpanded,
  toggleSubItemExpanded
}

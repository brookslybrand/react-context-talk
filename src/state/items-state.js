const itemsReducer = (state, action) => {
  switch (action.type) {
    case 'test': {
      return state.map(item => ({ ...item, test: true }))
    }
    default: {
      return state
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

export { itemsReducer, init }

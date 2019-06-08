import React, { useReducer } from 'react'

import Header from 'components/Header'
import Body from 'components/Body'

import fakeData from 'state/fake-data'
import {
  itemsReducer,
  init,
  setAllExpanded,
  setItemTitle,
  deleteItem,
  setSubItemAttribute,
  addSubItem,
  deleteSubItem,
  toggleItemExpanded,
  toggleSubItemExpanded
} from 'state/items-state'

const App = () => {
  const [items, dispatch] = useReducer(itemsReducer, fakeData, init)

  const handleSetAllExpanded = expanded => dispatch(setAllExpanded(expanded))

  const handleSetItemTitle = itemId => title =>
    dispatch(setItemTitle(itemId)(title))

  const handleDeleteItem = itemIndex => dispatch(deleteItem(itemIndex))

  const handleSetSubItemTitle = itemId => subItemId => title => {
    dispatch(setSubItemAttribute(itemId)(subItemId)({ title: title }))
  }

  const handleSetSubItemBody = itemId => subItemId => body =>
    dispatch(setSubItemAttribute(itemId)(subItemId)({ body }))

  const handleAddSubItem = itemIndex => subItemIndex =>
    dispatch(addSubItem(itemIndex)(subItemIndex))

  const handleDeleteSubItem = itemIndex => subItemIndex => {
    dispatch(deleteSubItem(itemIndex)(subItemIndex))
  }

  const handleToggleItemExpanded = itemIds =>
    dispatch(toggleItemExpanded(itemIds))

  const handleToggleSubItemExpanded = itemId => subItemIds =>
    dispatch(toggleSubItemExpanded(itemId)(subItemIds))

  return (
    <div>
      <Header items={items} setAllExpanded={handleSetAllExpanded} />
      <Body
        items={items}
        setItemTitle={handleSetItemTitle}
        deleteItem={handleDeleteItem}
        setSubItemTitle={handleSetSubItemTitle}
        setSubItemBody={handleSetSubItemBody}
        addSubItem={handleAddSubItem}
        deleteSubItem={handleDeleteSubItem}
        toggleItemExpanded={handleToggleItemExpanded}
        toggleSubItemExpanded={handleToggleSubItemExpanded}
      />
    </div>
  )
}

export default App

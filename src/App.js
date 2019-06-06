import React, { useReducer, useEffect } from 'react'

import Header from 'components/Header'
import Body from 'components/Body'

import fakeData from 'state/fake-data'
import {
  itemsReducer,
  init,
  setAllExpanded,
  setItemTitle,
  setSubItemTitle,
  setSubItemDescription,
  toggleItemExpanded,
  toggleSubItemExpanded
} from 'state/items-state'

const App = () => {
  const [items, dispatch] = useReducer(itemsReducer, fakeData, init)

  useEffect(() => dispatch({ type: 'test' }), [])

  const handleSetAllExpanded = expanded => dispatch(setAllExpanded(expanded))

  const handleSetItemTitle = itemId => title =>
    dispatch(setItemTitle(itemId)(title))

  const handleSetSubItemTitle = itemId => subItemId => title =>
    dispatch(setSubItemTitle(itemId)(subItemId)(title))

  const handleSetSubItemDescription = itemId => subItemId => description =>
    dispatch(setSubItemDescription(itemId)(subItemId)(description))

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
        setSubItemTitle={handleSetSubItemTitle}
        setSubItemDescription={handleSetSubItemDescription}
        toggleItemExpanded={handleToggleItemExpanded}
        toggleSubItemExpanded={handleToggleSubItemExpanded}
      />
    </div>
  )
}

export default App

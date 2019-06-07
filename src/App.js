import React, { useReducer } from 'react'

import Header from 'components/Header'
import Body from 'components/Body'

import fakeData from 'state/fake-data'
import {
  itemsReducer,
  init,
  setAllExpanded,
  setItemTitle,
  setSubItemTitle,
  setSubItemBody,
  toggleItemExpanded,
  toggleSubItemExpanded
} from 'state/items-state'

const App = () => {
  const [items, dispatch] = useReducer(itemsReducer, fakeData, init)

  const handleSetAllExpanded = expanded => dispatch(setAllExpanded(expanded))

  const handleSetItemTitle = itemId => title =>
    dispatch(setItemTitle(itemId)(title))

  const handleSetSubItemTitle = itemId => subItemId => title =>
    dispatch(setSubItemTitle(itemId)(subItemId)(title))

  const handleSetSubItemBody = itemId => subItemId => body =>
    dispatch(setSubItemBody(itemId)(subItemId)(body))

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
        setSubItemBody={handleSetSubItemBody}
        toggleItemExpanded={handleToggleItemExpanded}
        toggleSubItemExpanded={handleToggleSubItemExpanded}
      />
    </div>
  )
}

export default App

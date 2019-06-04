import React, { useReducer, useEffect } from 'react'

import Header from 'components/Header'
import Body from 'components/Body'

import fakeData from 'state/fake-data'
import {
  itemsReducer,
  init,
  setAllExpanded,
  toggleItemExpanded,
  toggleSubItemExpanded
} from 'state/items-state'

const App = () => {
  const [items, dispatch] = useReducer(itemsReducer, fakeData, init)

  useEffect(() => dispatch({ type: 'test' }), [])

  const handleSetAllExpanded = expanded => dispatch(setAllExpanded(expanded))

  const handleToggleItemExpanded = itemIds =>
    dispatch(toggleItemExpanded(itemIds))

  const handleToggleSubItemExpanded = itemId => subItemIds =>
    dispatch(toggleSubItemExpanded(itemId)(subItemIds))

  return (
    <div>
      <Header items={items} setAllExpanded={handleSetAllExpanded} />
      <Body
        items={items}
        toggleItemExpanded={handleToggleItemExpanded}
        toggleSubItemExpanded={handleToggleSubItemExpanded}
      />
    </div>
  )
}

export default App

import React, { useReducer, useEffect } from 'react'

import Header from 'components/Header'
import Body from 'components/Body'

import fakeData from 'state/fake-data'
import { itemsReducer, init } from 'state/items-state'

const App = () => {
  const [items, dispatch] = useReducer(itemsReducer, fakeData, init)

  useEffect(() => dispatch({ type: 'test' }), [])

  console.log('data', items)

  return (
    <div>
      <Header />
      <Body items={items} />
    </div>
  )
}

export default App

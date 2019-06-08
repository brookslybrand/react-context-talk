import { ADD_ICON } from './constants'

const getActiveKeys = items =>
  items.reduce(
    (activeKey, { id, expanded }) =>
      expanded ? activeKey.concat(id) : activeKey,
    [ADD_ICON]
  )

export { getActiveKeys }

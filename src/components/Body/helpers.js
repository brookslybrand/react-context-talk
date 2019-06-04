const getActiveKeys = items =>
  items.reduce(
    (activeKey, { id, expanded }) =>
      expanded ? activeKey.concat(id) : activeKey,
    []
  )

export { getActiveKeys }

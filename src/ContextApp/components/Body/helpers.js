const getActiveKeys = alwaysExpandedKeys => items =>
  alwaysExpandedKeys.concat(
    items.reduce(
      (activeKey, { id, expanded }) =>
        expanded ? activeKey.concat(id) : activeKey,
      []
    )
  );

export { getActiveKeys };

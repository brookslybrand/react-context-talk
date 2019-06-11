const findIndexById = arr => idToFind =>
  arr.findIndex(({ id }) => id === idToFind)

const findMaxId = arr => arr.reduce((max, { id }) => (+id > max ? +id : max), 0)

const createItem = (items, subItems = []) => {
  const id = String(findMaxId(items) + 1)

  return {
    id,
    title: `Item ${id}`,
    subItems: subItems
  }
}

const createSubItem = subItems => {
  const id = String(findMaxId(subItems) + 1)
  return {
    id,
    title: `Sub Item ${id}`,
    body: `This is the body for Sub Item ${id}`
  }
}

export { findIndexById, createItem, createSubItem }

import { createSubItem } from './helpers'

export default Array.from({ length: 20 }).map((_, index) => {
  const id = index.toString()
  const subItem1 = createSubItem([])
  const subItem2 = createSubItem([subItem1])
  return {
    id,
    title: `Item ${id}`,
    subItems: [subItem1, subItem2]
  }
})

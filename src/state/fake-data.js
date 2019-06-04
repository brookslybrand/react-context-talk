export default Array.from({ length: 20 }).map((_, index) => {
  const id = index.toString()
  return {
    id,
    title: `Item ${id}`,
    subItems: [
      {
        id,
        title: `Sub Item ${id}`,
        description: `This is the description for Sub Item ${id}`
      }
    ]
  }
})

export default Array.from({ length: 20 }).map((_, index) => {
  const id = index.toString()
  return {
    id,
    title: `Item ${id}`,
    subItems: [
      {
        id,
        title: `Sub Item ${id}`,
        body: `This is the body for Sub Item ${id}`
      }
    ]
  }
})

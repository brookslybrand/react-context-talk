export default Array.from({ length: 20 }).map((_, index) => {
  const key = index.toString()
  return {
    key,
    title: `Item ${key}`,
    subItems: [
      {
        key,
        title: `Sub Item ${key}`,
        description: `This is the description for Sub Item ${key}`
      }
    ]
  }
})

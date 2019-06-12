import { createItem, createSubItem } from './helpers';

const length = 20;
let i = 0;
const items = [];
while (i < length) {
  const subItem1 = createSubItem([]);
  const subItem2 = createSubItem([subItem1]);
  const item = createItem(items, [subItem1, subItem2]);
  items.push(item);
  i++;
}

export default items;

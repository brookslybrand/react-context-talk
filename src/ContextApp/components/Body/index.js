import { memo } from 'react';
/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { Collapse, Input, Icon } from 'antd';

import SubItems from './SubItems';

import { ADD_ICON_KEY, GRAY } from './constants';
import {
  useItemsDispatch,
  setItemTitle,
  addItem,
  deleteItem,
  setSubItemAttribute,
  addSubItem,
  deleteSubItem
} from '../../contexts/items-context';
import {
  useExpanded,
  useExpandedDispatch,
  setExpandedItems
} from '../../contexts/expanded-context';

const Panel = Collapse.Panel;

const Items = ({ items, searchTerm }) => {
  const itemsDispatch = useItemsDispatch();
  const expandedItems = useExpanded();
  const expandedItemsDispatch = useExpandedDispatch();
  const addKeys = Array.from({ length: items.length + 1 }).map((_, index) =>
    addKey(index)
  );

  // if no items return null
  if (items.length === 0 && searchTerm !== '') return null;

  return (
    <div css={bodyCss}>
      <Collapse
        onChange={ids => {
          const filteredIds = ids.filter(id => !addKeys.includes(id));
          expandedItemsDispatch(setExpandedItems(filteredIds));
        }}
        css={collapseCss}
        activeKey={addKeys.concat(expandedItems.items)}
      >
        <Panel key={addKeys[0]} showArrow={false} css={addIconCss}>
          <Icon
            type="plus"
            // get the first id for the first item
            onClick={() =>
              itemsDispatch(addItem(items.length ? items[0].id : '0')(false))
            }
            css={iconCss}
          />
        </Panel>
        {items.map((item, itemIndex) => [
          <Item key={item.id} {...item} />,
          <Panel
            key={addKeys[itemIndex + 1]}
            showArrow={false}
            css={addIconCss}
          >
            <Icon
              type="plus"
              onClick={() => itemsDispatch(addItem(item.id)(true))}
              css={iconCss}
            />
          </Panel>
        ])}
      </Collapse>
    </div>
  );
};

// Collapse passes down a function we're never using
// so some silliness needs to be done for memoization
// to work properly
const isSame = (prevProps, nextProps) => {
  const keys = Object.keys(prevProps);
  // start out assuming everything is the same
  // as long as isSame === true, keep testing the props
  const isSame = keys.reduce((isSame, key) => {
    if (key === 'expandIcon') return isSame;
    return isSame && prevProps[key] === nextProps[key];
  }, true);

  return isSame;
};

const Item = memo(({ id, title, subItems, ...rest }) => {
  const itemsDispatch = useItemsDispatch();

  return (
    <Panel
      {...rest}
      key={id}
      header={
        <Input
          placeholder="Add a title"
          value={title}
          onClick={e => e.stopPropagation()}
          onChange={e => itemsDispatch(setItemTitle(id)(e.target.value))}
          css={inputCss}
        />
      }
      extra={
        <Icon
          type="delete"
          onClick={e => {
            e.stopPropagation();
            itemsDispatch(deleteItem(id));
          }}
        />
      }
    >
      <SubItems
        subItems={subItems}
        setSubItemAttribute={setSubItemAttribute(id)}
        addSubItem={addSubItem(id)}
        deleteSubItem={deleteSubItem(id)}
        itemsDispatch={itemsDispatch}
      />
    </Panel>
  );
}, isSame);

const addKey = index => `${ADD_ICON_KEY}_${index}`;

const bodyCss = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const collapseCss = css`
  min-width: 300px;
  width: 50%;
  margin: 1rem 0;
`;

const addIconCss = css`
  background: white;
  display: flex;
  justify-content: center;
  padding-left: 12px;
  > div {
    padding: 0 !important;
    border: 0 !important;
    > div {
      padding: 0.5rem !important;
    }
  }
`;
const iconCss = css`
  font-size: 24px;
  color: ${GRAY};
  :hover {
    color: #505050;
  }
`;

const inputCss = css`
  width: auto;
`;

export default Items;

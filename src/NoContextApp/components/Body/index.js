/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { Collapse, Input, Icon } from 'antd';

import SubItems from './SubItems';

import { ADD_ICON_KEY, GRAY } from './constants';
import { getActiveKeys } from './helpers';

const Panel = Collapse.Panel;

const Items = ({
  items,
  setItemTitle,
  addItem,
  deleteItem,
  setSubItemTitle,
  setSubItemBody,
  addSubItem,
  deleteSubItem,
  toggleItemExpanded,
  toggleSubItemExpanded
}) => {
  const addKeys = Array.from({ length: items.length + 1 }).map((_, index) =>
    addKey(index)
  );

  // if no items return null
  if (items.length === 0) return null;

  return (
    <div css={bodyCss}>
      <Collapse
        onChange={ids => {
          toggleItemExpanded(ids);
        }}
        css={collapseCss}
        activeKey={getActiveKeys(addKeys)(items)}
      >
        <Panel key={addKeys[0]} showArrow={false} css={addIconCss}>
          <Icon
            type="plus"
            // get the first id for the first item
            onClick={() => addItem(items[0].id)(false)}
            css={iconCss}
          />
        </Panel>
        {items.map(({ id, title, subItems }, itemIndex) => [
          <Panel
            key={id}
            header={
              <Input
                placeholder="Add a title"
                value={title}
                onClick={e => e.stopPropagation()}
                onChange={e => setItemTitle(id)(e.target.value)}
                css={inputCss}
              />
            }
            onChange={() => console.log('comone ')}
            extra={
              <Icon
                type="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteItem(id);
                }}
              />
            }
          >
            <SubItems
              subItems={subItems}
              setSubItemTitle={setSubItemTitle(id)}
              setSubItemBody={setSubItemBody(id)}
              addSubItem={addSubItem(id)}
              deleteSubItem={deleteSubItem(id)}
              toggleSubItemExpanded={toggleSubItemExpanded(id)}
            />
          </Panel>,
          <Panel
            key={addKeys[itemIndex + 1]}
            showArrow={false}
            css={addIconCss}
          >
            <Icon type="plus" onClick={() => addItem(id)(true)} css={iconCss} />
          </Panel>
        ])}
      </Collapse>
    </div>
  );
};

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

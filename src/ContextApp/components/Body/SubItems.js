import { useState, useRef, useEffect } from 'react';
/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { Collapse, Input, Icon } from 'antd';

import { ADD_ICON_KEY, GRAY } from './constants';

import { DEFAULT_EXPANDED } from '../../contexts/expanded-context';

const Panel = Collapse.Panel;
const TextArea = Input.TextArea;

const SubItems = ({
  subItems,
  itemsDispatch,
  setSubItemAttribute,
  addSubItem,
  deleteSubItem
}) => {
  const [expandedSubItems, setExpandedSubItems] = useExpandedSubItems(subItems);

  return (
    <Collapse
      bordered={false}
      activeKey={[ADD_ICON_KEY].concat(expandedSubItems)}
      onChange={ids => setExpandedSubItems(ids)}
      css={collapseCss}
    >
      <Panel key={ADD_ICON_KEY} showArrow={false} css={firstIconCss}>
        <Icon
          type="plus"
          // get the first id for the first item
          onClick={() =>
            itemsDispatch(
              addSubItem(subItems.length ? subItems[0].id : '0')(false)
            )
          }
          css={iconCss}
        />
      </Panel>

      {subItems.map(({ id, title, body }) => (
        <Panel
          key={id}
          header={
            <Input
              placeholder="Add a title"
              value={title}
              onChange={e =>
                itemsDispatch(
                  setSubItemAttribute(id)({ title: e.target.value })
                )
              }
              onClick={e => e.stopPropagation()}
              css={inputCss}
            />
          }
          extra={
            <Icon
              type="delete"
              onClick={e => {
                e.stopPropagation();
                itemsDispatch(deleteSubItem(id));
              }}
            />
          }
          css={panelCss}
        >
          <TextArea
            placeholder="Add a body"
            value={body}
            onChange={e =>
              itemsDispatch(setSubItemAttribute(id)({ body: e.target.value }))
            }
            css={textAreaCss}
          />
          <Icon
            type="plus"
            onClick={() => itemsDispatch(addSubItem(id)(true))}
            css={iconCss}
          />
        </Panel>
      ))}
    </Collapse>
  );
};

const useExpandedSubItems = subItems => {
  // keep track of the old items for diffing
  const oldSubItems = useRef();
  const [expandedSubItems, setExpandedSubItems] = useState(
    DEFAULT_EXPANDED ? subItems.map(({ id }) => id) : []
  );

  // reconcile added subitems
  useEffect(() => {
    // if DEFAULT_EXPANDED === false or there are no oldSubItems, skip
    if (DEFAULT_EXPANDED && oldSubItems.current) {
      // find all the ids that were not in oldSubItems
      const oldSubItemIds = new Set(oldSubItems.current.map(({ id }) => id));
      const newSubItems = subItems.filter(({ id }) => !oldSubItemIds.has(id));
      setExpandedSubItems(prev => prev.concat(newSubItems.map(({ id }) => id)));
    }

    oldSubItems.current = subItems;
  }, [subItems]);

  return [expandedSubItems, setExpandedSubItems];
};

const collapseCss = css`
  width: calc(100% - 1px - 1rem);
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;

const firstIconCss = css`
  display: flex;
  justify-content: center;
  > div {
    padding: 0 !important;
  }
`;

const panelCss = css`
  padding-bottom: 0 !important;
  > div > div {
    display: flex !important;
    flex-direction: column !important;
  }
`;

const inputCss = css`
  width: auto;
`;

const textAreaCss = css`
  width: 100%;
`;

const iconCss = css`
  margin-top: 1rem;
  color: ${GRAY};
  :hover {
    color: #505050;
  }
`;

export default SubItems;

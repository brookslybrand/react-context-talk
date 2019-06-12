/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { Collapse, Input, Icon } from 'antd';

import { ADD_ICON_KEY, GRAY } from './constants';
import { getActiveKeys } from './helpers';

const Panel = Collapse.Panel;
const TextArea = Input.TextArea;

const SubItems = ({
  subItems,
  setSubItemTitle,
  setSubItemBody,
  addSubItem,
  deleteSubItem,
  toggleSubItemExpanded
}) => {
  return (
    <Collapse
      bordered={false}
      activeKey={getActiveKeys([ADD_ICON_KEY])(subItems)}
      onChange={ids => toggleSubItemExpanded(ids)}
      css={collapseCss}
    >
      <Panel key={ADD_ICON_KEY} showArrow={false} css={firstIconCss}>
        <Icon
          type="plus"
          // get the first id for the first item
          onClick={() =>
            addSubItem(subItems.length ? subItems[0].id : '0')(false)
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
              onChange={e => setSubItemTitle(id)(e.target.value)}
              onClick={e => e.stopPropagation()}
              css={inputCss}
            />
          }
          extra={
            <Icon
              type="delete"
              onClick={e => {
                e.stopPropagation();
                deleteSubItem(id);
              }}
            />
          }
          css={panelCss}
        >
          <TextArea
            placeholder="Add a body"
            value={body}
            onChange={e => setSubItemBody(id)(e.target.value)}
            css={textAreaCss}
          />
          <Icon
            type="plus"
            onClick={() => addSubItem(id)(true)}
            css={iconCss}
          />
        </Panel>
      ))}
    </Collapse>
  );
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

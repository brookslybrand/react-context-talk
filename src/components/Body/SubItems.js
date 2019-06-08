/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Collapse, Input, Icon } from 'antd'

import { getActiveKeys } from './helpers'

const Panel = Collapse.Panel
const TextArea = Input.TextArea

const SubItems = ({
  subItems,
  setSubItemTitle,
  setSubItemBody,
  addSubItem,
  toggleSubItemExpanded
}) => {
  return (
    <Collapse
      bordered={false}
      activeKey={getActiveKeys(subItems)}
      onChange={ids => toggleSubItemExpanded(ids)}
      css={collapseCss}
    >
      {subItems.map(({ id, title, body }, subItemIndex) => (
        <Panel
          header={
            <Input
              placeholder="Add a title"
              value={title}
              onChange={e => setSubItemTitle(id)(e.target.value)}
              onClick={e => e.stopPropagation()}
              css={inputCss}
            />
          }
          key={id}
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
            onClick={() => addSubItem(subItemIndex)}
            css={iconCss}
          />
        </Panel>
      ))}
    </Collapse>
  )
}

const GRAY = '#d9d9d9'

const collapseCss = css`
  width: calc(100% - 1px - 1rem);
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`

const panelCss = css`
  padding-bottom: 0 !important;
  > div > div {
    display: flex !important;
    flex-direction: column !important;
  }
`

const inputCss = css`
  width: auto;
`

const textAreaCss = css`
  width: 100%;
`

const iconCss = css`
  margin-top: 1rem;
  color: ${GRAY};
  :hover {
    color: #505050;
  }
`

export default SubItems

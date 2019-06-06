/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Collapse, Input } from 'antd'

import { getActiveKeys } from './helpers'

const Panel = Collapse.Panel
const TextArea = Input.TextArea

const SubItems = ({
  subItems,
  setSubItemTitle,
  setSubItemDescription,
  toggleSubItemExpanded
}) => {
  return (
    <Collapse
      bordered={false}
      activeKey={getActiveKeys(subItems)}
      onChange={ids => toggleSubItemExpanded(ids)}
    >
      {subItems.map(({ id, title, description }) => (
        <Panel
          header={
            <Input
              placeholder="Add a title"
              value={title}
              onChange={e => setSubItemTitle(id)(e.target.value)}
              css={inputCss}
            />
          }
          key={id}
        >
          <TextArea
            placeholder="Add a description"
            value={description}
            onChange={e => setSubItemDescription(id)(e.target.value)}
            css={textAreaCss}
          />
        </Panel>
      ))}
    </Collapse>
  )
}

const inputCss = css`
  width: auto;
`

const textAreaCss = css`
  width: 50%;
`

export default SubItems

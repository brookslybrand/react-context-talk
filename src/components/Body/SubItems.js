/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Collapse, Input } from 'antd'

import AddBar from './AddBar'

import { getActiveKeys } from './helpers'

const Panel = Collapse.Panel
const TextArea = Input.TextArea

const SubItems = ({
  subItems,
  setSubItemTitle,
  setSubItemBody,
  toggleSubItemExpanded
}) => {
  return (
    <span
      css={css`
        display: flex;
      `}
    >
      <AddBar />
      <Collapse
        bordered={false}
        activeKey={getActiveKeys(subItems)}
        onChange={ids => toggleSubItemExpanded(ids)}
        css={css`
          width: calc(100% - 1px - 1rem);
          margin-left: 1rem;
        `}
      >
        {subItems.map(({ id, title, body }) => (
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
              placeholder="Add a body"
              value={body}
              onChange={e => setSubItemBody(id)(e.target.value)}
              css={textAreaCss}
            />
          </Panel>
        ))}
      </Collapse>
    </span>
  )
}

const inputCss = css`
  width: auto;
`

const textAreaCss = css`
  width: 100%;
`

export default SubItems

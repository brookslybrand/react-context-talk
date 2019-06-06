/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Collapse, Input } from 'antd'

import SubItems from './SubItems'

import { getActiveKeys } from './helpers'

const Panel = Collapse.Panel

const Items = ({
  items,
  setItemTitle,
  setSubItemTitle,
  setSubItemDescription,
  toggleItemExpanded,
  toggleSubItemExpanded
}) => {
  return (
    <Collapse
      onChange={ids => {
        toggleItemExpanded(ids)
      }}
      css={cardCss}
      activeKey={getActiveKeys(items)}
    >
      {items.map(({ id, title, subItems }) => (
        <Panel
          key={id}
          header={
            <Input
              placeholder="Add a title"
              value={title}
              onChange={e => setItemTitle(id)(e.target.value)}
              css={inputCss}
            />
          }
          onChange={() => console.log('comone ')}
        >
          <SubItems
            subItems={subItems}
            setSubItemTitle={setSubItemTitle(id)}
            setSubItemDescription={setSubItemDescription(id)}
            toggleSubItemExpanded={toggleSubItemExpanded(id)}
          />
        </Panel>
      ))}
    </Collapse>
  )
}

const cardCss = css`
  width: 70%;
  margin: 1rem 0;
`

const inputCss = css`
  width: auto;
`

export default Items

/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Collapse } from 'antd'

import SubItems from './SubItems'

import { getActiveKeys } from './helpers'

const Panel = Collapse.Panel

const Items = ({ items, toggleItemExpanded, toggleSubItemExpanded }) => {
  return (
    <Collapse
      onChange={ids => {
        toggleItemExpanded(ids)
      }}
      css={cardCss}
      activeKey={getActiveKeys(items)}
    >
      {items.map(({ id, title, subItems }) => (
        <Panel header={title} key={id} onChange={() => console.log('comone ')}>
          <SubItems
            subItems={subItems}
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

export default Items

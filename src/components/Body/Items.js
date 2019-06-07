import { Fragment } from 'react'
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
  setSubItemBody,
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
        // <span
        //   css={css`
        //     display: flex;
        //     flex-direction: column;
        //   `}
        // >
        //   <div
        //     css={css`
        //       height: 20px;
        //       width: 10px;
        //       background: blue;
        //     `}
        //   />
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
            setSubItemBody={setSubItemBody(id)}
            toggleSubItemExpanded={toggleSubItemExpanded(id)}
          />
        </Panel>
        // </span>
      ))}
    </Collapse>
  )
}

const cardCss = css`
  min-width: 300px;
  width: 50%;
  margin: 1rem 0;
`

const inputCss = css`
  width: auto;
`

export default Items

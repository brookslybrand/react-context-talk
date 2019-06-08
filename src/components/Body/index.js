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
  addSubItem,
  deleteSubItem,
  toggleItemExpanded,
  toggleSubItemExpanded
}) => {
  return (
    <div css={bodyCss}>
      <Collapse
        onChange={ids => {
          toggleItemExpanded(ids)
        }}
        css={cardCss}
        activeKey={getActiveKeys(items)}
      >
        {items.map(({ id, title, subItems }, itemIndex) => (
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
              addSubItem={addSubItem(itemIndex)}
              deleteSubItem={deleteSubItem(itemIndex)}
              toggleSubItemExpanded={toggleSubItemExpanded(id)}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

const bodyCss = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const cardCss = css`
  min-width: 300px;
  width: 50%;
  margin: 1rem 0;
`

const inputCss = css`
  width: auto;
`

export default Items

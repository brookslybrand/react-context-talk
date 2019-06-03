/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Collapse } from 'antd'

const Panel = Collapse.Panel

function callback(key) {
  console.log(key)
}

const getActiveKeys = items =>
  items.reduce(
    (activeKey, { key, expanded }) =>
      expanded ? activeKey.concat(key) : activeKey,
    []
  )

const Panels = ({ items }) => {
  return (
    <Collapse
      onChange={callback}
      css={cardCss}
      activeKey={getActiveKeys(items)}
    >
      {items.map(({ key, title, subItems }) => (
        <Panel header={title} key={key}>
          {subItems.map(({ key, title, description }) => (
            <Collapse
              key={key}
              bordered={false}
              activeKey={getActiveKeys(subItems)}
            >
              <Panel header={title} key={key}>
                <p>{description}</p>
              </Panel>
            </Collapse>
          ))}
        </Panel>
      ))}
    </Collapse>
  )
}

const cardCss = css`
  width: 70%;
  margin: 1rem 0;
`

export default Panels

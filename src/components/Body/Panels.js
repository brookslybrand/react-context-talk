/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Collapse } from 'antd'

const Panel = Collapse.Panel

function callback(key) {
  console.log(key)
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const Panels = () => (
  <Collapse onChange={callback} css={cardCss} activeKey={['1', '2', '3']}>
    {Array.from({ length: 20 }).map((_, i) => {
      i += 1
      return (
        <Panel header={`This is panel header ${i}`} key={i.toString()}>
          <Collapse bordered={false}>
            <Panel header="This is panel nest panel" key={i.toString()}>
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Panel>
      )
    })}
  </Collapse>
)

const cardCss = css`
  width: 70%;
  margin: 1rem 0;
`

export default Panels

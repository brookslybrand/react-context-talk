/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Card } from 'antd'

function App() {
  return (
    <div css={containerCss}>
      <Card title="Default size card" css={cardCss}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Default size card" css={cardCss}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}

const containerCss = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const cardCss = css`
  width: 300px;
  margin: 1rem 0;
`

export default App

/**@jsx jsx */
import { jsx, css } from '@emotion/core'

import Panels from './Panels'

const Body = ({ items }) => (
  <div css={bodyCss}>
    <Panels items={items} />
  </div>
)

const bodyCss = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Body

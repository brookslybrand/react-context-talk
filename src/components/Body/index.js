/**@jsx jsx */
import { jsx, css } from '@emotion/core'

import Panels from './Panels'

const Body = () => (
  <div css={bodyCss}>
    <Panels />
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

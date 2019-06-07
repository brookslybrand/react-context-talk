/**@jsx jsx */
import { jsx, css } from '@emotion/core'

import Items from './Items'

const Body = ({
  items,
  setItemTitle,
  setSubItemTitle,
  toggleItemExpanded,
  setSubItemBody,
  toggleSubItemExpanded
}) => (
  <div css={bodyCss}>
    <Items
      items={items}
      setItemTitle={setItemTitle}
      setSubItemTitle={setSubItemTitle}
      setSubItemBody={setSubItemBody}
      toggleItemExpanded={toggleItemExpanded}
      toggleSubItemExpanded={toggleSubItemExpanded}
    />
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

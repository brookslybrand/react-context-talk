/**@jsx jsx */
import { jsx, css } from '@emotion/core'

import { Icon } from 'antd'

const AddBar = ({ hidden = false }) => {
  return (
    <span
      css={css`${containerCss}
        visibility: ${hidden ? 'hidden' : 'visible'};
      `}
    >
      <Icon type="plus" css={iconCss} />
      <div css={barCss} />
      <Icon type="plus" css={iconCss} />
    </span>
  )
}

const GRAY = '#d9d9d9'

const containerCss = css`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const iconCss = css`
  color: ${GRAY};
  :hover {
    color: #505050;
  }
`

const barCss = css`
  height: 100%;
  width: 1px;
  background: ${GRAY};
`

export default AddBar

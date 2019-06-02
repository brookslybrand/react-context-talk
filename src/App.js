/**@jsx jsx */
import { jsx, css } from '@emotion/core'

import SearchBar from './components/SearchBar'
import Cards from './components/Cards'

const App = () => (
  <div css={containerCss}>
    <SearchBar />
    <Cards />
  </div>
)

const containerCss = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App

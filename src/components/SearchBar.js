import { useState } from 'react'
/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { Icon, Input, AutoComplete } from 'antd'

function onSelect(value) {
  console.log('onSelect', value)
}

const SearchBar = () => {
  const [dataSource, setDataSource] = useState([])

  const handleSearch = value => {
    setDataSource(!value ? [] : [value, value + value, value + value + value])
  }

  return (
    <div className="certain-category-search-wrapper" css={completeCss}>
      <AutoComplete
        dataSource={dataSource}
        dropdownStyle={{ width: 300 }}
        onSelect={onSelect}
        onSearch={handleSearch}
        size="large"
        placeholder="search by keyword"
        optionLabelProp="value"
        css={autoCompleteCss}
      >
        <Input
          suffix={<Icon type="search" className="certain-category-icon" />}
        />
      </AutoComplete>
    </div>
  )
}

const completeCss = css`
  width: 400px;
  padding: 1rem 0;
`

const autoCompleteCss = css`
  width: 100%;
`

export default SearchBar

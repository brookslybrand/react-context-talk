/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import { Icon, Input, AutoComplete } from 'antd';

const SearchBar = ({ filteredItems, searchTerm, setSearchTerm }) => {
  return (
    <div className="certain-category-search-wrapper" css={completeCss}>
      <AutoComplete
        dataSource={filteredItems.map(({ title }) => title)}
        dropdownStyle={{ width: 300 }}
        size="large"
        placeholder="search by title"
        optionLabelProp="value"
        value={searchTerm}
        onChange={val => setSearchTerm(val)}
        css={autoCompleteCss}
      >
        <Input
          suffix={
            <Icon
              type="close"
              className="certain-category-icon"
              onClick={e => {
                e.stopPropagation();
                setSearchTerm('');
              }}
            />
          }
        />
      </AutoComplete>
    </div>
  );
};

const completeCss = css`
  width: 400px;
  padding: 1rem 0;
`;

const autoCompleteCss = css`
  width: 100%;
`;

export default SearchBar;

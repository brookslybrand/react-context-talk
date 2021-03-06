/**@jsx jsx */
import { jsx, css } from '@emotion/core';

import SearchBar from './SearchBar';
import { Affix, Card, Icon } from 'antd';

const Header = ({
  expandAll = false,
  items,
  filteredItems,
  setAllExpanded,
  searchTerm,
  setSearchTerm
}) => {
  // find if anything is expanded
  const someExpanded = items.reduce(
    (someExpanded, { expanded, subItems }) =>
      someExpanded || expanded || subItems.some(({ expanded }) => expanded),
    false
  );
  return (
    <Affix>
      <Card css={headerCss}>
        <SearchBar
          filteredItems={filteredItems}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Icon
          type="double-right"
          onClick={() => setAllExpanded(!someExpanded)}
          css={expandAllCss(!someExpanded)}
        />
      </Card>
    </Affix>
  );
};

const headerCss = css`
  width: 100%;

  > div {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    > * {
      margin: 0 0.5rem;
    }
  }
`;

const expandAllCss = expandAll => css`
  transform: rotate(${!expandAll && '-'}90deg);
  transition: transform 0.24s;
`;

export default Header;

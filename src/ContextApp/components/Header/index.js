/**@jsx jsx */
import { jsx, css } from '@emotion/core';

import SearchBar from './SearchBar';
import { Affix, Card, Icon } from 'antd';

import {
  useExpanded,
  useExpandedDispatch,
  setAllExpanded
} from '../../contexts/expanded-context';

const Header = ({
  expandAll = false,
  items,
  filteredItems,
  searchTerm,
  setSearchTerm
}) => {
  const [{ someExpanded }, expandedItemsDispatch] = [
    useExpanded(),
    useExpandedDispatch()
  ];
  return (
    <Affix>
      <Card css={headerCss}>
        <SearchBar filteredItems={filteredItems} />
        <Icon
          type="double-right"
          onClick={() =>
            expandedItemsDispatch(setAllExpanded(items)(!someExpanded))
          }
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

import React from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <div className={styles.root}>
      <IoIosSearch className={styles.search} />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      {searchValue && (
        <IoCloseOutline onClick={() => setSearchValue('')} className={styles.close} />
      )}
    </div>
  );
};

export default Search;

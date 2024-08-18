import React from 'react';
import { SearchContext } from '../../App';
import lodash from 'lodash';

import styles from './Search.module.scss';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    lodash.debounce((str) => {
      setSearchValue(str);
    }, 1000),
    [],
  );

  const onChangeInput = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    updateSearchValue(inputValue);
    console.log('Input changed:', inputValue);
  };

  return (
    <div className={styles.root}>
      <IoIosSearch className={styles.search} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      {value && <IoCloseOutline onClick={onClear} className={styles.close} />}
    </div>
  );
};

export default Search;

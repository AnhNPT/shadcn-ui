/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable linebreak-style */

import { HTMLProps } from 'react';

interface ISelectSearch extends HTMLProps<HTMLInputElement> {
  searchClassName: string;
  setSearchKeyword: (keyword: string) => void;
}
// keyword
const SelectSearch = (props: ISelectSearch) => {
  const { searchClassName, value, setSearchKeyword, ...inputProps } = props;

  const handleClear = () => {
    setSearchKeyword('');
  };

  return (
    <div className={searchClassName}>
      <input
        type="text"
        {...inputProps}
        value={value}
        className="global_search text_sm_medium"
        onChange={(e) => {
          setSearchKeyword(e.currentTarget.value);
        }}
      ></input>
      <div className="input_search_button button_hover"></div>
      <div
        onClick={handleClear}
        className={`cursor_pointer input_clear_button button_hover ${value ? '' : 'd_none'}`}
      ></div>
    </div>
  );
};

export default SelectSearch;

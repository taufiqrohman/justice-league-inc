import { ChangeEvent } from "react";
import "./SearchBar.css";

interface PropType {
  onSearch?: Function;
}

function SearchBar({ onSearch }: PropType) {
  const onInputChange = function (evt: ChangeEvent<HTMLInputElement>) {
    if (onSearch) {
      onSearch(evt.target.value);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search employee name"
        onChange={onInputChange}
      />
    </div>
  );
}

export default SearchBar;

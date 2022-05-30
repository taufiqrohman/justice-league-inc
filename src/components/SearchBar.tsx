import { ChangeEvent, useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import Employee from "../models/employee";
import { countSubordinates } from "../repositories/Employee";
import "./SearchBar.css";

interface PropType {
  onSearch?: Function;
}

function SearchBar({ onSearch }: PropType) {
  const context = useContext(EmployeeContext);
  const [isAutocompleteShown, showAutocomplete] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<Employee>>([]);
  const [search, setSearch] = useState<string>("");

  const onInputChange = function (evt: ChangeEvent<HTMLInputElement>) {
    setSearch(evt.target.value);

    if (evt.target.value == "" && onSearch) {
      onSearch("");
    }
  };

  const filterSuggestions = function () {
    if (!search) {
      setSuggestions([]);
    } else {
      const filtered_employees = (context?.employees || [])
        .filter((employee) =>
          employee.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((employee) => ({
          ...employee,
          total_sub: countSubordinates(employee, context?.employees || []),
        }));

      setSuggestions(filtered_employees);
    }
  };

  const onAutocompleteClicked = function (suggestion: Employee) {
    setSearch(suggestion.name);

    if (onSearch) {
      onSearch(suggestion.name);
    }

    showAutocomplete(false);
  };

  const handleOnBlur = function () {
    if (!search) {
      showAutocomplete(false);
    }
  };

  useEffect(() => {
    filterSuggestions();
  }, [search]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search employee name"
        onChange={onInputChange}
        onFocus={() => showAutocomplete(true)}
        onBlur={handleOnBlur}
        value={search}
      />

      {isAutocompleteShown && (
        <div className="autocomplete">
          {suggestions.map((suggestion, index) => (
            <div
              key={`suggestion-${suggestion.employeeId}`}
              className="suggestion"
              onClick={() => onAutocompleteClicked(suggestion)}
            >
              {suggestion.name} ({suggestion.total_sub})
            </div>
          ))}

          {suggestions.length == 0 && (
            <div className="empty">
              {search
                ? "Data not found. Please try another keywords!"
                : "Search employee by name"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

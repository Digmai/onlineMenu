import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  pointer-events: none;
  transition: height 250ms;
  width: 100%;
  z-index: 3;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1em;
  color: gray;
  width: 100%;

  &::placeholder {
    color: rgba(white, 0.25);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  border: none;
  background-color: transparent;
  color: gray;
  font-size: 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: black;
  }
`;

const DropdownMenu = styled.ul`
  background-color: white;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 2px solid gray;
  border-top: none;
  border-radius: 0 0 5px 5px;
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: 1;

  li {
    padding: 5px;
    cursor: pointer;
    color: black;

    &:hover {
      background-color: gray;
      color: white;
    }
  }
`;

const SearchButton = styled.button`
  border: none;
  background-color: gray;
  color: white;
  font-size: 1em;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 250ms;

  &:hover {
    background-color: darkgray;
  }

  svg {
    margin-right: 5px;
  }
`;

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [searchType, setSearchType] = React.useState("dishes");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearchTypeClick = (type: string) => {
    setSearchType(type);
    setShowDropdown(false);
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={`Search for ${searchType}`}
      />
      <DropdownContainer>
        <DropdownButton onClick={handleDropdownClick}>
          {searchType} <IoIosArrowDown />
        </DropdownButton>
        {showDropdown && (
          <DropdownMenu>
            <li onClick={() => handleSearchTypeClick("dishes")}>Dishes</li>
            <li onClick={() => handleSearchTypeClick("drinks")}>Drinks</li>
          </DropdownMenu>
        )}
      </DropdownContainer>
      <SearchButton type="submit">
        <FiSearch /> Search
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;

<>
  <div id="search-bar-aligner" className="focused querying searching">
    <div id="search-bar-wrapper">
      <div id="search-bar">
        <i id="search-bar-logo" className="fa-regular fa-magnifying-glass"></i>
        <input
          id="search-bar-input"
          placeholder="Search"
          type="text"
          value="Hit the reset button ➡️"
        />
        <button id="search-bar-reset-button" type="button">
          <i className="fa-regular fa-arrow-rotate-right"></i>
        </button>
      </div>
      <div id="search-bar-sass">
        <div id="search-bar-sass-icon" className="emoji">
          <i className="fa-light fa-face-awesome"></i>
        </div>
        <h1 id="search-bar-sass-statement">
          Hmm, haven't heard of that. Have some coffee instead.
        </h1>
      </div>
    </div>
  </div>
</>;

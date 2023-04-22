import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

const SearchBarContainer = styled.form`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchInput = styled.input`
  height: 36px;
  padding: 0 12px;
  border-radius: 18px 0 0 18px;
  border: none;
  width: 300px;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const SearchButton = styled.button`
  height: 36px;
  border-radius: 0 18px 18px 0;
  background-color: #f17d0a;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  font-size: 14px;

  svg {
    margin-right: 6px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  height: 36px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  font-size: 14px;
  border-radius: 0 18px 18px 0;

  svg {
    margin-left: 6px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 18px;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 40px;
  right: 0;
  padding: 6px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  li {
    list-style: none;
    padding: 6px 12px;
    cursor: pointer;

    &:hover {
      background-color: #f1f1f1;
    }
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
    <SearchBarContainer >
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

import React from "react";
import styled from "styled-components";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const DedContainer = styled.div`
  width: 500px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  z-index: 3;
`;

const Container = styled.div`
  align-items: center;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 6px, rgb(0 0 0 / 12%) 0px 1px 4px;
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  pointer-events: all;
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  text-align: left;
  transition: width 2150ms;
  width: 100%;
`;

const SearchIcon = styled(FaSearch)`
  margin-right: 16px;
  font-size: 20px;
  color: #fff;
  transform: scaleX(-1);
`;

const ResetIcon = styled(FaSyncAlt)`
  margin-right: 16px;
  font-size: 20px;
  color: #fff;
  transform: scaleX(-1);
`;

const ResetButton = styled.div`
  border: none;
  background: none;
  outline: none;
  color: #fff;
  cursor: pointer;
`;

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchTermRegex = /^[a-zA-Z]+$/;
    setSearchTerm(e.target.value);
  };

  const handleResetClick = () => {
    setSearchTerm("");
  };

  return (
    <DedContainer>
      <Container>
        <SearchIcon />
        <div className="search-bar-logo"></div>
        <Input
          type="text"
          placeholder="Введите текст для поиска"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm.length > 0 && (
          <ResetButton onClick={handleResetClick}>
            <ResetIcon />
          </ResetButton>
        )}
      </Container>
    </DedContainer>
  );
};

export default SearchBar;

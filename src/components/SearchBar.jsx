import { useEffect } from "react";
import { useState } from "react";
import { searchAPI } from "../apis/search";
import useDebounce from "../hooks/useDebounce";
import AutocompleteBox from "./AutoCompleteBox";
import { setSession } from "../utils/sessionStorage";
import SearchButton from "./SearchButton";
import styled from "@emotion/styled";
import { STRING_SVG_CODE } from "../constants/search";

const SearchBar = () => {
  const [word, setWord] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [autocompleteArray, setAutocompleteArray] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedText = useDebounce(word);

  useEffect(() => {
    const showApiData = async () => {
      const newAutocompleteArray = await searchAPI(
        debouncedText.trim().toLowerCase()
      );
      setAutocompleteArray(newAutocompleteArray.slice(0, 7));
    };
    showApiData();
    setSelectedIndex(-1);
  }, [debouncedText]);

  const changeWord = (e) => {
    setWord(e.target.value);
  };

  const deleteWord = () => {
    setWord("");
  };

  const openAutoBox = () => {
    setIsFocused(true);
  };

  const closeAutoBox = () => {
    setIsFocused(false);
  };

  const searchWord = () => {
    setSession(word);
  };

  return (
    <div>
      <SearchBarContainer isFocused={isFocused}>
        <FocusedSearchBar onFocus={openAutoBox} onBlur={closeAutoBox}>
          <input
            type="text"
            value={word}
            onChange={changeWord}
            placeholder={isFocused ? "" : "질환명을 입력해 주세요"}
          />
          <DeleteBtn isFocused={isFocused} onClick={deleteWord}>
            X
          </DeleteBtn>
        </FocusedSearchBar>
        <SearchButton searchWord={searchWord} />
      </SearchBarContainer>
      <AutocompleteBox
        word={word}
        setWord={setWord}
        autocompleteArray={autocompleteArray}
        isFocused={isFocused}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
};

const SearchBarContainer = styled.div`
  width: 500px;
  height: 70px;
  border-radius: 42px;
  background-color: white;
  margin: auto;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  border: ${(props) =>
    props.isFocused ? "2px solid #017be8" : "1px solid transparent"};
`;

const FocusedSearchBar = styled.div`
  background-color: transparent;
  margin: auto 15px;
  width: 87%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    font-size: 1.2em;
    border: none;
    outline: none;
    width: 80%;
    &::placeholder {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      padding-left: 35px;
      background-image: url("data:image/svg+xml,${encodeURIComponent(
        STRING_SVG_CODE
      )}");
      background-size: 20px;
      background-repeat: no-repeat;
      background-position: 5px center;
      color: #bababa;
    }
  }
`;

const DeleteBtn = styled.button`
  opacity: ${(props) => (props.isFocused ? "10" : "0")};
  background-color: #b7b7b7;
  border-radius: 50%;
  border: none;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default SearchBar;

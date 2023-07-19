import { useEffect } from "react";
import { useState } from "react";
import { searchAPI } from "../apis/search";
import useDebounce from "../hooks/useDebounce";
import AutocompleteBox from "./AutoCompleteBox";
import { setSession } from "../utils/sessionStorage";

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
      <div isFocused={isFocused}>
        <div onFocus={openAutoBox} onBlur={closeAutoBox}>
          <input
            type="text"
            value={word}
            onChange={changeWord}
            placeholder={isFocused ? "" : "질환명을 입력해 주세요"}
          />
          <button isFocused={isFocused} onClick={deleteWord}>
            X
          </button>
        </div>
        <div onClick={searchWord}>X</div>
      </div>
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

export default SearchBar;

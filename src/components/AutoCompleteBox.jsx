import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getSession, setSession } from "../utils/sessionStorage";
import { SVG_CODE } from "../constants/search";

const AutocompleteBox = (props) => {
  const {
    word,
    autocompleteArray,
    isFocused,
    selectedIndex,
    setSelectedIndex,
  } = props;
  const recentKeyWordsLength = getSession()?.length;
  const [keyEventWord, setKeyEventWord] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  });

  const handleKeyEvent = (e) => {
    const autoLength = autocompleteArray?.length;
    if (!isFocused) return;
    if (e.isComposing) return;
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, autoLength - 1));
      setKeyEventWord(autocompleteArray[selectedIndex + 1]?.sickNm);
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
      setKeyEventWord(autocompleteArray[selectedIndex - 1]?.sickNm);
    }
    if (e.key === "Enter") {
      setSession(keyEventWord);
    }
  };

  return (
    <AutoCompleteContainer isFocused={isFocused}>
      <RecentBox>
        {word ? "" : <p>최근 검색어</p>}
        {word ? (
          <RecentKeys>
            {SVG_CODE}
            <p>{word}</p>
          </RecentKeys>
        ) : recentKeyWordsLength === 0 ? (
          <p>최근 검색어가 없습니다</p>
        ) : (
          getSession()
            .slice(recentKeyWordsLength - 5, recentKeyWordsLength)
            .map((word, i) => (
              <RecentKeys key={i}>
                {SVG_CODE}
                <p>{word}</p>
              </RecentKeys>
            ))
        )}
      </RecentBox>
      <AutoBox>
        {autocompleteArray.length > 0 ? <p>추천 검색어</p> : ""}
        {autocompleteArray?.map((w, i) => (
          <AutoKeys key={i} selection={i === selectedIndex}>
            {SVG_CODE}
            <p>{w.sickNm}</p>
          </AutoKeys>
        ))}
      </AutoBox>
    </AutoCompleteContainer>
  );
};

const AutoCompleteContainer = styled.div`
  opacity: ${(props) => (props.isFocused ? "100" : "0")};
  width: 520px;
  height: fit-content;
  padding: 20px 0;
  background-color: white;
  margin: 5px auto;
  border-radius: 20px;
  box-shadow: 0px 2px 4px rgba(30, 32, 37, 0.1);
`;

const RecentBox = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  text-align: left;
  /* padding-bottom: 10px; */
  > p:nth-child(1) {
    color: gray;
    font-size: 0.9em;
    margin-left: 33px;
  }
  > p:nth-child(2) {
    color: #bababa;
    font-size: 1em;
    margin-left: 33px;
  }
`;

const RecentKeys = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  svg {
    padding-left: 15px;
    width: 20px;
    margin-left: 18px;
    margin-right: 10px;
  }
  p {
    margin: auto 0;
  }
`;

const AutoBox = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-top: 10px;
  > p:nth-child(1) {
    color: gray;
    font-size: 0.9em;
    margin-left: 33px;
  }
`;

const AutoKeys = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  background-color: ${(props) => (props.selection ? "#f3f3f3" : "transparent")};
  svg {
    padding-left: 15px;
    width: 20px;
    margin-left: 18px;
    margin-right: 10px;
  }
  p {
    margin: auto 0;
  }
`;

export default AutocompleteBox;

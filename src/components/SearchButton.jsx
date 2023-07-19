import styled from "@emotion/styled";
import { SVG_CODE } from "../constants/search";

const SearchButton = (props) => {
  const { searchWord } = props;

  return <SearchBtn onClick={searchWord}>{SVG_CODE}</SearchBtn>;
};

const SearchBtn = styled.button`
  width: 48px;
  height: 48px;
  pad: 1px 6px;
  border-radius: 50%;
  border: none;
  background-color: #017be8;
  margin: auto;
  cursor: pointer;
  svg {
    width: 24px;
  }
`;

export default SearchButton;

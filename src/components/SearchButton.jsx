import { SVG_CODE } from "../constants/search";

const SearchButton = (props) => {
  const { searchWord } = props;

  return <div onClick={searchWord}>{SVG_CODE}</div>;
};

export default SearchButton;

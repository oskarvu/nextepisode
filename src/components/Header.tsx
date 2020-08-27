import React from "react";
import tw from "twin.macro";

import SearchBar from "./SearchBar";

const StyledHeader = tw.header`
  flex items-baseline justify-center
  bg-white
`;

function Header() {
  return (
    <StyledHeader>
      {/*<span tw="w-0">logo</span>*/}
      <SearchBar />
      {/*<span tw="w-0">theme</span>*/}
    </StyledHeader>
  );
}

export default Header;

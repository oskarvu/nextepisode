import React from "react";
import tw from "twin.macro";

import SearchBar from "./SearchBar";

const Container = tw.header`
  sticky top-0 z-10
  w-full
  flex items-baseline justify-center
  bg-white
`;

function Header() {
  return (
    <Container>
      {/*<span tw="w-0">logo</span>*/}
      <SearchBar />
      {/*<span tw="w-0">theme</span>*/}
    </Container>
  );
}

export default Header;

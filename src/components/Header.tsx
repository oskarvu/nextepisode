import React, { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";

import SearchBar from "./SearchBar";

const Container = styled.div(({ isScrolled }: { isScrolled: boolean }) => [
  tw`
    sticky top-0 z-10
    flex items-baseline justify-center
    w-full
    bg-white
  `,
  isScrolled && tw`shadow-lg`,
]);

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleFirstDownScroll() {
      setIsScrolled(true);
      window.removeEventListener("scroll", handleFirstDownScroll);
    }

    function handleScrollToTop() {
      if (window.pageYOffset === 0) {
        window.pageYOffset === 0 && setIsScrolled(false);
        window.addEventListener("scroll", handleFirstDownScroll);
      }
    }

    window.addEventListener("scroll", handleFirstDownScroll);
    window.addEventListener("scroll", handleScrollToTop);
    return () => {
      window.removeEventListener("scroll", handleFirstDownScroll);
      window.removeEventListener("scroll", handleScrollToTop);
    };
  }, []);

  return (
    <Container isScrolled={isScrolled}>
      {/*<span tw="w-0">logo</span>*/}
      <SearchBar />
      {/*<span tw="w-0">theme</span>*/}
    </Container>
  );
}

export default Header;
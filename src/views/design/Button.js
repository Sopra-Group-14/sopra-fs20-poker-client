import styled from "styled-components";
export const Button = styled.button`
 @import url('https://fonts.googleapis.com/css?family=Roboto:900');

$bg: #3c3c3c;
$white: #fff;
$black: #202121;

@mixin transition($property: all, $duration: 0.5s, $ease: cubic-bezier(0.65,-0.25,0.25, 1.95)) {
  transition: $property $duration $ease;
}

* {
  box-sizing: border-box;
  &::before, &::after {
    box-sizing: border-box;
  }
}

body {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  background: $bg;
}

button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  &.learn-more {
    @include transition(all, 0.5s, cubic-bezier(0.65,-0.25,0.25,1.95));
    font-weight: 900;
    color: $black;
    padding: 1.25rem 2rem;
    background: $white;
    text-transform: uppercase;
    &:hover, &:focus, &:active {
      letter-spacing: 0.125rem;
    }
  }
}

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }
  
  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }
}
`;

import styled from "styled-components"
import { rem } from "polished"

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 55vh;
  min-height: ${rem(500)};
  transform: translate3d(0, 0, 0);
  background-color: ${(props) => props.theme.colors.odd};

  @media all and (max-width: 1024px) {
    min-height: ${rem(480)};
  }

  @media all and (max-width: 767px) {
    height: auto;
    min-height: 0;
    flex-wrap: wrap;
    flex-direction: column-reverse;
    background-color: ${(props) => props.theme.colors.white};
  }
`

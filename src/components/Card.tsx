import styled from "styled-components"
import { rem } from "polished"

/**
 * Types
 */
export interface CardProps {}

const Card = styled.div<CardProps>`
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  height: 100%;
  flex: 0 0 50%;

  &:first-child {
    padding: 0;
  }
  
  padding: ${rem(54)} ${rem(40)};
  padding: 3vw 2vw;
  position: relative;

  @media all and (max-width: 767px) {
    padding: 24px 20px 16px;
  }
  
  @media all and (max-width: 480px) {
    min-height: 0;
    flex: 0 0 100%;
    height: auto;
    background-color: ${(props) => props.theme.colors.odd};

    &:first-child {
      margin-bottom: 30px;
      background-color: ${(props) => props.theme.colors.white};

      @media all and (min-width: 481px) {
        height: 400px;
      }
    }
  }
`

export default Card

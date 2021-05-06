import styled from "styled-components"
import { rem, rgba } from "polished"
import { slideUpPopover } from "../../core/GlobalStyles"
import Button from "../../components/Button"
import { RadioGroup as StockRadioGroup } from 'react-radio-buttons'

export const Wrapper = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0 3px 12px 0 rgba(83, 86, 92, 0.1), 0 2px 3px 0 rgba(83, 86, 92, 0.2);
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.white};
  width: ${rem(221)};
  margin-bottom: ${rem(15)};
  z-index: 11;
  transform: translate3d(0, 10px, 0);
  animation: 0.3s ${slideUpPopover} forwards cubic-bezier(0.2, 1.64, 0.86, 0.86);
  backface-visibility: visible;

  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-top-color: ${(props) => props.theme.colors.white};
    border-width: 6px;
    margin-left: -6px;
  }

  ${Button} {
    margin-top: ${rem(10)};
  }
  
  [data-reach-slider-input][data-orientation="horizontal"] {
    height: 2px;
  }

  [data-reach-slider-marker][data-orientation="horizontal"] {
    width: ${rem(20)};
    height: ${rem(20)};
    background-color: transparent;
    cursor: pointer;
    margin: 0;

    &:before {
      content: "";
      position: absolute;
      height: 2px;
      width: ${rem(60)};
      left: 50%;
      top: 50%;
      z-index: -1;
      margin: 0;
      transform: translate3d(-50%, -50%, 0);
      backface-visibility: hidden;
      background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 212, 255, 0) 100%);
      transition: all ${(props) => props.theme.transition.base};
    }
  }

  [data-reach-slider-track] {
    background-color: ${(props) => rgba(props.theme.colors.dark, 0.16)};

    &[data-orientation="horizontal"] {
      &::after,
      &::before {
        content: "";
        width: ${rem(15)};
        height: ${rem(20)};
        top: ${rem(-10)};
        z-index: 1;
        position: absolute;
        background-color: ${(props) => props.theme.colors.white};
      }

      &::before {
        left: auto;
        right: 100%;
      }

      &::after {
        content: "";
        left: 100%;
        right: auto;
      }
    }
  }

  [data-reach-slider-handle] {
    width: 14px;
    height: 14px;
    outline: none;
    border: 0;
    box-shadow: 0 0 0 ${rem(2)} ${(props) => props.theme.colors.dark};
    background-color: ${(props) => props.theme.colors.white};
    transition: box-shadow ${(props) => props.theme.transition.base};
    cursor: pointer;
    z-index: 10;

    &:hover,
    &:active {
      box-shadow: 0 0 0 ${rem(2)} ${(props) => props.theme.colors.primary};

      ~ [data-reach-slider-marker][data-orientation="horizontal"] {
        &:before {
          width: ${rem(80)};
          background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(26, 176, 29, 1) 50%, rgba(0, 212, 255, 0) 100%);
        }
      }
    }
  }

  [data-reach-slider-range] {
    background-color: ${(props) => rgba(props.theme.colors.dark, 0.16)};
  }

  @media all and (max-width: 767px) {
    width: 90%;
  }

  @media all and (max-width: 480px) {
    [data-reach-slider-input] {
      position: absolute;
      left: 60px;
      right: 40px;
      top: 8px;
    }

    ${Button} {
      margin-top: 0;
    }

    [data-reach-slider-track] {
      background-color: ${(props) => rgba(props.theme.colors.dark, 0.16)};

      &[data-orientation="horizontal"] {
        &::after,
        &::before {
          width: 30px;
        }
      }
    }
  }
`

export const SliderInfo = styled.div`
  margin-bottom: ${rem(14)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${rem(10)};

  h4 {
    margin-bottom: 0;
    font-size: inherit;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    letter-spacing: ${rem(2.5)};
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.primary};
  }

  span {
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.dark};
  }

  @media all and (max-width: 767px) {
    font-size: 10px;
    position: relative;
    z-index: 10;

    span {
      width: 30px;
    }
  }
`

export const Group = styled.div`
  padding-bottom: ${rem(14)};
  position: relative;
`

export const Inner = styled.div`
  overflow: hidden;
  padding: ${rem(14)} ${rem(14)};
  width: 100%;
  height: 100%;
`

export const RadioGroup = styled(StockRadioGroup)`
  * {
    box-sizing: content-box;
  }
`

export const CountWrapper = styled.div`
  display: inline-flex;
  width: 100%;
`

export const CountButton = styled.button`
  cursor: pointer;
  color: rgb(26, 176, 29);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(26, 176, 29);
  border-radius: 1px;
  padding: 4px;
  flex: 1 1 0%;
  margin-bottom: 0px;
  margin-right: 2px;
  text-align: center;
  font-weight: 900;
  height: 30px;
  background-color: white;
  
  &:hover {
    background-color: rgb(26, 176, 29);
    color: white;
  }
`

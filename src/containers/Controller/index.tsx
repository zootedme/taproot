import React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import { SliderInput, SliderTrack, SliderRange, SliderHandle, SliderMarker } from "@reach/slider"
import { RadioButton } from 'react-radio-buttons';

import {
  CONTROLLER_ROTATION_MAX,
  CONTROLLER_ROTATION_MIN,
  CONTROLLER_SIZE_MIN,
  CONTROLLER_SIZE_MAX,
  CONTROLLER_SIZE_STEP,
} from "../../helpers/const"

import Button, { ButtonColor, ButtonSize } from "../../components/Button"
import * as S from "./styled"
import { RadioGroup } from "./styled"

interface Props {
  rotation: number
  scale: number
  overlay: string
  onScale: (size: number) => void
  onRotation: (angle: number) => void
  onClose: () => void
  onSelectOverlay: (value: string) => void
  onAddOverlay: () => void
  onRemoveOverlay: () => void
}

const Controller: React.FC<Props> = (
  {
    rotation,
    scale,
    overlay,
    onRotation,
    onScale,
    onClose,
    onSelectOverlay,
    onAddOverlay,
    onRemoveOverlay,
  }: Props) => {
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <S.Wrapper>
        <S.Inner>
          <S.Group>
            <S.SliderInfo>
              <h4>Size</h4>
              <span>{(scale * 100).toFixed(0)}%</span>
            </S.SliderInfo>

            <SliderInput
              value={scale}
              min={CONTROLLER_SIZE_MIN}
              max={CONTROLLER_SIZE_MAX}
              step={CONTROLLER_SIZE_STEP}
              onChange={onScale}
            >
              <SliderTrack>
                <SliderRange />
                <SliderHandle />
                <SliderMarker value={scale} />
              </SliderTrack>
            </SliderInput>
          </S.Group>

          <S.Group>
            <S.SliderInfo>
              <h4>Angle</h4>
              <span>{rotation.toFixed(0)}°</span>
            </S.SliderInfo>

            <SliderInput
              value={rotation}
              min={CONTROLLER_ROTATION_MIN}
              max={CONTROLLER_ROTATION_MAX}
              onChange={onRotation}
            >
              <SliderTrack>
                <SliderRange />
                <SliderHandle />
                <SliderMarker value={rotation} />
              </SliderTrack>
            </SliderInput>
          </S.Group>
          <S.Group>
            <S.SliderInfo>
              <h4>Effect</h4>
            </S.SliderInfo>
            <RadioGroup onChange={onSelectOverlay} horizontal value={overlay}>
              <RadioButton value="mask" padding={4} iconSize={8} iconInnerSize={8} pointColor="#1AB01D" rootColor="#636363">
                Mask
              </RadioButton>
              <RadioButton value="block" padding={4} iconSize={8} iconInnerSize={8} pointColor="#1AB01D" rootColor="#636363">
                Block
              </RadioButton>
            </RadioGroup>
          </S.Group>
          <S.Group>
            <S.SliderInfo>
              <h4>Add more</h4>
            </S.SliderInfo>
            <S.CountWrapper>
              <S.CountButton onClick={onRemoveOverlay}>
                -
              </S.CountButton>
              <S.CountButton onClick={onAddOverlay}>
                +
              </S.CountButton>
            </S.CountWrapper>
          </S.Group>

          <Button $color={ButtonColor.Gray} $size={ButtonSize.Xs} onClick={onClose}>
            Save
          </Button>
        </S.Inner>
      </S.Wrapper>
    </OutsideClickHandler>
  )
}

export default Controller

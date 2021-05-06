import React, { useRef, useState } from "react"
import { Stage, Layer } from "react-konva"
import { Vector2d } from "konva/types/types"
import { KonvaEventObject } from "konva/types/Node"
import { not } from "ramda"

import {
  MASK_HEIGHT,
  MASK_WIDTH,
  BLOCK_HEIGHT,
  BLOCK_WIDTH,
  SCALE_FACTOR,
  STAGE_HEIGHT,
  STAGE_WIDTH,
  MASK_SCALE,
  BLOCK_SCALE, CONTROLLER_SIZE,
} from "../../helpers/const"
import { download } from "../../helpers/utils"
import { IconEdit, IconSave, IconShare } from "../../icons"
import Figure from "../../components/Figure"
import Button, { ButtonColor, ButtonSize } from "../../components/Button"
import * as S from "./styled"
import Controller from "../Controller"

interface Props {
  file?: string
}

interface Overlay {
  coordinates: Vector2d
  scale: Vector2d
  rotation: number
  kind: string
  unscaledDims: Vector2d
  overlayScale: number
}

export enum Cursor {
  Default,
  Grab,
  Grabbing,
}

export const CURSORS = new Map<Cursor, "initial" | "grab" | "grabbing">([
  [Cursor.Default, "initial"],
  [Cursor.Grab, "grab"],
  [Cursor.Grabbing, "grabbing"],
])

const defaultOverlay = () => {
  return {
    coordinates: {
      x: 250,
      y: 150,
    },
    rotation: 0,
    scale: { x: CONTROLLER_SIZE, y: CONTROLLER_SIZE },
    kind: "mask",
    unscaledDims: {
      x: MASK_WIDTH,
      y: MASK_HEIGHT,
    },
    overlayScale: MASK_SCALE,
  }
}

const Sandbox: React.FC<Props> = ({ file }: Props) => {
  const stageRef = useRef<any>(null)

  const [overlays, setOverlays] = useState<Array<Overlay>>([
    {
      coordinates: {
        x: 270,
        y: 161,
      },
      rotation: 4,
      scale: { x: CONTROLLER_SIZE, y: CONTROLLER_SIZE },
      kind: "mask",
      unscaledDims: {
        x: MASK_WIDTH,
        y: MASK_HEIGHT,
      },
      overlayScale: MASK_SCALE,
    }
  ])
  const [edit, setEdit] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number>(0)
  const [cursor, setCursor] = useState<Cursor>(Cursor.Default)

  const onEdit = () => {
    setEdit(not(edit))
  }

  const onScale = (scale: number) => {
    setOverlays((prev) => {
      const next = [...prev]
      next[selectedIndex] = {
        ...next[selectedIndex],
        scale: {
          x: scale,
          y: scale,
        }
      }
      return next
    })
  }

  const onSave = () => {
    if (stageRef?.current) {
      download(stageRef.current.toDataURL())
    }
  }

  const onDragMove = (index: number, { target }: KonvaEventObject<DragEvent | TouchEvent>) => {
    setOverlays((prev: Array<Overlay>) => {
      const next = [...prev]
      next[index] = {
        ...next[index],
        coordinates: {
          x: target.x(),
          y: target.y(),
        },
      }
      return next
    })
  }

  const onSelectOverlay = (value: string) => {
    if (value === 'mask') {
      setOverlays((prev: Array<Overlay>) => {
        const next = [...prev]
        next[selectedIndex] = {...next[selectedIndex],
          kind: "mask",
          unscaledDims: {
            x: MASK_WIDTH,
            y: MASK_HEIGHT,
          },
          overlayScale: MASK_SCALE,
        }
        return next
      })
    } else if (value === 'block') {
      setOverlays((prev: Array<Overlay>) => {
        const next = [...prev]
        next[selectedIndex] = {...next[selectedIndex],
        kind: "block",
        unscaledDims: {
          x: BLOCK_WIDTH,
          y: BLOCK_HEIGHT,
        },
        overlayScale: BLOCK_SCALE,
      }
      return next
    })
    }
  }

  const onAddOverlay = () => {
    const nextOverlays = [...overlays.map(o => {return {...o, selected: false}}), defaultOverlay()]
    setOverlays(nextOverlays)
  }

  const onRemoveOverlay = () => {
    if (overlays.length > 1) {
      const nextOverlays = [...overlays.slice(0, overlays.length - 1)]
      if (selectedIndex > (nextOverlays.length - 1)) {
        setSelectedIndex(nextOverlays.length - 1)
      }
      setOverlays(nextOverlays)
    }
  }

  const onMouseDown = (index: number) => {
    setCursor(Cursor.Grabbing)
  }

  const onMouseUp = (index: number) => {
    setCursor(Cursor.Default)
    setSelectedIndex(index)
  }

  const onMouseEnter = (index: number) => {
    setCursor(Cursor.Grab)
    setHoveredIndex(index)
  }

  const onMouseLeave = (index: number) => {
    setCursor(Cursor.Default)
    setHoveredIndex(-1)
  }

  const onSetRotation = (rotation: number) => {
    setOverlays((prev) => {
      const next = [...prev]
      next[selectedIndex] = {...next[selectedIndex],
        rotation: rotation
      }
      return next
    })
  }

  const overlayFile = (overlay?: string): string => {
    if (overlay === 'block') {
      return '/static/images/green-square.png'
    } else {
      return '/static/images/mask.svg';
    }
  }

  const computedScale = (scale: Vector2d, overlayScale: number) => {
    return {x: scale.x * overlayScale, y: scale.y * overlayScale}
  }

  const computedOffsetX = (overlay: Overlay) => {
    return (overlay.unscaledDims.x / SCALE_FACTOR) / 2
  }

  const computedOffsetY = (overlay: Overlay) => {
    return (overlay.unscaledDims.y / SCALE_FACTOR) / 2
  }

  return (
    <S.Wrapper preview={file} cursor={cursor}>
      <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT} ref={stageRef} className="stage">
        <Layer>
          <Figure fit src={file || "/static/images/default.png"} />
          {overlays.map((overlay, index) => {
            return <Figure
              key={index}
              draggable
              scale={computedScale(overlay.scale, overlay.overlayScale)}
              rotation={overlay.rotation}
              src={overlayFile(overlay.kind)}
              x={overlay.coordinates.x}
              y={overlay.coordinates.y}
              offsetX={computedOffsetX(overlay)}
              offsetY={computedOffsetY(overlay)}
              onMouseEnter={() => onMouseEnter(index)}
              onMouseLeave={() => onMouseLeave(index)}
              onMouseDown={() => onMouseDown(index)}
              onMouseUp={() => onMouseUp(index) }
              onDragMove={(target: KonvaEventObject<DragEvent | TouchEvent>) => onDragMove(index, target)}
              isMouseOver={edit && hoveredIndex === index}
              isSelected={edit && selectedIndex === index}
            />
          })}
        </Layer>
      </Stage>

      {file ? (
        <S.Actions>
          <S.Relative>
            {edit ? (
              <Controller
                rotation={overlays[selectedIndex].rotation}
                scale={overlays[selectedIndex].scale.x}
                overlay={overlays[selectedIndex].kind}
                onRotation={onSetRotation}
                onScale={onScale}
                onClose={onEdit}
                onSelectOverlay={onSelectOverlay}
                onAddOverlay={onAddOverlay}
                onRemoveOverlay={onRemoveOverlay}
              />
            ) : null}

            <Button $color={ButtonColor.Black} $size={ButtonSize.Md} onClick={onEdit}>
              <IconEdit />
              Edit effect
            </Button>
          </S.Relative>
          <S.Relative>
            <Button $color={ButtonColor.Red} $size={ButtonSize.Md} onClick={onSave}>
              <IconSave />
              Save
            </Button>
          </S.Relative>
          <S.Relative>
            <Button
              $color={ButtonColor.Red}
              $size={ButtonSize.Md}
              as="a"
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftaproot.fish&text=Do%20your%20part%20to%20signal%20your%20support%20for%20the%20Bitcoin%20Taproot%20upgrade%21%20Smaller%20and%20faster%20transactions%20with%20Schnorr%21%20Increased%20privacy%20for%20all%20types%20of%20transactions%21&hashtags=taproot"
            >
              <IconShare />
              Share
            </Button>
          </S.Relative>
        </S.Actions>
      ) : null}
    </S.Wrapper>
  )
}

export default Sandbox

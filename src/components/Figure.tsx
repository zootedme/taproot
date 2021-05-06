import React from "react"
import useImage from "use-image"
import { head } from "ramda"
import { Image } from "react-konva"
import { Vector2d } from "konva/types/types"

import { scaleFigure } from "../helpers/utils"
import { KonvaEventObject } from "konva/types/Node"

/**
 * Types
 */
interface Props {
  key?: number
  x?: number
  y?: number
  offsetX?: number
  offsetY?: number
  rotation?: number
  scale?: Vector2d
  src?: string
  fit?: boolean
  isMouseOver?: boolean
  isSelected?: boolean
  draggable?: boolean
  onMouseEnter?: (event: KonvaEventObject<MouseEvent>) => void
  onMouseLeave?: (event: KonvaEventObject<MouseEvent>) => void
  onMouseDown?: (event: KonvaEventObject<MouseEvent>) => void
  onMouseUp?: (event: KonvaEventObject<MouseEvent>) => void
  onDragMove?: (event: KonvaEventObject<DragEvent | TouchEvent>) => void
}

const Figure: React.FC<Props> = ({
  key,
  fit,
  src,
  rotation,
  scale,
  draggable,
  x,
  y,
  offsetX,
  offsetY,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onDragMove,
  isMouseOver,
  isSelected,
  ...rest
}: Props) => {
  const meta = useImage(src as string)
  const image = head(meta) as HTMLImageElement
  const config = fit ? scaleFigure(image) : rest

  return (
    <Image
      key={key}
      x={x}
      y={y}
      offsetX={offsetX}
      offsetY={offsetY}
      image={image}
      draggable={draggable}
      scale={scale}
      rotation={rotation}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDragEnd={onDragMove}
      stroke={'#1AB01D'}
      dash={[10, 10]}
      strokeWidth={isMouseOver || isSelected ? 5 : 0}
      {...config}
    />
  )
}

export default Figure

import React from "react"
import { useDropzone } from "react-dropzone"
import { Row, Col } from "react-styled-flexboxgrid"

import Button, { ButtonColor, ButtonSize } from "../../components/Button"
import { IconInfo, IconYoutube } from "../../icons"

import * as S from "./styled"

interface Props {
  onDrop: (files: File[]) => void
}

const Info: React.FC<Props> = ({ onDrop }: Props) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <S.Wrapper>
      <Row middle="xs" center="xs">
        <Col xs={12}>
          <h1>Taproot Mask</h1>
          <p>
            Do your part to signal your support for the Bitcoin Taproot upgrade!
            Smaller and faster transactions with Schnorr!
            Increased privacy for all types of transactions! <br/><br/>
            Upload your photo, choose your mask, and download or share with the Twitter button.
          </p>
          <S.Links>
            <a href="https://bitcoincore.org/en/releases/0.21.1/#taproot-soft-fork" target="_blank" rel="noreferrer">
              <IconInfo />
              <span>Taproot migration</span>
            </a>
            <a href="https://www.youtube.com/watch?v=KbF6daItSrw" target="_blank" rel="noreferrer">
              <IconYoutube />
              <span>Video explainer</span>
            </a>
          </S.Links>
          <S.Divider />
          <S.UploadWrapper>
            <div>
              <Button $color={ButtonColor.White} $size={ButtonSize.Lg} {...getRootProps()}>
                Pick Photo
                <input {...getInputProps()} name="file" accept="image/*" />
              </Button>
              <S.Hint>or drag and drop your file here</S.Hint>
            </div>
          </S.UploadWrapper>
        </Col>
      </Row>
    </S.Wrapper>
  )
}

export default Info

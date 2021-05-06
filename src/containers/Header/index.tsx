import React from "react"
import { Grid } from "react-styled-flexboxgrid"

import * as S from "./styled"

const Header: React.FC = () => {
  return (
    <S.Wrapper>
      <Grid>
        <S.Logo href="/">
          <img src="/static/images/green-square-logo.png" alt="TAPROOT MASK" />
          <span>Taproot Mask</span>
        </S.Logo>
      </Grid>
    </S.Wrapper>
  )
}

export default Header

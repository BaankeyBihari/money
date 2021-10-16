import * as React from "react"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import consola from "consola"

import MFSelectBox from "@components/MFSelectBox"
import useMFList from "@hooks/useMFList"

const Compare = () => {
  const data = useMFList({
    enabled: true,
  })
  React.useEffect(() => {
    consola.debug("data", data)
  }, [data])
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          {data.isSuccess ? <MFSelectBox data={data.data} /> : null}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Compare

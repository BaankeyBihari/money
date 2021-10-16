import * as React from "react"

import Grid from "@mui/material/Grid"

import Autocomplete from "@components/MFSelectBox/Autocomplete"
import ChipBox from "@components/MFSelectBox/ChipBox"

const Browse = (props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ChipBox {...props} />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete {...props} />
      </Grid>
    </Grid>
  )
}

export default Browse

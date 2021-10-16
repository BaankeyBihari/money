import * as React from "react"

import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import consola from "consola"
import Fuse from "fuse.js"

import useDebounce from "@hooks/useDebounce"
import { useStore } from "@hooks/useStore"
import schemeDisplayName from "@tools/schemeDisplayName"

const BrowseAutocomplete = (props) => {
  const { data } = props
  React.useEffect(() => {
    consola.debug("data", data)
  }, [data])
  const [options, setOptions] = React.useState(
    data.slice(0, Math.min(100, data.length))
  )
  const { selectedSchemes, selectScheme } = useStore()
  const [inputText, setInputText] = React.useState("")
  const debouncedText = useDebounce(inputText)
  const [value, setValue] = React.useState<any | null>(null)
  React.useEffect(() => {
    if (debouncedText.length > 0) {
      const fuse = new Fuse(
        data.filter(
          (e: any) =>
            !selectedSchemes.some((x) => x.schemeCode === e.schemeCode)
        ),
        {
          keys: ["schemeCode", "schemeName"],
          findAllMatches: true,
        }
      )
      let tData = fuse
        .search(debouncedText)
        .map((e) => e.item)
        .filter(
          (e: any) =>
            !selectedSchemes.some((x) => x.schemeCode === e.schemeCode)
        )
      setOptions(tData.slice(0, Math.min(100, tData.length)))
    } else {
      let tData = data.filter(
        (e) => !selectedSchemes.some((x) => x.schemeCode === e.schemeCode)
      )
      setOptions(tData.slice(0, Math.min(100, tData.length)))
    }
  }, [data, debouncedText, selectedSchemes])
  return (
    <Box sx={{ my: 4 }}>
      <Autocomplete
        disablePortal
        placeholder="Select Mutual Funds here..."
        value={value}
        onChange={(_event: any, newValue: any | null) => {
          setValue(null)
          setInputText("")
          selectScheme(newValue)
        }}
        id="combo-MFSelect"
        options={options}
        renderInput={(params) => <TextField {...params} label="Mutual Fund" />}
        getOptionLabel={(e: any) => schemeDisplayName(e)}
        inputValue={inputText}
        onInputChange={(_event: any, newInputValue: string) => {
          setInputText(newInputValue)
        }}
      />
    </Box>
  )
}

export default BrowseAutocomplete

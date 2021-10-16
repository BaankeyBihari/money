import * as React from "react"

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd"
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

import useBoolean from "@hooks/useBoolean"
import { useStore } from "@hooks/useStore"
import schemeDisplayName from "@tools/schemeDisplayName"

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}))

const CustomChip = (props) => {
  const { value: isExpanded, toggle: toggleExpansion } = useBoolean(false)
  const isBookMarked = props.bookmarkedSchemes.find(
    (e) => e.schemeCode === props.scheme.schemeCode
  )
  return (
    <Chip
      onClick={() => toggleExpansion()}
      icon={
        isBookMarked ? (
          <BookmarkRemoveIcon
            onClick={(e) => {
              props.removeBookmarkedScheme(isBookMarked.id)
              e.stopPropagation()
            }}
          />
        ) : (
          <BookmarkAddIcon
            onClick={(e) => {
              props.bookmarkScheme(props.scheme)
              e.stopPropagation()
            }}
          />
        )
      }
      label={
        isExpanded
          ? schemeDisplayName(props.scheme)
          : `${schemeDisplayName(props.scheme).slice(
              0,
              Math.min(15, schemeDisplayName(props.scheme).length)
            )}...`
      }
      variant={isExpanded ? "filled" : "outlined"}
      onDelete={() => props.removeSelectedScheme(props.scheme.id)}
      color={isBookMarked ? "primary" : "default"}
    />
  )
}

export default function ChipsArray() {
  const {
    selectedSchemes,
    removeSelectedScheme,
    bookmarkScheme,
    bookmarkedSchemes,
    removeBookmarkedScheme,
  } = useStore()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {selectedSchemes.length ? (
        selectedSchemes.map((data) => {
          return (
            <ListItem key={data.id}>
              <CustomChip
                scheme={data}
                removeSelectedScheme={removeSelectedScheme}
                bookmarkScheme={bookmarkScheme}
                bookmarkedSchemes={bookmarkedSchemes}
                removeBookmarkedScheme={removeBookmarkedScheme}
              />
            </ListItem>
          )
        })
      ) : (
        <Typography variant="overline">No Mutual Fund Selected</Typography>
      )}
    </Box>
  )
}

import * as React from "react"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Link from "@components/Link"

const Portfolio = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5-beta with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Container>
  )
}

Portfolio.getInitialProps = () => {
  return { title: "Portfolio", currentNavItem: "portfolio", sampleNeeded: true }
}

export default Portfolio

import React from "react"

import { CacheProvider } from "@emotion/react"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import { ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Head from "next/head"
import { useRouter } from "next/router"

import NavBar from "@components/Navbar"
import SampleContent from "@components/SampleContent"
import StickyFooter from "@components/StickyFooter"
import { DefaultLayoutProps } from "@layout/LayoutProps"
import theme from "@styles/theme"
import createEmotionCache from "@tools/createEmotionCache"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const { sampleNeeded = false } = pageProps
  const router = useRouter()
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Container maxWidth="lg">
          <NavBar {...props} currentNavItem={pageProps.currentNavItem} />
          <Grid container justifyContent="center" alignItems="center">
            {sampleNeeded ? (
              <Grid item xs={12}>
                <SampleContent />
              </Grid>
            ) : null}
            {process.env.NODE_ENV === "development" ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {router.query?.mfCode}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {router.pathname}
                  </Typography>
                </Grid>
              </React.Fragment>
            ) : null}
            <Grid item xs={12}>
              <CssBaseline />
              <Component {...pageProps} />
            </Grid>
          </Grid>
        </Container>
        <StickyFooter />
      </ThemeProvider>
    </CacheProvider>
  )
}

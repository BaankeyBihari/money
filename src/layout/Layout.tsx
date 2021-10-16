import React from "react"

import { CacheProvider } from "@emotion/react"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import { ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import consola from "consola"
import getConfig from "next/config"
import Head from "next/head"
import { useRouter } from "next/router"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Hydrate } from "react-query/hydration"

import NavBar from "@components/Navbar"
import SampleContent from "@components/SampleContent"
import StickyFooter from "@components/StickyFooter"
import { useCreateStore, ZustandProvider } from "@hooks/useStore"
import LayoutProps from "@layout/LayoutProps"
import theme from "@styles/theme"
import createEmotionCache from "@tools/createEmotionCache"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function DefaultLayout(props: LayoutProps) {
  const { publicRuntimeConfig } = getConfig()
  consola.level = publicRuntimeConfig.CONSOLA_LEVEL
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime:
              parseInt(publicRuntimeConfig.MF_DATA_EXPIRY_SECONDS) * 2000,
            refetchInterval:
              parseInt(publicRuntimeConfig.MF_DATA_EXPIRY_SECONDS) * 1000,
          },
        },
      })
  )
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const createStore = useCreateStore(
    pageProps?.initialZustandState ? pageProps.initialZustandState : {}
  )
  const { sampleNeeded = false } = pageProps
  const router = useRouter()
  return (
    <ZustandProvider createStore={createStore}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>{pageProps.title}</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <div className="content">
                <Container maxWidth={false}>
                  <NavBar
                    {...props}
                    currentNavItem={pageProps.currentNavItem}
                  />
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
                      {/* <CssBaseline /> */}
                      <Component {...pageProps} />
                    </Grid>
                  </Grid>
                </Container>
              </div>
              <StickyFooter />
            </ThemeProvider>
          </CacheProvider>
          <ReactQueryDevtools initialIsOpen />
        </Hydrate>
      </QueryClientProvider>
    </ZustandProvider>
  )
}

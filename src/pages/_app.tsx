import * as React from "react"

import DefaultLayout from "@layout/DefaultLayout"
import AppProps from "@layout/LayoutProps"

// import { CacheProvider, EmotionCache } from "@emotion/react"
// import CssBaseline from "@mui/material/CssBaseline"
// import { ThemeProvider } from "@mui/material/styles"
// import { AppProps } from "next/app"
// import Head from "next/head"

// import createEmotionCache from "@components/createEmotionCache"
// import Navbar from "@components/Navbar"
// import StickyFooter from "@components/StickyFooter"
// import theme from "@styles/theme"

// // Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache()

// interface MyAppProps extends AppProps {
//   emotionCache?: EmotionCache
// }

// export default function MyApp(props: MyAppProps) {
//   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
//   return (
//     <CacheProvider value={emotionCache}>
//       <Head>
//         <title>{pageProps.title}</title>
//         <meta name="viewport" content="initial-scale=1, width=device-width" />
//       </Head>
//       <ThemeProvider theme={theme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <CssBaseline />
//         <Navbar currentNavItem={pageProps.currentNavItem} />
//         <Component {...pageProps} />
//         <StickyFooter />
//       </ThemeProvider>
//     </CacheProvider>
//   )
// }

export default function MyApp(props: AppProps) {
  return <DefaultLayout {...props} />
}

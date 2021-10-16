import * as React from "react"

import DefaultLayout from "@layout/Layout"
import AppProps from "@layout/LayoutProps"

export default function MyApp(props: AppProps) {
  return <DefaultLayout {...props} />
}

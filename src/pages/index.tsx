import * as React from "react"

import dynamic from "next/dynamic"

const IndexW = dynamic(() => import("@components/LazyPages"))

const Index = () => {
  return <IndexW />
}

export async function getStaticProps() {
  return {
    props: { title: "Home", currentNavItem: "home", sampleNeeded: true },
  }
}

export default Index

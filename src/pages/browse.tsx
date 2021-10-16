import * as React from "react"

import dynamic from "next/dynamic"

const BrowseW = dynamic(() => import("@components/LazyPages/Browse"))

const Browse = () => {
  return <BrowseW />
}

export async function getStaticProps() {
  return {
    props: { title: "Browse", currentNavItem: "browse" },
  }
}

export default Browse

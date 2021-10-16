import * as React from "react"

import dynamic from "next/dynamic"

const CompareW = dynamic(() => import("@components/LazyPages/Compare"))

const Compare = () => {
  return <CompareW />
}

export async function getStaticProps() {
  return {
    props: { title: "Compare", currentNavItem: "compare" },
  }
}

export default Compare

import * as React from "react"

import dynamic from "next/dynamic"

const PortfolioW = dynamic(() => import("@components/LazyPages"))

const Portfolio = () => {
  return <PortfolioW />
}

export async function getStaticProps() {
  return {
    props: {
      title: "Portfolio",
      currentNavItem: "portfolio",
      sampleNeeded: true,
    },
  }
}

export default Portfolio

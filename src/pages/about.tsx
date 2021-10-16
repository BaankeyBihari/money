import * as React from "react"

import dynamic from "next/dynamic"

const AboutW = dynamic(() => import("@components/LazyPages"))

const About = () => {
  return <AboutW />
}

export async function getStaticProps() {
  return {
    props: { title: "About", currentNavItem: "about", sampleNeeded: true },
  }
}

export default About

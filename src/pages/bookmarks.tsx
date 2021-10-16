import * as React from "react"

import dynamic from "next/dynamic"

const BookmarksW = dynamic(() => import("@components/LazyPages"))

const Bookmarks = () => {
  return <BookmarksW />
}

export async function getStaticProps() {
  return {
    props: {
      title: "Bookmarks",
      currentNavItem: "bookmarks",
      sampleNeeded: true,
    },
  }
}

export default Bookmarks

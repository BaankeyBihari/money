import { EmotionCache } from "@emotion/react"
import { AppProps } from "next/app"

interface BaseLayoutProps extends AppProps {
  useLayout: string
}

export default interface LayoutProps extends BaseLayoutProps {
  emotionCache?: EmotionCache
}

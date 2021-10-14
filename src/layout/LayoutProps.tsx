import { EmotionCache } from "@emotion/react"
import { AppProps } from "next/app"

interface BaseLayoutProps extends AppProps {
  useLayout: string
}

export interface DefaultLayoutProps extends BaseLayoutProps {
  emotionCache?: EmotionCache
}

export default interface LayoutProps extends DefaultLayoutProps {}

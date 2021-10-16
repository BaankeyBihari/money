import consola from "consola"
import { useQuery } from "react-query"

const getData = async () => {
  consola.debug("fetching mfList")
  return await fetch(`api/NAVAll`).then(async (response) => {
    if (response.status === 200) {
      return await response.json()
    }
  })
}

export default function useMFList(config: {}) {
  return useQuery("MFList", () => getData(), config)
}

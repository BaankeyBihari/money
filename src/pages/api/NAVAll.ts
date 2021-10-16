import consola from "consola"
import { get, put } from "memory-cache"
import { NextApiRequest, NextApiResponse } from "next"
import getConfig from "next/config"

const objFromCSV = (line: string, category: string, fundHouse: string) => {
  if (!(category.length && fundHouse.length)) {
    return undefined
  }
  let fields = line.split(";")
  return {
    schemeCode: parseInt(fields[0]),
    schemeName: fields[3],
    category,
    fundHouse,
    ISIN_Div_Payout_or_ISIN_Growth: fields[1] === "-" ? "" : fields[1],
    ISIN_Div_Reinvestment: fields[2] === "-" ? "" : fields[2],
  }
}

const parseNAVAll = (text: string) => {
  let lines = text
    .split("\r\n")
    .map((e) => e.trim())
    .filter((e) => e.length)
  let miss = 0
  let category = ""
  let fundHouse = ""
  let collection = []
  for (const line of lines) {
    if (line.includes(";")) {
      miss = 0
      let ob = objFromCSV(line, category, fundHouse)
      if (ob) {
        collection = [...collection, ob]
      }
    } else {
      if (miss) {
        category = fundHouse
      }
      fundHouse = line
      miss += 1
    }
  }
  return collection
}

const getData = async () => {
  consola.debug("fetching mfList")
  return await Promise.all([
    fetch(`https://api.mfapi.in/mf`),
    fetch(`https://www.amfiindia.com/spages/NAVAll.txt`),
  ]).then(async (response) => {
    let parsed = await Promise.all([response[0].json(), response[1].text()])
    let NAVAll = parseNAVAll(parsed[1])
    let setNAV = new Set(NAVAll.map((e) => e.schemeCode))
    let missing = [...parsed[0]]
      .filter((x: any) => !setNAV.has(x.schemeCode))
      .reduce((arr: any[], e: any) => {
        if (arr.some((x) => e.schemeCode === x.schemeCode)) {
          return arr
        } else {
          return [
            ...arr,
            {
              ...e,
              category: "",
              fundHouse: "",
              ISIN_Div_Payout_or_ISIN_Growth: "",
              ISIN_Div_Reinvestment: "",
            },
          ]
        }
      }, [])
    // consola.debug("useMFLists:valuesParsed", parsed)
    // consola.debug("useMFLists:missed", missing)
    return [...NAVAll, ...missing].sort((a, b) => a.schemeCode - b.schemeCode)
  })
}

export default async function getNAVAll(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicRuntimeConfig } = getConfig()
  const MFList = get("MFList")

  // If the dataNAVAll doesn't exist prevent preview mode from being enabled
  if (!MFList) {
    let newMFList = await getData()
    put(
      "MFList",
      newMFList,
      parseInt(publicRuntimeConfig.MF_DATA_EXPIRY_SECONDS) * 3000
    )
    consola.debug("Sending from fetch")
    return res.status(200).json(newMFList)
  }
  consola.debug("Sending from cache")
  return res.status(200).json(MFList)
}

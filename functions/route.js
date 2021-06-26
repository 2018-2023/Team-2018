const { default: axios } = require("axios")
const express = require("express")

const router = express.Router()

router.route("/:lat/:lng").get(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  const HOTPEPPER_URL = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
  const API_KEY = "e9cd52a7ae2c9ea3"
  const format = "json"
  const lat = String(Number(req.params.lat) / 10000000)
  console.log(lat)
  const lng = String(Number(req.params.lng) / 10000000)
  console.log(lng)
  const range = "5"
  const count = "100"
  const response = await axios.get(
    `${HOTPEPPER_URL}?key=${API_KEY}&lat=${lat}&lng=${lng}&range=${range}&count=${count}&format=${format}`
  )
  console.log(
    `${HOTPEPPER_URL}?key=${API_KEY}&lat=${req.params.lat}&lng=${req.params.lng}&range=${range}&count=${count}&format=${format}`
  )
  const data = response.data
  return res.json(data)
})

module.exports = router

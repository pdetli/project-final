import express from "express"
import data from "./data.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/products", (req, res) => {
  res.json(data.products)
})

// get a list of products by querying their genre (from json file)
app.get("/api/products/genre", (req, res) => {
  const { genre } = req.query
  let vinylsGenreData = data.products

  if (genre) {
    // api/products/genre?genre=pop
    vinylsGenreData = vinylsGenreData.filter(
      (item) => item.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1
    )
  }
  res.json(vinylsGenreData)
})

app.get("/api/products/id/:id", async (req, res) => {
  const { id } = req.params
  const idNr = await data.products.find((item) => item._id === id)

  if (!idNr) {
    res.status(404).send("No product by that Id")
  } else {
    res.json(idNr)
  }
})

app.get("/", (req, res) => {
  res.send("Server is ready!!!!")
})

const port = process.env.PORT || 3003
app.listen(3003, () => {
  console.log(`Server at http://localhost:${port}`)
})

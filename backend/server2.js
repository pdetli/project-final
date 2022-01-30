import express from "express"
import data from "./data.js"
// import data2 from "./data2.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

//----Mongoose Schema ----//

// get a list of products by querying their genre (from json file)
app.get("/vinyls", (req, res) => {
  const { genre } = req.query
  let vinylsGenreData = data.response

  if (genre) {
    // api/products/?genre=pop  or /vinyls?genre=rock
    vinylsGenreData = data.filter(
      (item) => item.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1
    )
  }
  res.json({
    response: vinylsGenreData,
    success: true,
  })
})

//to get vinyls filtered by genre
// router.get("/products/:genre", async (req, res) => {
//   const genre = req.params.genre
//   if (genre === undefined) {
//     res.status(404).send("genre is not found")
//     return
//   }
//   try {

//     const products = await Product.find({ genre: genre })
//     res.status(200).send(products)
//   } catch (error) {
//     res.status(500).send()
//   }
// })

//..........//

app.get("/api/products", (req, res) => {
  res.json(data.products)
})

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params
  const idNr = data.products.find((item) => item._id === id)

  if (!idNr) {
    res.status(404).send("No product by that Id")
    console.log("id:", id)
    console.log("data.products", data.products)
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

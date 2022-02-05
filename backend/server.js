import express from "express"
// import data from "./data.js"
import cors from "cors"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
// import VinlySchema from "./schemas/vinyl.js"
// import UserSchema from "./schemas/user.js"
import crypto from "crypto"
import bcrypt from "bcrypt"
//

import dotenv from "dotenv"
import cloudinaryFramework from "cloudinary"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"

const port = process.env.PORT || 3003
const app = express()
dotenv.config()

// ++++ PINAR +++++
// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/vinylAPI"
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/vinylUpload"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Mongoose Schema for File model
const File = mongoose.model("File", {
  vinylName: String,
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    enum: ["pop", "hiphop", "rock", "electronic"],
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  nrStock: {
    type: Number,
    require: true,
  },
  brand: {
    type: String,
  },
  rating: {
    type: Number,
  },
  nrRating: {
    type: Number,
  },
  released: {
    type: String,
  },
  about: {
    type: String,
    maxlength: 900,
    trim: true,
  },
})
const cloudinary = cloudinaryFramework.v2
cloudinary.config({
  cloud_name: "dngo7qnhp",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "files",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
})

const parser = multer({ storage })

// Lists all of the endpoints
app.get("/", (req, res) => res.send(listEndpoints(app)))

app.get("/api/products", parser.single("file"), async (req, res) => {
  const perPage = 50
  const vinylList = await File.find()
    .sort({ createdAt: "desc" })
    .limit(perPage)
    .exec()
  res.status(200).json(vinylList)
})

app.post("/api/products", parser.single("file"), async (req, res) => {
  try {
    const file = await new File({
      vinylName: req.file.originalname,

      name: req.body.name,
      title: req.body.title,
      genre: req.body.genre,
      image: req.file.path,
      price: req.body.price,
      nrStock: req.body.nrStock,
      brand: req.body.brand,
      rating: req.body.rating,
      nrRating: req.body.nrRating,
      released: req.body.released,
      about: req.body.about,
    }).save()
    res.json(file)
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})

// Delete files by id
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params
  try {
    const removedFiles = await File.findOneAndDelete({ _id: id })
    if (removedFiles) {
      res.status(200).json({ response: removedFiles, success: true })
    } else {
      res.status(404).json({ response: "File not found", success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// GET a list of products by querying their genre: api/products/genre?genre="genrename"
app.get("/api/products/genre", async (req, res) => {
  const { genre } = req.query
  console.log(genre)
  try {
    // const genreData = await File.find({ genre: genre })
    const genreData = await File.find({
      genre: { $regex: `.*${genre}.*`, $options: "$i" },
    })

    if (genre) {
      res.status(200).send(genreData)
    } else {
      res.status(404).send("no genre found")
    }
  } catch (error) {
    res.status(400).json({ error, success: false })
  }
})

// GET for searching artists and albums: api/products/seacrh?name="searchname"
// or api/products/seacrh?title="searchtitle"

app.get("/api/products/search", async (req, res) => {
  try {
    const { name, title } = req.query
    const vinylByName = await File.find({
      $or: [
        {
          name: { $regex: `.*${name}.*`, $options: "$i" },
        },
        { title: { $regex: `.*${title}.*`, $options: "$i" } },
      ],
    })

    // $options here $i is used to make the search case insensitive.
    if (vinylByName.length > 0) {
      res.status(200).json({ response: vinylByName, success: true })
    } else {
      res.status(404).json({ response: "No results", success: false })
    }
  } catch (error) {
    return res.status(500).json({ response: error.message, success: false })
  }
})

// https://regex101.com/
// https://stackoverflow.com/questions/9824010/mongoose-js-find-user-by-username-like-value

app.get("/api/products/id/:id", async (req, res) => {
  const { id } = req.params
  // _id id ?
  try {
    const singleProduct = await File.findById(id)
    if (singleProduct) {
      res.status(200).json({ response: singleProduct, success: true })
    } else {
      res
        .status(404)
        .json({ response: "No vinyl found with this id", success: false })
    }
  } catch (error) {
    res.status(400).json({ error: "No id", success: false })
  }
})

//
//
//
//
//
//
//
//

// protected endpoint for the authenticated user
// app.get("/upload", authenticateUser)
// app.get("/upload", (req, res) => {
//   res.json({ message: "You are logged in! Now you can sell vinyls" })
// })

// Schema for User Login
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"), // generate a random string with hex type
  },
})

// mongoose.model for User Login Page
const User = mongoose.model("User", UserSchema)

// Sign up
app.post("/signup", async (req, res) => {
  const { email, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    if (password.length < 6) {
      throw { message: "Password must be at least 6 character long" }
    }

    const newUser = await new User({
      email,
      password: bcrypt.hashSync(password, salt),
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        email: newUser.email,
        accessToken: newUser.accessToken,
      },
      success: true,
    })
  } catch (error) {
    if (email === "") {
      res.status(400).json({
        message: "Please enter your email!",
        response: error,
        success: false,
      })
    } else if (error.code === 11000) {
      res.status(400).json({
        message: "Email already exists!",
        response: error,
        success: false,
      })
    } else if (password === "") {
      res.status(400).json({
        message: "Please enter your password!",
        response: error,
        success: false,
      })
    } else {
      res.status(400).json({
        message: "Please provide email and password",
        response: error,
        success: false,
      })
    }
  }
})

// Log in
app.post("/signin", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if ((user && bcrypt.compareSync(password), user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          email: user.email,
          accessToken: user.accessToken,
        },
      })
    } else {
      res.status(404).json({
        response: "email or password doesn't match",
        success: false,
      })
    }
  } catch (error) {
    res.status(404).json({ response: error, success: false })
  }
})

// Root
app.get("/", (req, res) => {
  res.send("Server is ready!!!!")
})

// Server running
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`)
})

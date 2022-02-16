import mongoose from "mongoose"

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

export default File

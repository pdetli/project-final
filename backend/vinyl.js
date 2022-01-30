import mongoose from "mongoose"

// _id: "11", -------------
// name: "Queen",
// title: "Gretist Hits",
// genre: "Pop",
// image: "/assets/p9.jpeg",
// price: 200,
// nrStock: 12,
// brand: "by EMI Records",
// rating: 4.6,
// nrRating: 187,
// release: "1980",

const VinylSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    genre: {
      type: String,
      enum: ["Pop", "Hip hop", "Electro", "Jazz"],
    },
    image: {
      type: String,
    },
    price: {
      type: String,
      enum: ["SEK", "USD", "EUR"],
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
    release: {
      type: Date,
    },
    about: {
      type: String,
      maxlength: 300,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export default VinylSchema

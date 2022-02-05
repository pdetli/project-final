import mongoose from "mongoose"

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
      enum: ["Pop", "Hip hop", "Rock", "Electronic"],
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
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
      type: Date,
    },
    about: {
      type: String,
      maxlength: 900,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export default VinylSchema

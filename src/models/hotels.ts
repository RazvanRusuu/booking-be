import mongoose from "mongoose";

export interface IHotel {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string[];
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
}

const HotelSchema = new mongoose.Schema<IHotel>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "A hotel must have a name"],
  },
  city: {
    type: String,
    required: [true, "A hotel must have a city"],
  },
  country: {
    type: String,
    required: [true, "A hotel must have a country"],
  },
  description: {
    type: String,
    required: [true, "A hotel must have a desciption"],
  },
  type: [
    {
      type: String,
      required: [true, "A hotel must have a type"],
    },
  ],
  adultCount: {
    type: Number,
    required: [true, "A hotel must have a capacity"],
  },
  childCount: {
    type: Number,
    required: [true, "A hotel must have a child capacity"],
  },
  facilities: [
    {
      type: String,
      required: true,
    },
  ],
  pricePerNight: {
    type: Number,
    required: [true, "A hotel must have a price"],
  },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const Hotel = mongoose.model<IHotel>("Hotel", HotelSchema);

export default Hotel;

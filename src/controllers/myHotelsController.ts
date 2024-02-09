import { Request, Response } from "express";

export const addHotels = async (req: Request, res: Response) => {
  console.log(11);
  res.status(200).json({
    status: "succes",
    data: [],
  });
};

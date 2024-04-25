import mongoose from "mongoose";

const connectToMongo = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("connnected to db");
  } catch (error) {
    console.log("error in mongo :", error);
  }
};

export default connectToMongo;

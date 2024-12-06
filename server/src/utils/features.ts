import mongoose from "mongoose";

export const connectDb = () => {
    // Connect to MongoDB database
    const URI = process.env.MONGODB_URI as string
    mongoose.connect(URI, {
        dbName: 'college-management',
    })
        .then(() => console.log("MongoDB connected successfully"))
        .catch((err) => console.error(err));
}



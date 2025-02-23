import mongoose from "mongoose";

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGOOSE_CONNECT_URL);
        console.log(`DB connected Succesfully`);


    } catch (error) {
        console.log(`DB Connection failed: ${error}`);
        process.exit(1);
    }
}

export default connectDB;

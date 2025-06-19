import mongoose from "mongoose";

function connectmongodb(url){
    return mongoose.connect(url);
}
export default connectmongodb; 
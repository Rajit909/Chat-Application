import mongoose from "mongoose";
import { User } from "./userModel";

const conversationModel = new mongoose.Schema({
participants:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:User
}],
messages:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Message"
}]
}, {timestamps:true});
export const conversation = mongoose.model("Conversation", conversationModel);
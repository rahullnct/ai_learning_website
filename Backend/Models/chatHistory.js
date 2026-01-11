import mongoose from "mongoose";
const chatHistoryDetails= new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    documentid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"document",
        required:true,
    },
    messages:{
        role:{
            type:String,
            enum:["user","assaistent"],
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        timestamp:{
            type:Date,
            default:DateNow(),
        },
        relevant_chunks:{
            type:[Number],
            default:[]
        },
    }
},{
    timestamps:true,
})
chatHistoryDetails.index({userid:1,documentid:1});
const chat_history= mongoose.model("chat_history",chatHistoryDetails);
export default chat_history;


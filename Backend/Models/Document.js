import mongoose from "mongoose";
const DocumentDetails=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    filename:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    filesize:{
        type:Number,
        required:true
    },
    extracted_text:{
        type:String,
        default:" ",
    },
    chunks:{
        content:{
            type:String,
            requied:true,
        },
        page_number:{
            type:Number,
            default:0,
        },
        chunk_index:{
            type:Number,
            required:true,
        },
    },
    upload_date:{
        type:Date,
        default:DateNow,
    },
    last_accessed:{
        type:Date,
        default:DateNow,
    },
    status:{
        type:String,
        enum:["processing","ready","failed"],
        default:"processing",
    },
},
{
    timestamps:true,
});
DocumentDetails.index({userid:1,upload_date:-1});
const document=mongoose.model("document",DocumentDetails);
export default document;


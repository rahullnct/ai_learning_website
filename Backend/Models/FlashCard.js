import mongoose from "mongoose";
const FlashCardDetails= new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        requiered:true,
    },
     documentid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Document',
                required:true,
    },
    cards:{
        questions:{
            type:String,
            required:true,
        },
        answer:{
            type:String,
            required:true,
        },
        difficulty:{
            type:String,
            enum:["easy","medium","hard"],
            default:"medium"
        },
        last_viewed:{
            type:Date,
            default:null,
        },
        review_count:{
            type:Number,
            default:0,
        },
        isstarted:{
            type:Boolean,
            default:false,
        },
    }
},{
    timestamps:true,
})
FlashCardDetails.index({userid:1,documentid:1});
const flashCard=mongoose.model("flashcard",FlashCardDetails);
export default flashCard;


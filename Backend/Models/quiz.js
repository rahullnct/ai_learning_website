import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const QuizDetails=new mongoose.Schema(
     {
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        documentid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Document',
            required:true,
        },
        title:{
            type:String,
            required:true,
            trim:true,
        },
        questions:{
            question:{
                type:String,
                required:true,
            },
            options:{
                type:String,
                required:true,
                validate:[array=>array.length === 4,"Must have exactly 4 options"]
            },
            correctAnswer:{
                type:String,
                required:true,
            },
            explainations:{
                type:String,
                default:"",
            },
            difficulty:{
              type:String,
              enum:["easy","medium","hard"],
              default:"medium",
            },
        },
        score:{
            type:String,
            default:0,
        },
        totalquestions:{
            type:Number,
            required:true,
        },
        comletedAt:{
            type:Date,
            required:true,
        }
     },
     {
        timestamps:true,
     }
);
QuizDetails.index({userId:1,documentId:1});
const quiz=mongoose.model("quiz",QuizDetails);
export default quiz;
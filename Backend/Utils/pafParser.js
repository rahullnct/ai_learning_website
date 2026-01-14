
import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

/**
*@param {string}filePath
*@returns {Promise<{<text:string,numpages:number}>}
*/

export const textFromPdf=async(filePath)=>{
 try{
   const dataBuffer=await fs.readFile(filePath);
   const parser= new PDFParse(new Uint8Array(dataBuffer));
   const data=await parser.getText();
   return{
    text:data.text,
    numpages:data.numpages,
    info:data.info,
   }


 }catch(error){
    console.log("error from extract text from Pdf",error);
    throw new Error("failed to extract text from PDF");
 }
}
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat route
app.post("/chat", async (req,res)=>{
  try{
    const {message} = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role:"system", content:"You are a helpful college enquiry assistant."},
        {role:"user", content:message}
      ],
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  }catch(err){
    res.status(500).send("Error");
  }
});

app.listen(5000, ()=>console.log("Server running"));
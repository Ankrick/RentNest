import express from "express";

const router = express.Router();

router.get("/test", (req,res) => {
    console.log('post route works');
})

router.post("/test", (req,res) => {
    console.log('post route works');
})

router.put("/test", (req,res) => {
    console.log('post route works');
})

router.delete("/test", (req,res) => {
    console.log('post route works');
})

export default router
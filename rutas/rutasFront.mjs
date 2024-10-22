import express from "express";

const rutasFront = express.Router();

rutasFront.use(express.static("www"));

export default rutasFront;

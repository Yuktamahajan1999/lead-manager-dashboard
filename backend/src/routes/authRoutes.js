import express from "express";
import { login } from "../controllers/authController.js";

const loginrouter = express.Router();

loginrouter.post("/login", login);

export default loginrouter;

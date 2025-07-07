import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "";

export const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object) => {
	return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

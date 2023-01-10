import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import { UserModel } from "../models/user.model";

export async function createUser(
	{username, password}: IUser, 
	req: Request, 
	res: Response) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const createdUser = await UserModel.create({
			username: username,
			password: hashedPassword,
		});

		return res.status(201).json(createdUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
}

export async function logIn(req: Request, res: Response) {
	try {
		const user = await UserModel.findOne({ username: req.body.username });

		if (!user) {
			return res.status(404).json({ msg: "Email or password invalid." });
		}

		const matchPassword = await bcrypt.compare(req.body.password, user.password);

		if(!matchPassword) {
			return res.status(404).json({ msg: "Email or password invalid." });
		}


		const token = jwt.sign({ username: user.username }, String(process.env.TOKEN_SIGN_SECRET), {expiresIn: "12h"});

		return res.status(200).json({
			user: {
				username: user.username
			},
			token: token,
		}); 

	} catch(error) {
		console.log(error);
	}
}

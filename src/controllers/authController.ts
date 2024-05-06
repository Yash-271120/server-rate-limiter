/**
 * Register: This endpoint should accept username, password, and email, and create a new user in the database. Prevent duplicate signups by checking if the username or email already exists in the database. If a duplicate is found, return an appropriate error message. On successful registration, the user should be automatically logged in and a session cookie should be returned.
Login: This endpoint should authenticate users based on username and password. Upon successful authentication, a session cookie should be set.
 */

import { Request, Response } from "express";
import { hash, genSalt,compare } from "bcrypt";
import User from "../models/user";

class AuthController {
  public register = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send("Missing fields");
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send("Username or email already exists");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    return res.cookie("userId", user.id, { httpOnly: true, secure: true }).send("Registered");
  };

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Missing fields");
    }

    const user = await User.findOne({ username});
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send("Invalid credentials");
    }

    return res.cookie("userId", user.id, { httpOnly: true, secure: true }).send("Logged in");
  };
}

const authController = new AuthController();
export default authController;

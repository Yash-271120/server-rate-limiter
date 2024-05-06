import { Request, Response } from "express";
import User from "../models/user";

interface AuthenticatedRequest extends Request {
  user?: any;
}

class UserController {
  public me = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    const retval = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.json(retval);
  };
}

const userController = new UserController();
export default userController;

import { Request, Response } from "express";
import User from "../models/user";

interface AuthenticatedRequest extends Request {
    user?: any;
}

class Authenticated {
  public check = async (req: AuthenticatedRequest, res: Response, next: any) => {
    if (!req.cookies.userId) {
      return res.status(401).send("Unauthorized");
    }

    const user = await User.findById(req.cookies.userId);
    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    req.user = user;
    next();
  };
}

const authenticated = new Authenticated();
export default authenticated;

import { UserDocument } from "../model/User";

declare global {
  namespace Express {
    interface User extends UserDocument {
      _id?: any;
    }
  }
}

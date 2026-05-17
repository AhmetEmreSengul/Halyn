import { UserDocument } from "../models/User";

declare global {
  namespace Express {
    interface User extends UserDocument {}

    interface Request {
      user?: UserDocument;
    }
  }

  interface ProductDataResponse {
    status: number;
    product: {
      product_name: string;
      brands: string;
      ingredients_text: string;
      ingredients: { text: string }[];
      completeness: number;
      last_modified_t: number;
    };
  }
}

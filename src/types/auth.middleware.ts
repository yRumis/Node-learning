import { type JwtPayload } from "../middlewares/auth.middleware.js";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}
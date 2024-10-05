import User from "@business/modules/user/domain/model/User"

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: User
        }
    }
}

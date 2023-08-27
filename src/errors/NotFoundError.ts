import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(
        message: string = "Request Not Found!"
    ) {
        super(404, message)
    }
}
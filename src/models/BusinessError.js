/**
 * custom error to represent business logic error
 * alternative name: ControllerError as this error thrown from Controller
 */

export default class BusinessError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = "BusinessError";
  }
}

import { NextFunction, Request, Response } from 'express';

const Validation = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      let newErrorPayload: any = {};
      details.forEach((detail: any) => {
        newErrorPayload[detail.context.label] = {
          message: detail.message,
        };
      });
      res.status(422).json(newErrorPayload);
    }
  };
};
export default Validation;

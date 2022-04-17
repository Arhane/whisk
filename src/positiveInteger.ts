import { failure, identity, success, Type } from "io-ts";

export const positiveInteger = new Type<number, number, unknown>(
  "positiveInteger",
  (input: unknown): input is number => {
    return Number.isInteger(Number(input)) && Number(input) >= 0;
  },
  (input, context) => {
    return (Number.isInteger(Number(input)) && Number(input) >= 0 ? success(Number(input)) : failure(input, context));
  },
  identity
);

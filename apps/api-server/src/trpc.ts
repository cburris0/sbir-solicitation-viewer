import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { Request, Response } from "express";
import { ZodError } from "zod";

export type Context = {
  req: Request;
  res: Response;
};
export type Router = ReturnType<typeof createTRPCRouter>;

export const createContext = async (
  opts: CreateExpressContextOptions,
): Promise<Context> => {
  return opts;
};

export const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      message: shape.message,
      code: shape.code,
      data: {
        code: shape.data.code,
        httpStatus: shape.data.httpStatus,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const errorHandler = t.middleware(
  async ({ next, path, input, getRawInput }) => {
    const res = await next();

    if (!res.ok) {
      const error = res.error;
      
      if (error.code === 'INTERNAL_SERVER_ERROR' || 
          error.code === 'PARSE_ERROR' ||
          error.code === 'TIMEOUT') {
        
        const rawInput = await getRawInput();
        const errorObject = {
          timestamp: new Date().toISOString(),
          path,
          input,
          rawInput: JSON.stringify(rawInput),
          statusCode: getHTTPStatusCodeFromError(error),
          error: error.message,
          code: error.code
        };

        console.error("Unexpected TRPC Error:", errorObject);
      } else {
        console.info(`Client error ${error.code}: ${error.message}`);
      }
      throw error;
    }

    return res;
  },
);

export const procedure = t.procedure.use(timingMiddleware).use(errorHandler);

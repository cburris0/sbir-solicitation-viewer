import { createCallerFactory, createTRPCRouter } from "../trpc";

import { solicitationsRouter } from "./solicitations";

export const router = createTRPCRouter({
  solicitations: solicitationsRouter
});

export type AppRouter = typeof router;

export const createCaller = createCallerFactory(router);

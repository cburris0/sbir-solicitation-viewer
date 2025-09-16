import { createTRPCReact, inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { AppRouter } from "@repo/api-server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type SolicitationData = RouterOutputs["solicitations"]["list"][0];
export const trpc = createTRPCReact<AppRouter>();
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@repo/api-server"; // Adjust path

export const trpc = createTRPCReact<AppRouter>();
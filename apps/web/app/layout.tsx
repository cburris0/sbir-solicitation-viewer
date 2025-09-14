'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import { useState } from 'react';
import SuperJSON from 'superjson';
import "./globals.css";
import styles from "./layout.module.css";
import { Header } from './components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
          transformer: SuperJSON
        }),
      ],
    })
  );

  return (
    <html lang="en">
      <body>
        <div>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
          <div className={styles.page}>
            <Header title="SBIR Solicitation Viewer" />
            <main className={styles.main}>
              {children}
            </main>
          </div>
          </QueryClientProvider>
        </trpc.Provider>

        </div>
      </body>
    </html>
  );
}
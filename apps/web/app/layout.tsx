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
          url: `${process.env.NEXT_PUBLIC_API_SERVER_URL}`,
        }),
      ],
    }),
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
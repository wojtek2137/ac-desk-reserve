import { useState } from 'react'; // Dodaj import useState
import { trpc } from '../utils/trpc'; // Import klienta tRPC
import { httpBatchLink } from '@trpc/client'; // Import linku do tRPC
import type { AppProps } from 'next/app'; // Typy Next.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query

function MyApp({ Component, pageProps }: AppProps) {
    // Utwórz instancję QueryClient wewnątrz komponentu
    const [queryClient] = useState(() => new QueryClient());

    // Utwórz klienta tRPC
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: '/api/trpc', // Endpoint tRPC
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default MyApp;

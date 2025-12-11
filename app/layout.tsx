import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import './globals.css';

// Fuente Inter
const inter = Inter({ subsets: ['latin'] })

// Metadatos
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 0.9,
};

export default async function RootLayoutServer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

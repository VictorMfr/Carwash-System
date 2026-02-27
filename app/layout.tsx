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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=0.9" />
        <title>LA MANO DE DIOS</title>
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

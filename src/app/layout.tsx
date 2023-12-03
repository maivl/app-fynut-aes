import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Aes128加密',
    description: 'Aes128（CBC）加密'
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
        </html>
    );
}

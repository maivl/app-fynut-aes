import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './lib/AntdRegistry';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'fynut-app',
    description: 'fynut-app',
    icons: '/favicon.ico'
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

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/global/Navbar';

export const metadata: Metadata = {
    title: 'Paste Your Link and Analyze',
    description: 'Next.js Application built with TypeScript, Puppeter and Gemini AI',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}

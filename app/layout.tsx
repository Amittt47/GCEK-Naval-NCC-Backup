import type { Metadata } from 'next';
import { Cinzel, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '../components/providers/ClientProviders';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GCEK Naval NCC Portal | Leadership, Discipline & Service',
  description:
    'Official digital command and information portal of Government College of Engineering Kalahandi Naval NCC (4 Odisha Naval Unit NCC, Bhawanipatna). Leadership, Discipline, Service, Camps, Achievements, SSB Prep & Career Hub.',
  keywords: [
    'GCEK Naval NCC',
    'Government College of Engineering Kalahandi',
    'Naval NCC',
    '4 Odisha Naval Unit NCC',
    'Bhawanipatna',
    'Odisha NCC',
    'AINSC',
    'Indian Navy Special Entry',
  ],
  authors: [{ name: 'GCEK Naval NCC Command' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${cinzel.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#001428] text-slate-100 font-sans antialiased selection:bg-[#0077b6] selection:text-white">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

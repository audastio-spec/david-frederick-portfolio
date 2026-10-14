import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'David Frederick | Digital Product & Aviation Leader',description:'Explore Ouvri and Roots of Glory, product management, AI-assisted software development, corporate engagement, and aviation leadership.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

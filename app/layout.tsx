import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'David Frederick | Product Builder & Aviation Leader',description:'Explore Ouvri and Roots of Glory, AI-assisted software development with Claude and Codex, and David Frederick’s aviation and project leadership background.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

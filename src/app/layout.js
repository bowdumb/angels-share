import { Inter } from "next/font/google";
import Header from './components/Header';
import Footer from './components/Footer'
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Angel's Share",
  description: "Find proper cocktail builds and share your own!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}

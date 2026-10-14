import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/site-data";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: `${brand.name} — Cosmética natural artesanal`,
  description:
    "Caetano: cosmética natural artesanal para el cuidado corporal y capilar. Jabones exfoliantes, mantecas corporales, aceites y bálsamos labiales hechos con dedicación.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${serif.variable} ${sans.variable} bg-cream font-sans text-brown-dark antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

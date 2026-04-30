import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export default function WebsiteLayout({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
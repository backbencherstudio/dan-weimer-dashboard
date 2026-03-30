import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
     <div className="min-h-[calc(100vh-110px)] flex items-center justify-center"> 
         {children}
         
     </div>
      <Footer />
    </div>
  );
}

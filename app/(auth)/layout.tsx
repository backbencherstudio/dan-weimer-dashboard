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
     <div className="min-h-[calc(100vh-174px)] flex items-center justify-center bg-[#f8f8f8]"> 
         {children}
         
     </div>
      <Footer />
    </div>
  );
}

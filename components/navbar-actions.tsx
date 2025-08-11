"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";


import Button from "./ui/Button";
import useCart from "@/hooks/use-cart";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
    // This is to avoid hydration mismatch
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={() => router.push("/cart")} className="flex items-center rounded-full px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>
      </Button>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="bg-fashion-primary border text-black px-4 py-2 rounded-full">Sign up</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="bg-black text-white border border-fashion-primary px-4 py-2 rounded-full ml-2">Login</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};

export default NavbarActions;

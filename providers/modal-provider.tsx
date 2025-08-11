"use client";

import React from "react";

import PreviewModal from "@/components/preview-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  // This component is used to wrap the application and provide the modal context
  // It ensures that the modal is only rendered on the client side
  // and not during server-side rendering
  // This is important for performance and to avoid hydration issues
  // It also allows the modal to be opened and closed from anywhere in the application
  // by using the usePreviewModal hook
  // This is a common pattern in Next.js applications to handle modals
  // and other client-side only components
  // The PreviewModal component is used to display the product details
  // when a product is clicked in the product list

  return (
    <>
      <PreviewModal />
    </>
  );
};

export default ModalProvider;

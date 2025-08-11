const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto py-10">
        <p className="text-center text-sm text-black">
          &copy; {new Date().getFullYear()} Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

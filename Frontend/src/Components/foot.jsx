const Footer = () => {
  return (
    <footer className="bg-orange-200 text-zinc-50 py-4">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        
        {/* Contact Section */}
        <h3 className="text-lg font-semibold mb-2">Contact us:</h3>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-8 text-sm">
          <p>Email: noreplypetsaathi1@gmail.com</p>
          <p>Phone: +977 9876543210</p>
          <p>Address: Bhaktapur, Nepal</p>
        </div>

        {/* Divider Line */}
        <div className="mt-4 border-t border-gray-500 w-full mx-auto"></div>

        {/* Copyright Section */}
        <p className="text-sm mt-2">© 2024 PetSaathi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

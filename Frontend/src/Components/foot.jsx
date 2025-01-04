const foot = () => {
  return (
    <footer className="bg-gray-800 text-white py-2">
      <div className="max-w-screen-xl mx-auto px-2">
        {/* Contact Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Contact us:</h3>
          <ul className="flex space-x-6 text-sm text-gray-400">
            <li>Email: anupdangi92@gmail.com</li>
            <li>Phone: +977 9876543210</li>
            <li>Address: Bhaktapur, Nepal</li>
          </ul>
        </div>

        {/* Bottom section: Copyright */}
        <div className="mt-4 border-t border-gray-700 pt-2 text-center">
          <p className="text-sm text-gray-400">© 2024 PetSaathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default foot;

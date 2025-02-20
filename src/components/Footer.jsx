const Footer = () => {
  return (
    <footer className="bg-white shadow py-6 mt-12 ">
      <div className="container mx-auto text-center text-gray-600">
        &copy; {new Date().getFullYear()} QuizEZ. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

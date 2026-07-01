import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} JobBoard. Built with React and Django.</p>
      </div>
    </footer>
  );
}

export default Footer;

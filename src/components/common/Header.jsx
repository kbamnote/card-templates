import React from 'react';
import Logo from '../../assets/logo.jpg'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div className="flex items-center">
            <img 
              src={Logo} 
              alt="EliteCards Logo" 
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
            <div className="bg-blue-600 text-white font-bold text-xl px-3 py-2 rounded" style={{display: 'none'}}>
              EliteCards
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
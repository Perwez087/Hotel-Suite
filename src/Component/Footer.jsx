import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row py-6 w-full items-center px-4 sm:px-6 lg:px-8 bg-white mt-8 lg:mt-16">
        <p className="text-xs text-gray-500">
          &copy; 2024 Hotel Suite. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-3 sm:gap-4 lg:gap-8">
          <div className="text-xs text-gray-500 hover:underline cursor-pointer">
            Terms of Service
          </div>
          <div className="text-xs text-gray-500 hover:underline cursor-pointer">
            Privacy
          </div>
        </nav>
      </footer>
  )
}

export default Footer

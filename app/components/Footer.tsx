import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-light tracking-wider text-white">
              COMPANY
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Creating innovative solutions for tomorrow's challenges.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-light tracking-wider text-white mb-6">
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              {['About', 'Services', 'Work', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-light tracking-wider text-white mb-6">
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MdLocationOn className="text-gray-400 mt-1" />
                <span className="text-sm text-gray-400">123 Business Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-3">
                <MdPhone className="text-gray-400" />
                <span className="text-gray-400">+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-3">
                <MdEmail className="text-gray-400" />
                <span className="text-gray-400">contact@company.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

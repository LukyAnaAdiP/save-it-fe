import React from "react";
import { Link } from "react-router-dom";
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandFacebook,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <div className="bg-gray-800">
    <footer className="relative text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Contact Info */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <ul>
              <li className="mb-2">
                <p>59. Melati Street</p>
                <p>Ragunan, South Jakarta, Indonesia, 12550</p>
              </li>
              <li className="mb-2">
                <a href="tel:+1234567890" className="hover:underline">
                  (021) 567-890-01
                </a>
              </li>
              <li>
                <a href="mailto:info@saveit.com" className="hover:underline">
                  info@saveit.com
                </a>
              </li>
            </ul>
          </div>

          {/* Link*/}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/aboutus" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/help" className="hover:underline">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <IconBrandFacebook color="white" size={25} />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <IconBrandX color="white" size={25} />
              </Link>
              <Link
                to="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <IconBrandLinkedin color="white" size={25}></IconBrandLinkedin>
              </Link>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="w-full mt-6 text-center lg:text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Save It. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}

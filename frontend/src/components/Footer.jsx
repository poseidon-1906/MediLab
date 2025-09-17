import React from 'react'
import { assets } from '../assets/assets'
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Friday", 
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <footer className="bg-white rounded-t-[40px] md:rounded-t-[80px] mt-12 md:mt-24 py-12 px-6 card-shadow">
        <hr className="mb-5"/>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-bold text-2xl">MedLab</span>
              <span className="text-gray-800 text-xl">Hospital</span>
            </div>
            <p className="mt-4 text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
         
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/" className="hover:underline hover:text-blue-600 transform transition duration-500 ease-in-out">Home</Link></li>
              <li><Link to="/doctors" className="hover:underline hover:text-blue-600 transform transition duration-300 ease-in-out">All Doctors</Link></li>
              <li><Link to="/about" className="hover:underline hover:text-blue-600 transform transition duration-500 ease-in-out">About</Link></li>
              <li><Link to="/contact" className="hover:underline hover:text-blue-600 transform transition duration-500 ease-in-out">Contact</Link></li>
            </ul>
          </div>
        
          <div>
            <h4 className="font-bold text-lg mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-600">
              {hours.map((item) => (
                <li key={item.id}>
                  {item.day}: <br />
                  {item.time}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <FaLocationArrow className="text-blue-600" />
                <a href="#" className="hover:underline">123 Street, City, Country</a>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-blue-600" />
                <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a>
              </li>
              <li className="flex items-center space-x-2">
                <MdEmail className="text-blue-600" />
                <a href="mailto:info@medlab.com" className="hover:underline">info@medlab.com</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    <div className="bg-red py-4 px-6 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} MedLab Hospital. All rights reserved.
    </div>
    </>
  );
};

export default Footer;
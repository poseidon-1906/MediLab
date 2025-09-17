import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import about from "../assets/images/about.jpg";
import background from "../assets/images/background.jpg";


const About = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | MediLab Medical Institute"}
        imageUrl={about}
      />

      <div className="container mx-auto px-6 py-12">
        <div className="text-center text-2xl font-semibold pt-10 text-gray-700">
          <p>
            ABOUT <span className="text-blue-600">US</span>
          </p>
        </div>

        <div className="my-10 flex flex-col md:flex-row items-center md:items-start gap-12">
         
          <img
            src={background}
            alt="A medical institute's staff working"
            className="w-full md:max-w-xs rounded-xl shadow-lg"
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-lg text-gray-600">
            <p>
              Welcome to MediLab, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p>
              MediLab is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediLab is here to support you every step of the way.
            </p>
            <strong className="text-blue-800 text-xl font-bold">Our Vision</strong>
            <p>
              Our vision at MediLab is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>

        <div className="text-center text-xl my-10 font-medium text-gray-500">
          <p>
            WHY <span className="text-blue-600 font-semibold">CHOOSE US</span>
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-20">
          <div className="flex-1 border-2 border-transparent hover:border-blue-500 hover:bg-white p-8 sm:p-12 flex flex-col gap-5 text-gray-600 transition-all duration-300 rounded-xl shadow-md cursor-pointer">
            <strong className="text-blue-600 text-xl">EFFICIENCY</strong>
            <p>
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>
          <div className="flex-1 border-2 border-transparent hover:border-blue-500 hover:bg-white p-8 sm:p-12 flex flex-col gap-5 text-gray-600 transition-all duration-300 rounded-xl shadow-md cursor-pointer">
            <strong className="text-blue-600 text-xl">CONVENIENCE</strong>
            <p>
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>
          <div className="flex-1 border-2 border-transparent hover:border-blue-500 hover:bg-white p-8 sm:p-12 flex flex-col gap-5 text-gray-600 transition-all duration-300 rounded-xl shadow-md cursor-pointer">
            <strong className="text-blue-600 text-xl">PERSONALIZATION</strong>
            <p>
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>
      
      <Biography descrip={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"} />
    </>
  );
};

export default About;
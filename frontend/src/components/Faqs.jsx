import React, { useState } from "react";

const Faqs = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      question: "How can I benefit from your startup?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputates tellus luctus nec ullamcorper mattis. Vivamus eget quam eu odio iaculis auctor.",
    },
    {
      question: "How can I get in touch with customer support?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputates tellus luctus nec ullamcorper mattis. Nam a velit sed ligula tincidunt efficitur.",
    },
    {
      question: "How do you ensure data security and privacy?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputates tellus luctus nec ullamcorper mattis. Fusce auctor, massa sit amet viverra efficitur.",
    },
    {
      question: "How do I get started with your offerings?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputates tellus luctus nec ullamcorper mattis. Sed vel libero sed mi consectetur pulvinar.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-full space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-xl shadow-md cursor-pointer animate-fade-in-up transition-all duration-300 transform hover:scale-[1.01]"
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex justify-between items-center font-semibold text-gray-700">
                <p>{item.question}</p>
                <span className="text-lg text-gray-400">
                  {openQuestion === index ? '-' : '+'}
                </span>
              </div>
              {openQuestion === index && (
                <p className="mt-4 text-gray-600 text-sm animate-fade-in">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
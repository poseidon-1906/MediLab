import React from "react";
import Hero from "../components/Hero";
import OurMission from "../components/OurMission";
import about from "../assets/images/about.jpg";
import background from "../assets/images/background.jpg";


const About = () => {
  return (
    <>
      <Hero
        title={"En savoir plus sur nous | Institut Médical MediLab"}
        imageUrl={about}
      />

      <div className="container mx-auto px-6 py-12">
        <div className="text-center text-2xl font-semibold pt-10 text-gray-700">
          <p>
            À PROPOS DE <span className="text-primary-brand">NOUS</span>
          </p>
        </div>

        <div className="my-10 flex flex-col md:flex-row items-center md:items-start gap-12">
         
          <img
            src={background}
            alt="Personnel d'un institut médical au travail"
            className="w-full md:max-w-xs rounded-xl shadow-lg"
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-lg text-gray-600">
            <p>
              Bienvenue chez MediLab, votre partenaire de confiance pour gérer vos besoins de santé de manière pratique et efficace. Chez MediLab, nous comprenons les défis auxquels les individus sont confrontés lorsqu'il s'agit de planifier des rendez-vous chez le médecin et de gérer leurs dossiers de santé.
            </p>
            <p>
              MediLab s'engage à l'excellence en matière de technologie de la santé. Nous nous efforçons continuellement d'améliorer notre plateforme, en intégrant les dernières avancées pour améliorer l'expérience utilisateur et fournir un service de qualité supérieure. Que vous réserviez votre premier rendez-vous ou que vous gériez des soins continus, MediLab est là pour vous accompagner à chaque étape.
            </p>
            <strong className="text-primary-brand text-xl font-bold">Notre Vision</strong>
            <p>
              Notre vision chez MediLab est de créer une expérience de santé transparente pour chaque utilisateur. Nous visons à combler le fossé entre les patients et les prestataires de soins de santé, afin que vous puissiez accéder plus facilement aux soins dont vous avez besoin, quand vous en avez besoin.
            </p>
          </div>
        </div>

          <OurMission />

        <div className="text-center text-xl my-10 font-medium text-gray-500">
          <p>
            POURQUOI <span className="text-primary-brand font-semibold">NOUS CHOISIR</span>
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-20">
          <div className="flex-1 border-2 border-transparent hover:border-blue-500 hover:bg-white p-8 sm:p-12 flex flex-col gap-5 text-gray-600 transition-all duration-300 rounded-xl shadow-md cursor-pointer">
            <strong className="text-primary-brand text-xl">EFFICACITÉ</strong>
            <p>
              Planification de rendez-vous simplifiée qui s'intègre à votre style de vie chargé.
            </p>
          </div>
          <div className="flex-1 border-2 border-transparent hover:border-blue-500 hover:bg-white p-8 sm:p-12 flex flex-col gap-5 text-gray-600 transition-all duration-300 rounded-xl shadow-md cursor-pointer">
            <strong className="text-blue-600 text-xl">COMMODITÉ</strong>
            <p>
              Accès à un réseau de professionnels de la santé de confiance dans votre région.
            </p>
          </div>
          <div className="flex-1 border-2 border-transparent hover:border-blue-500 hover:bg-white p-8 sm:p-12 flex flex-col gap-5 text-gray-600 transition-all duration-300 rounded-xl shadow-md cursor-pointer">
            <strong className="text-red-400 text-xl">PERSONNALISATION</strong>
            <p>
              Recommandations et rappels personnalisés pour vous aider à rester au top de votre santé.
            </p>
          </div>
        </div>
      </div>
      
      
    </>
  );
};

export default About;
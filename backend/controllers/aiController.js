import doctorModel from '../models/doctorModel.js';

// PROTOCOLE D'URGENCE MEDILAB
const emergencyKeywords = ['douleur poitrine', 'difficulté à respirer', 'perte de conscience', 'confusion soudaine', 'paralysie', 'AVC', 'crise cardiaque', 'hémorragie'];
const emergencyResponse = {
  isEmergency: true,
  message: "⚠️ ATTENTION : Vos symptômes semblent indiquer une urgence médicale et nécessitent une prise en charge IMMÉDIATE.",
  advice: "Contactez immédiatement un centre de sante mot. Ne tardez pas. Cette situation dépasse mon cadre d'assistance.",
  recommendations: [],
  questions: [],
  urgency: 'Critique'
};

// SIMULATION D'ANALYSE IA AVANCÉE
const getAdvancedResponse = async (message) => {
  const msg = message.toLowerCase();

  // Scénario 1: Dermatologie
  if (msg.includes('peau') || msg.includes('bouton') || msg.includes('démangeaison') || msg.includes('acné') || msg.includes('eczéma')) {
    return {
      speciality: 'Dermatologist',
      urgency: 'Faible',
      advice: "En attendant votre consultation, évitez de gratter les lésions, maintenez la zone propre et hydratée avec un produit neutre.",
      responseText: "D'après vos descriptions, les symptômes semblent relever de la dermatologie. Il pourrait s'agir d'une réaction cutanée ou d'une affection inflammatoire.",
      questions: [
        "Avez-vous récemment utilisé de nouveaux produits cosmétiques ou détergents ?",
        "Les démangeaisons sont-elles plus intenses la nuit ?",
        "Avez-vous des antécédents d'allergies connues ?"
      ]
    };
  }
  // Scénario 2: Gastro-entérologie
  if (msg.includes('estomac') || msg.includes('ventre') || msg.includes('digestion') || msg.includes('brûlure') || msg.includes('nausée')) {
    return {
      speciality: 'Gastroenterologist',
      urgency: 'Modéré',
      advice: "Privilégiez des repas légers et faciles à digérer. Évitez les aliments gras, épicés ou acides. Buvez de l'eau en petites quantités.",
      responseText: "Vos symptômes suggèrent une possible atteinte du système digestif. Cela peut aller d'un simple reflux à une irritation de la muqueuse gastrique.",
      questions: [
        "La douleur est-elle apparue avant ou après les repas ?",
        "Avez-vous de la fièvre ou des frissons ?",
        "Avez-vous constaté des changements dans vos selles ?"
      ]
    };
  }
  // Scénario 3: Neurologie
  if (msg.includes('tête') || msg.includes('migraine') || msg.includes('vertige') || msg.includes('fourmillement')) {
    return {
      speciality: 'Neurologist',
      urgency: 'Modéré',
      advice: "Reposez-vous dans un environnement calme, sombre et silencieux. Appliquez une compresse froide sur votre front. Évitez les écrans.",
      responseText: "Les maux de tête intenses ou inhabituels, surtout s'ils sont accompagnés de vertiges, méritent une attention particulière car ils touchent au système nerveux.",
      questions: [
        "Le mal de tête est-il pulsatile (comme des battements) ou constant ?",
        "Avez-vous une sensibilité à la lumière ou au son ?",
        "Avez-vous ressenti une faiblesse dans un bras ou une jambe ?"
      ]
    };
  }
  // Scénario 4: Médecine Générale (ORL/Viral)
  if (msg.includes('fièvre') || msg.includes('toux') || msg.includes('gorge') || msg.includes('courbatures') || msg.includes('nez qui coule')) {
    return {
      speciality: 'General physician',
      urgency: 'Faible',
      advice: "Reposez-vous, hydratez-vous abondamment (eau, tisanes). Vous pouvez prendre du paracétamol pour la fièvre si vous n'avez pas de contre-indication.",
      responseText: "Il s'agit probablement d'une infection virale saisonnière, comme un rhume ou un état grippal. Un médecin généraliste pourra confirmer cela.",
      questions: [
        "Depuis combien de jours avez-vous de la fièvre ?",
        "Votre toux est-elle sèche ou grasse (avec des glaires) ?",
        "Avez-vous perdu l'odorat ou le goût ?"
      ]
    };
  }

  // Réponse par défaut
  return {
    speciality: null,
    urgency: 'Indéterminée',
    advice: "Pour une meilleure orientation, veuillez décrire vos symptômes de manière plus précise.",
    responseText: "Je n'ai pas assez d'informations pour analyser vos symptômes. Pouvez-vous me donner plus de détails sur ce que vous ressentez ?",
    questions: [
      "Quand les symptômes ont-ils commencé ?",
      "Y a-t-il quelque chose qui semble les aggraver ou les soulager ?",
      "Avez-vous d'autres symptômes, même s'ils vous semblent sans rapport ?"
    ]
  };
};

export const chatController = async (req, res) => {
  try {
    const { message } = req.body;
    const lowerCaseMessage = message.toLowerCase();

    // 1. Détection d'urgence
    const isEmergency = emergencyKeywords.some(keyword => lowerCaseMessage.includes(keyword));
    if (isEmergency) {
      return res.json({ success: true, ...emergencyResponse });
    }

    // 2. Analyse IA "avancée"
    const aiResponse = await getAdvancedResponse(message);

    // 3. Recherche de médecins (si une spécialité est recommandée)
    let recommendations = [];
    if (aiResponse.speciality) {
      const doctors = await doctorModel.find({ speciality: aiResponse.speciality, available: true }).limit(3);
      if (doctors.length > 0) {
        recommendations = doctors.map(doc => ({
          name: doc.name,
          speciality: doc.speciality,
          experience: doc.experience,
          fees: doc.fees,
          id: doc._id
        }));
      }
    }

    // 4. Envoi de la réponse structurée
    res.json({
      success: true,
      message: aiResponse.responseText,
      recommendations: recommendations,
      urgency: aiResponse.urgency,
      advice: aiResponse.advice,
      questions: aiResponse.questions
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Erreur du contrôleur de chat IA : ${error.message}`,
    });
  }
};

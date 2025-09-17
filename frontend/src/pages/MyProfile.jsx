import React, { useContext, useEffect, useState, memo, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import {
    FaFilePdf, FaAllergies, FaSyringe, FaCalendarAlt, FaVial,
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaVenusMars, FaRulerVertical, FaTint
} from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

// Helper function to format dates
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delayChildren: 0.3, staggerChildren: 0.2 } }
};
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

// #region Memoized Sub-components

const ProfileHeader = memo(() => (
    <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-4">Bienvenue sur votre espace personnel</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ici, vous pouvez consulter et mettre à jour vos informations personnelles.
        </p>
    </motion.div>
));

const ProfileTabs = memo(({ activeTab, setActiveTab }) => (
    <div className="flex justify-center mb-8 border-b-2 border-gray-200">
        <button onClick={() => setActiveTab('profile')} className={`py-4 px-6 -mb-[2px] font-semibold transition-colors duration-300 ${activeTab === 'profile' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
            Mon Profil
        </button>
        <button onClick={() => setActiveTab('records')} className={`py-4 px-6 -mb-[2px] font-semibold transition-colors duration-300 ${activeTab === 'records' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
            Mon Carnet de Santé
        </button>
    </div>
));

const ProfileSection = memo(({ userData, setUserData, isEdit, setIsEdit, image, setImage, onUpdate, isLoading }) => {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className='flex flex-col md:flex-row items-center md:items-start gap-8'>
            <motion.div variants={itemVariants} className='flex-shrink-0 flex flex-col items-center text-center w-full md:w-auto'>
                <div className='relative group'>
                    {isEdit ? (
                        <label htmlFor='image-upload' className='cursor-pointer'>
                            <img className='w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-md group-hover:opacity-60' src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)} alt='User Profile' />
                            <div className='absolute inset-0 flex flex-col items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100'>
                                <img className='w-12 h-12' src={assets.upload_icon} alt='Upload Icon' />
                                <p className="mt-2 text-xs font-semibold">Update</p>
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image-upload' hidden />
                        </label>
                    ) : (
                        <img className='w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-md' src={userData.image || assets.profile_pic} alt='User Profile' />
                    )}
                </div>
            </motion.div>
            <div className='flex-1 w-full'>
                <div className='flex justify-between items-start mb-6'>
                    <motion.div variants={itemVariants} className="flex-1">
                        {isEdit ? (
                            <input className='text-3xl font-bold text-gray-800 w-full bg-gray-100 p-2 rounded-lg' type='text' onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                        ) : (
                            <h1 className='text-3xl font-bold text-gray-800 flex items-center'><FaUser className="mr-3 text-blue-500" />{userData.name}</h1>
                        )}
                        <p className='text-sm text-gray-600 mt-1 flex items-center'><FaMapMarkerAlt className="mr-2 text-gray-400" />{userData.address.line1}, {userData.address.line2}</p>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        {isEdit ? (
                            <button onClick={onUpdate} className='ml-4 px-6 py-2 font-semibold text-white rounded-full bg-blue-600 hover:bg-blue-700' disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button>
                        ) : (
                            <button onClick={() => setIsEdit(true)} className='ml-4 px-6 py-2 font-semibold text-white rounded-full bg-blue-600 hover:bg-blue-700'>Edit</button>
                        )}
                    </motion.div>
                </div>
                <motion.div variants={itemVariants} className='space-y-4 mt-6 text-base'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4'>
                        <p className='font-medium text-gray-600 flex items-center'><FaEnvelope className="mr-2 text-blue-500" />Email:</p>
                        <p className='text-blue-600 font-semibold'>{userData.email}</p>
                        <p className='font-medium text-gray-600 flex items-center'><FaMapMarkerAlt className="mr-2 text-blue-500" />City:</p>
                        {isEdit ? <input className='bg-gray-100 p-1 rounded-md' type='text' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} /> : <p className='text-gray-600'>{userData.address.line1}</p>}
                        <p className='font-medium text-gray-600 flex items-center'><FaMapMarkerAlt className="mr-2 text-blue-500" />Region:</p>
                        {isEdit ? <input className='bg-gray-100 p-1 rounded-md' type='text' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /> : <p className='text-gray-600'>{userData.address.line2}</p>}
                        <p className='font-medium text-gray-600 flex items-center'><FaPhone className="mr-2 text-blue-500" />Phone:</p>
                        {isEdit ? <input className='bg-gray-100 p-1 rounded-md' type='text' onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} /> : <p className='text-gray-600'>{userData.phone}</p>}
                        <p className='font-medium text-gray-600 flex items-center'><FaVenusMars className="mr-2 text-blue-500" />Genre:</p>
                        {isEdit ? <select className='bg-gray-100 p-1 rounded-md' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}><option value="">Sélectionner</option><option value="Male">Homme</option><option value="Female">Femme</option><option value="Other">Autre</option></select> : <p className='text-gray-600'>{userData.gender}</p>}
                        <p className='font-medium text-gray-600 flex items-center'><FaRulerVertical className="mr-2 text-blue-500" />Taille:</p>
                        {isEdit ? <input className='bg-gray-100 p-1 rounded-md' type='text' placeholder="e.g., 175 cm" onChange={(e) => setUserData(prev => ({ ...prev, height: e.target.value }))} value={userData.height} /> : <p className='text-gray-600'>{userData.height || 'N/A'}</p>}
                        <p className='font-medium text-gray-600 flex items-center'><FaTint className="mr-2 text-red-500" />Groupe Sanguin:</p>
                        {isEdit ? <select className='bg-gray-100 p-1 rounded-md' onChange={(e) => setUserData(prev => ({ ...prev, bloodType: e.target.value }))} value={userData.bloodType}><option value="">Sélectionner</option>{bloodTypes.map(type => <option key={type} value={type}>{type}</option>)}</select> : <p className='text-gray-600'>{userData.bloodType || 'N/A'}</p>}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
});

const HealthRecordSection = memo(({ healthRecords, onExportPdf, userName }) => {
    const allAllergies = healthRecords.flatMap(record => record.allergies);
    const allVaccinations = healthRecords.flatMap(record => record.vaccinations);
    const allLabResults = healthRecords.flatMap(record => record.labResults);
    const hospitalLogo = assets.hospital_logo || 'path/to/default/hospital_logo.png';

    return (
        <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Mon Carnet de Santé Électronique</h2>
                <button onClick={onExportPdf} className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 print:hidden">
                    <FaFilePdf className="mr-2 h-5 w-5" /> Exporter en PDF
                </button>
            </div>
            <div id="medical-record-content" className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <img src={hospitalLogo} alt="Hospital Logo" className="h-12 w-auto mr-4 print:hidden" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">Carnet de Santé - {userName}</h1>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 sm:mt-0">Date d'impression: {formatDate(new Date())}</p>
                </div>

                {/* --- SECTIONS --- */}
                <div className="space-y-8">
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b flex items-center"><FaAllergies className="mr-3 text-red-500" /> Allergies</h3>
                        {allAllergies.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allAllergies.map((a, i) => (
                                    <div key={i} className="p-4 border rounded-lg shadow-sm bg-red-50">
                                        <p className="font-bold text-red-800 mb-2">{a.type}</p>
                                        <div className="text-sm space-y-1 text-gray-700">
                                            <p><span className="font-semibold">Detail:</span> {a.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-gray-500 pl-4">Aucune allergie connue.</p>}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b flex items-center"><FaSyringe className="mr-3 text-green-500" /> Vaccinations</h3>
                        {allVaccinations.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allVaccinations.map((v, i) => (
                                    <div key={i} className="p-4 border rounded-lg shadow-sm bg-green-50">
                                        <p className="font-bold text-green-800 mb-2">{v.vaccin}</p>
                                        <div className="text-sm space-y-1 text-gray-700">
                                            <p><span className="font-semibold">Date 1:</span> {formatDate(v.date1)}</p>
                                            <p><span className="font-semibold">Date 2:</span> {formatDate(v.date2)}</p>
                                            <p><span className="font-semibold">Rappel:</span> {formatDate(v.rappelPrevu)}</p>
                                            {v.observations && <p><span className="font-semibold">Observations:</span> {v.observations}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-gray-500 pl-4">Aucun vaccin enregistré.</p>}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b flex items-center"><FaCalendarAlt className="mr-3 text-blue-500" /> Historique des Consultations</h3>
                        <div className="space-y-4">
                            {healthRecords.length > 0 ? healthRecords.map(r => (
                                <div key={r._id} className="p-5 border rounded-lg shadow-sm bg-blue-50">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 pb-2 border-b border-blue-200">
                                        <p className="font-bold text-blue-800">Consultation du {formatDate(r.createdAt)}</p>
                                        <p className="text-sm text-gray-600 mt-1 sm:mt-0">Dr. {r.doctorId.name}</p>
                                    </div>
                                    <div className="text-sm space-y-2 text-gray-700">
                                        <p><span className="font-semibold">Diagnostic:</span> {r.diagnosis}</p>
                                        <p><span className="font-semibold">Prescription:</span> {r.prescription}</p>
                                        {r.notes && <p><span className="font-semibold">Notes:</span> {r.notes}</p>}
                                    </div>
                                </div>
                            )) : <p className="text-gray-500 pl-4">Aucune consultation enregistrée.</p>}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b flex items-center"><FaVial className="mr-3 text-purple-500" /> Résultats de Laboratoire</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {allLabResults.length > 0 ? allLabResults.map((l, i) => (
                                <div key={i} className="p-4 border rounded-lg shadow-sm bg-purple-50">
                                    <p className="font-bold text-purple-800 mb-2">Test: {l.test}</p>
                                    <div className="text-sm space-y-1 text-gray-700">
                                        <p><span className="font-semibold">Date:</span> {formatDate(l.date)}</p>
                                        <p><span className="font-semibold">Résultat:</span> {l.result}</p>
                                        {l.file && <p className="text-blue-500 hover:underline cursor-pointer"><span className="font-semibold text-gray-800">Fichier:</span> {l.file}</p>}
                                    </div>
                                </div>
                            )) : <p className="text-gray-500 pl-4">Aucun résultat de laboratoire.</p>}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
});

// #endregion

// Main Component
const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [healthRecords, setHealthRecords] = useState([]);

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

    useEffect(() => {
        const fetchHealthRecords = async () => {
            if (token) {
                try {
                    const response = await axios.post(backendUrl + '/api/user/my-records', {}, { headers: { token } });
                    if (response.data.success) setHealthRecords(response.data.data);
                    else toast.error(response.data.message);
                } catch (error) {
                    toast.error(error.response?.data?.message || 'Failed to fetch health records.');
                }
            }
        };
        if (activeTab === 'records') {
            fetchHealthRecords();
        }
    }, [token, backendUrl, activeTab]);

    const updateUserProfileData = useCallback(async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('height', userData.height || '');
            formData.append('bloodType', userData.bloodType || '');
            if (image) formData.append('image', image);

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [userData, image, token, backendUrl, loadUserProfileData, setUserData]);

    const exportMedicalRecordToPdf = useCallback(() => {
        toast.info("Génération du PDF...", { autoClose: 2000 });
        const element = document.getElementById('medical-record-content');
        const opt = {
            margin: 0.5,
            filename: `${userData.name.replace(/\s/g, '_')}_Carnet_de_Sante.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save()
            .then(() => toast.success("PDF généré avec succès !"))
            .catch(() => toast.error("Échec de la génération du PDF."));
    }, [userData.name]);

    if (!userData) return <div className="min-h-[70vh] flex justify-center items-center">Loading Profile...</div>;

    return (
        <motion.div className='min-h-[70vh] flex flex-col items-center justify-center p-4' variants={containerVariants} initial="hidden" animate="visible">
            <ProfileHeader />
            <motion.div variants={itemVariants} className='bg-white rounded-3xl shadow-2xl max-w-5xl w-full p-4 sm:p-8 md:p-12'>
                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'profile' ? (
                    <ProfileSection 
                        userData={userData} 
                        setUserData={setUserData} 
                        isEdit={isEdit} 
                        setIsEdit={setIsEdit} 
                        image={image} 
                        setImage={setImage} 
                        onUpdate={updateUserProfileData} 
                        isLoading={isLoading} 
                    />
                ) : (
                    <HealthRecordSection 
                        healthRecords={healthRecords} 
                        onExportPdf={exportMedicalRecordToPdf} 
                        userName={userData.name} 
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

export default MyProfile;
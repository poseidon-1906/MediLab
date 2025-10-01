import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
    const daysOfWeek = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];

    const [docInfo, setDocInfo] = useState(false);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState('');

    const navigate = useNavigate();

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDocInfo(docInfo);
    };

    const getAvailableSolts = async () => {
        setDocSlots([]);
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();
                const slotDate = day + "_" + month + "_" + year;
                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true;

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    });
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setDocSlots((prev) => [...prev, timeSlots]);
        }
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Connectez-vous pour prendre rendez-vous');
            return navigate('/login');
        }

        if (!docSlots[slotIndex] || !slotTime) {
            toast.error('Veuillez sélectionner une date et un créneau horaire valides.');
            return;
        }

        setIsLoading(true);

        const date = docSlots[slotIndex][0].datetime;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const slotDate = day + "_" + month + "_" + year;

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime, reason }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getDoctosData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Une erreur est survenue.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts();
        }
    }, [docInfo]);

    return docInfo ? (
        <div className='container mx-auto px-4 py-8 md:py-12 animate-fade-in'>
            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-8 bg-white p-6 md:p-12 rounded-2xl shadow-xl border-t-4 border-blue-600 transition-all duration-300'>
                <div className='flex-shrink-0'>
                    <img className='w-full sm:max-w-xs h-auto rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105' src={docInfo.image} alt={docInfo.name} />
                </div>

                <div className='flex-1'>
                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <p className='flex items-center gap-2 text-3xl font-bold text-gray-800 animate-slide-up'>
                        Dr. {docInfo.name} <img className='w-6' src={assets.verified_icon} alt="Vérifié" />
                    </p>
                    <div className='flex items-center flex-wrap gap-2 mt-1 text-gray-600 animate-slide-up-200'>
                        <p className="font-medium">{docInfo.degree} - {docInfo.speciality}</p>
                        <span className='py-1 px-3 border border-gray-400 text-xs rounded-full bg-gray-100 font-semibold'>{docInfo.experience}</span>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div className="mt-4 animate-slide-up-400">
                        <p className='flex items-center gap-1 text-base font-semibold text-gray-800'>À propos <img className='w-4' src={assets.info_icon} alt="Info" /></p>
                        <p className='text-sm text-gray-600 mt-2 leading-relaxed'>{docInfo.about}</p>
                    </div>

                    <p className='text-lg font-bold text-gray-800 mt-6 animate-slide-up-600'>
                        Honoraires de consultation : <span className='text-blue-600'>{docInfo.fees} {currencySymbol}</span>
                    </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='mt-12'>
                <p className='text-xl font-bold text-gray-800 mb-4 animate-slide-up-800'>Réserver un créneau</p>

                {/* Date selection */}
                <div className='flex gap-4 items-center overflow-x-auto pb-4 custom-scrollbar'>
                    {docSlots.length > 0 && docSlots.map((item, index) => (
                        item.length > 0 && (
                            <div onClick={() => { setSlotIndex(index); setSlotTime(''); }} key={index} className={`flex-shrink-0 text-center py-4 px-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${slotIndex === index ? 'bg-blue-600 text-white shadow-lg' : 'border border-gray-300 bg-white hover:bg-gray-100'}`}>
                                <p className="text-lg font-semibold">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p className="text-xl font-bold">{item[0] && item[0].datetime.getDate()}</p>
                            </div>
                        )
                    ))}
                </div>

                {/* Time selection */}
                <div className='flex flex-wrap gap-3 mt-6'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <button
                            onClick={() => setSlotTime(item.time)}
                            key={index}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${item.time === slotTime ? 'bg-blue-600 text-white shadow-md' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                        >
                            {item.time.toLowerCase()}
                        </button>
                    ))}
                </div>

                {/* Reason for visit */}
                <div className='mt-6'>
                    <p className='text-lg font-bold text-gray-800 mb-2'>Motif de la visite</p>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder='Décrivez brièvement le motif de votre visite...'
                        className='w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                        rows='3'
                    ></textarea>
                </div>

                {/* Book button */}
                <button
                    onClick={bookAppointment}
                    disabled={!slotTime || isLoading}
                    className='mt-8 px-10 py-4 w-full md:w-auto text-lg font-bold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed'
                >
                    {isLoading ? 'Réservation en cours...' : 'Prendre un rendez-vous'}
                </button>
            </div>

            {/* Listing Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null;
};

export default Appointment;
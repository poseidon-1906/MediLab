import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyAppointments = () => {
    const { backendUrl, token, currencySymbol } = useContext(AppContext);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
    };

    // Getting User Appointments Data
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Failed to load appointments. Please log in again.');
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }
    };

    // Function to cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error canceling appointment:', error);
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };

    // Init Razorpay payment
    const initPayRazorpay = (order, appointmentId) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: appointmentId,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        toast.success('Payment successful!');
                        getUserAppointments();
                    } else {
                        toast.error('Payment verification failed.');
                    }
                } catch (error) {
                    console.error(error);
                    toast.error(error.response?.data?.message || 'Payment verification failed.');
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Handle Razorpay payment
    const handleRazorpayPayment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } });
            if (data.success) {
                initPayRazorpay(data.order, appointmentId);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to initiate payment.');
        }
    };

    // Handle Stripe payment
    const handleStripePayment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } });
            if (data.success) {
                window.location.replace(data.session_url);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to initiate Stripe payment.');
        }
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>My Appointments</h1>
            {appointments.length > 0 ? (
                <div className='space-y-6'>
                    {appointments.map((item, index) => (
                        <div key={item._id} className='bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-xl'>
                            <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-gray-100 shadow-inner">
                                <img
                                    className='w-full h-full object-cover'
                                    src={item.docData.image || assets.doctor_placeholder}
                                    alt={item.docData.name}
                                />
                            </div>

                            <div className='flex-1 text-sm text-gray-600 text-center md:text-left'>
                                <h2 className='text-xl md:text-2xl font-bold text-blue-600'>Dr. {item.docData.name}</h2>
                                <p className='text-base italic text-gray-500 mb-2'>{item.docData.speciality}</p>
                                <div className='space-y-2 text-base'>
                                    <p className='text-gray-800 font-medium'>
                                        <span className="font-bold text-gray-900">Address:</span> {item.docData.address.line1}, {item.docData.address.line2}
                                    </p>
                                    <p className='text-gray-800 font-medium'>
                                        <span className="font-bold text-gray-900">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                                    </p>
                                    <p className='text-gray-800 font-medium'>
                                        <span className="font-bold text-gray-900">Fees:</span> {item.docData.fees} {currencySymbol}
                                    </p>
                                </div>
                            </div>

                            <div className='flex-shrink-0 w-full md:w-auto flex flex-col gap-3 items-center md:items-end'>
                                {!item.cancelled && !item.payment && !item.isCompleted && selectedPayment !== item._id && (
                                    <button
                                        onClick={() => setSelectedPayment(item._id)}
                                        className='w-full md:w-48 py-2 border border-blue-500 text-blue-500 rounded-full font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white'
                                        aria-label={`Pay for appointment with ${item.docData.name}`}
                                    >
                                        Pay Online
                                    </button>
                                )}

                                {!item.cancelled && !item.payment && !item.isCompleted && selectedPayment === item._id && (
                                    <>
                                        <button
                                            onClick={() => handleStripePayment(item._id)}
                                            className='w-full md:w-48 py-2 border border-gray-300 rounded-full transition-all duration-300 hover:bg-gray-100 flex items-center justify-center'
                                            aria-label={`Pay with Stripe for appointment with ${item.docData.name}`}
                                        >
                                            <img className='h-5 w-auto' src={assets.stripe_logo} alt="Stripe" />
                                        </button>
                                        <button
                                            onClick={() => handleRazorpayPayment(item._id)}
                                            className='w-full md:w-48 py-2 border border-gray-300 rounded-full transition-all duration-300 hover:bg-gray-100 flex items-center justify-center'
                                            aria-label={`Pay with Razorpay for appointment with ${item.docData.name}`}
                                        >
                                            <img className='h-5 w-auto' src={assets.razorpay_logo} alt="Razorpay" />
                                        </button>
                                    </>
                                )}

                                {!item.cancelled && item.payment && !item.isCompleted && (
                                    <div className='w-full md:w-48 py-2 rounded-full font-medium text-center bg-green-100 text-green-700'>
                                        Paid
                                    </div>
                                )}

                                {item.isCompleted && (
                                    <div className='w-full md:w-48 py-2 rounded-full font-medium text-center bg-gray-100 text-gray-500'>
                                        Completed
                                    </div>
                                )}

                                {!item.cancelled && !item.isCompleted && (
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        className='w-full md:w-48 py-2 border border-red-500 text-red-500 rounded-full font-medium transition-all duration-300 hover:bg-red-500 hover:text-white'
                                        aria-label={`Cancel appointment with ${item.docData.name}`}
                                    >
                                        Cancel Appointment
                                    </button>
                                )}

                                {item.cancelled && (
                                    <div className='w-full md:w-48 py-2 rounded-full font-medium text-center bg-red-100 text-red-700'>
                                        Cancelled
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl shadow-inner">
                    <img src={assets.empty_list_illustration} alt="No appointments found" className="w-64 mb-6" />
                    <p className="text-xl text-gray-600 font-medium">You have no appointments yet.</p>
                    <button
                        onClick={() => navigate('/')}
                        className='mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300'
                    >
                        Book Your First Appointment
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyAppointments;
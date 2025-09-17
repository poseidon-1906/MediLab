
import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// --- SKELETON COMPONENTS ---
const CardSkeleton = () => (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-custom animate-pulse'>
        <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div>
                <div className='h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded'></div>
                <div className='h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-2'></div>
            </div>
        </div>
    </div>
);

const TableRowSkeleton = () => (
    <tr className="animate-pulse">
        <td className="p-4"><div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div></td>
        <td className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></td>
        <td className="p-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div></td>
        <td className="p-4"><div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div></td>
    </tr>
);

// --- WIDGETS ---
const AppointmentsPanel = ({ appointments, loading, onCancel, formatDate }) => {
    const getStatus = (item) => {
        if (item.cancelled) return { text: 'Rejected', color: 'text-red-500' };
        if (item.isCompleted) return { text: 'Accepted', color: 'text-green-600' };
        return { text: 'Pending', color: 'text-yellow-500' };
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-custom overflow-hidden">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white p-4 border-b dark:border-gray-700">Recent Appointments</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">Patient</th>
                            <th scope="col" className="p-4">Doctor</th>
                            <th scope="col" className="p-4">Date</th>
                            <th scope="col" className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
                        ) : (
                            appointments.slice(0, 5).map((item, index) => (
                                <tr key={index} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.userData.name}</td>
                                    <td className="p-4">Dr. {item.docData.name}</td>
                                    <td className="p-4">{formatDate(item.slotDate)}</td>
                                    <td className={`p-4 font-semibold ${getStatus(item).color}`}>{getStatus(item).text}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RecentDoctors = ({ doctors, loading }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-custom overflow-hidden">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white p-4 border-b dark:border-gray-700">Recent Doctors</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 flex items-center gap-4 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex-1"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></div>
                    </div>
                ))
            ) : (
                doctors.slice(0, 5).map(doc => (
                    <div key={doc._id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-full object-cover" />
                        <p className="font-medium text-gray-800 dark:text-white">Dr. {doc.name}</p>
                    </div>
                ))
            )}
        </div>
    </div>
);

const PatientChart = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Patient Inflow (Last 7 Days)',
            },
        },
    };

    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const data = {
        labels,
        datasets: [
            {
                label: 'New Patients',
                data: labels.map(() => Math.floor(Math.random() * 20) + 5),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-custom p-4">
            <Line options={options} data={data} />
        </div>
    );
};

const Dashboard = () => {
    const { aToken, getDashData, cancelAppointment, dashData, doctors, getAllDoctors } = useContext(AdminContext);
    const { slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
            getAllDoctors();
        }
    }, [aToken]);

    const colorStyles = {
        blue: { border: 'border-blue-500', bg: 'bg-blue-100' },
        purple: { border: 'border-purple-500', bg: 'bg-purple-100' },
        green: { border: 'border-green-500', bg: 'bg-green-100' },
        yellow: { border: 'border-yellow-500', bg: 'bg-yellow-100' },
        red: { border: 'border-red-500', bg: 'bg-red-100' },
    };

    const kpiCards = [
        { title: 'Doctors', value: dashData?.doctors, icon: assets.doctor_icon, color: 'blue' },
        { title: 'Patients', value: dashData?.patients, icon: assets.patients_icon, color: 'purple' },
        { title: 'Appointments', value: dashData?.appointments, icon: assets.appointments_icon, color: 'green' },
        { title: 'Wards', value: 'N/A', icon: assets.list_icon, color: 'yellow' },
        { title: 'Labs', value: 'N/A', icon: assets.list_icon, color: 'red' },
    ];

    const loading = !dashData || !doctors.length > 0;

    return (
        <div className='p-4 md:p-6 bg-light dark:bg-dark min-h-screen w-full'>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>
            
            {/* KPI Cards Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
                ) : (
                    kpiCards.map((card, index) => (
                        <div key={index} className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-custom border-l-4 ${colorStyles[card.color].border}`}>
                            <div className='flex items-center gap-4'>
                                <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full ${colorStyles[card.color].bg} dark:bg-gray-700`}>
                                    <img className='w-8 h-8' src={card.icon} alt={`${card.title} Icon`} />
                                </div>
                                <div>
                                    <p className='text-3xl font-bold text-gray-800 dark:text-white'>{card.value}</p>
                                    <p className='text-gray-500 dark:text-gray-400'>{card.title}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <AppointmentsPanel appointments={dashData?.latestAppointments || []} loading={loading} onCancel={cancelAppointment} formatDate={slotDateFormat} />
                    <PatientChart />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <RecentDoctors doctors={doctors} loading={loading} />
                    {/* Out of Stock Medicines - Placeholder */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-custom">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white p-4 border-b dark:border-gray-700">Out of Stock Medicines</h3>
                        <div className="p-4 text-center text-gray-400 dark:text-gray-500">No data available.</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;

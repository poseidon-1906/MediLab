
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { DoctorContext } from '../../context/DoctorContext';

const AddLabResultForm = ({ onSave, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-custom w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Lab Result</h2>
            <form className="space-y-4">
                <input className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600' type="text" placeholder="Patient Name" />
                <input className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600' type="text" placeholder="Test Name" />
                <input className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600' type="text" placeholder="Result" />
                <input className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600' type="date" />
                <input className='w-full' type="file" />
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-600">Cancel</button>
                    <button type="button" disabled title="Backend API missing" className="py-2 px-4 rounded-lg bg-primary text-white disabled:bg-gray-400 cursor-not-allowed">Save</button>
                </div>
            </form>
        </div>
    </div>
);

const Lab = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken, appointments, getAppointments, getPatientRecordsForDoctor } = useContext(DoctorContext);

    const [labData, setLabData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchDoctorData = async () => {
            if (dToken) {
                await getAppointments();
            }
        };
        if(dToken) fetchDoctorData();
        else setLoading(false);
    }, [dToken]);

    useEffect(() => {
        const fetchLabResults = async () => {
            if (dToken && appointments.length > 0) {
                setLoading(true);
                const patientIds = [...new Set(appointments.map(app => app.userId))];
                const patientPromises = patientIds.map(id => getPatientRecordsForDoctor(id));
                const results = await Promise.all(patientPromises);
                
                const allLabResults = patientIds.map((patientId, index) => {
                    const patientAppointments = appointments.filter(a => a.userId === patientId);
                    return {
                        patientName: patientAppointments[0]?.userData.name || 'Unknown',
                        tests: results[index].flatMap(rec => rec.labResults || [])
                    }
                }).filter(p => p.tests.length > 0);

                setLabData(allLabResults);
                setLoading(false);
            }
        };
        if(dToken) fetchLabResults();
    }, [dToken, appointments]);

    const filteredData = labData.filter(p => p.patientName.toLowerCase().includes(searchQuery.toLowerCase()));

    const mockLabResults = [
        { patientName: 'John Doe', tests: [{ test: 'Blood Count', result: 'Normal', file: '#', date: '2023-10-27' }] },
    ];

    const displayData = aToken ? mockLabResults : filteredData;

    return (
        <div className='p-4 md:p-6 bg-light dark:bg-dark min-h-screen w-full'>
            {showForm && aToken && <AddLabResultForm onCancel={() => setShowForm(false)} />}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Lab Results</h1>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search Patient..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="py-2 px-4 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white"/>
                    {aToken && <button onClick={() => setShowForm(true)} className='bg-btn-add text-white py-2 px-4 rounded-lg shadow-md'>Add Result</button>}
                </div>
            </div>

            {aToken && (
                <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200">
                    <p className="font-bold">Admin View Incomplete:</p>
                    <p>APIs for admins to fetch and add lab results are required. Displaying mock data.</p>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-custom overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">Patient Name</th>
                                <th scope="col" className="p-4">Test</th>
                                <th scope="col" className="p-4">Result</th>
                                <th scope="col" className="p-4">Date</th>
                                <th scope="col" className="p-4">File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(loading && dToken) ? (
                                <tr><td colSpan="5" className="text-center p-8">Loading...</td></tr>
                            ) : displayData.length === 0 ? (
                                <tr><td colSpan="5" className="text-center p-8">No lab results found.</td></tr>
                            ) : (
                                displayData.map((patientResult, pIndex) => (
                                    patientResult.tests.map((testItem, tIndex) => (
                                        <tr key={`${pIndex}-${tIndex}`} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            {tIndex === 0 && (
                                                <td rowSpan={patientResult.tests.length} className="p-4 font-medium text-gray-900 dark:text-white align-top border-r dark:border-gray-700">
                                                    {patientResult.patientName}
                                                </td>
                                            )}
                                            <td className="p-4">{testItem.test}</td>
                                            <td className="p-4">{testItem.result}</td>
                                            <td className="p-4">{new Date(testItem.date).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                <a href={testItem.file} className="text-primary hover:underline">View File</a>
                                            </td>
                                        </tr>
                                    ))
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Lab;

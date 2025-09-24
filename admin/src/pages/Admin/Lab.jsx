import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AddLabResultForm = ({ onSave, onCancel, patients }) => {
    const [formData, setFormData] = useState({
        patientId: '',
        test: '',
        result: '',
        date: '',
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('patientId', formData.patientId);
        data.append('test', formData.test);
        data.append('result', formData.result);
        data.append('date', formData.date);
        if (formData.file) {
            data.append('file', formData.file);
        }
        const success = await onSave(data);
        if (success) {
            onCancel();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-custom w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Lab Result</h2>
                <form className="space-y-4" onSubmit={handleSave}>
                    <select name="patientId" value={formData.patientId} onChange={handleChange} className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600' required>
                        <option value="">Select Patient</option>
                        {patients.map(patient => (
                            <option key={patient._id} value={patient._id}>{patient.name}</option>
                        ))}
                    </select>
                    <input name="test" value={formData.test} onChange={handleChange} className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600' type="text" placeholder="Test Name" required />
                    <input name="result" value={formData.result} onChange={handleChange} className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600' type="text" placeholder="Result" required />
                    <input name="date" value={formData.date} onChange={handleChange} className='w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600' type="date" required />
                    <input name="file" onChange={handleFileChange} className='w-full' type="file" />
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onCancel} className="py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-600">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-lg bg-primary text-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Lab = () => {
    const { aToken, patients, getAllPatients, labResults, getLabResults, addLabResult } = useContext(AdminContext);

    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (aToken) {
            getAllPatients();
            getLabResults().finally(() => setLoading(false));
        }
    }, [aToken]);

    const filteredData = labResults.filter(p => p.patientName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className='p-4 md:p-6 bg-light dark:bg-dark min-h-screen w-full'>
            {showForm && aToken && <AddLabResultForm patients={patients} onSave={addLabResult} onCancel={() => setShowForm(false)} />}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Lab Results</h1>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search Patient..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="py-2 px-4 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white"/>
                    {aToken && <button onClick={() => setShowForm(true)} className='bg-btn-add text-white py-2 px-4 rounded-lg shadow-md'>Add Result</button>}
                </div>
            </div>

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
                            {loading ? (
                                <tr><td colSpan="5" className="text-center p-8">Loading...</td></tr>
                            ) : filteredData.length === 0 ? (
                                <tr><td colSpan="5" className="text-center p-8">No lab results found.</td></tr>
                            ) : (
                                filteredData.map((patientResult, pIndex) => (
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
                                                {testItem.file && <a href={testItem.file} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View File</a>}
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

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';
import { FaNotesMedical, FaSyringe, FaAllergies, FaVial, FaPlus, FaTimes, FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';

// --- Reusable Accordion Component ---
const Accordion = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded-lg mb-4 bg-white shadow-sm w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 font-semibold text-lg text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
                <div className="flex items-center">
                    {icon}
                    <span className="ml-3">{title}</span>
                </div>
                <FaChevronDown className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};


// --- Form for Adding a New Patient Record ---
const AddPatientRecordForm = ({ patientId, appointmentId, onSave }) => {
    const { dToken } = useContext(DoctorContext);
    const { backendUrl } = useContext(AppContext);

    const [formData, setFormData] = useState({
        diagnosis: '',
        prescription: '',
        notes: ''
    });
    const [allergies, setAllergies] = useState([{ type: '', detail: '' }]);
    const [vaccinations, setVaccinations] = useState([{ vaccin: '', date1: '', date2: '', rappelPrevu: '', observations: '' }]);
    const [labResults, setLabResults] = useState([{ test: '', result: '', file: '', date: '' }]);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDynamicChange = (index, event, section, setSection) => {
        const values = [...section];
        values[index][event.target.name] = event.target.value;
        setSection(values);
    };

    const handleAdd = (section, setSection, fields) => {
        setSection([...section, fields]);
    };

    const handleRemove = (index, section, setSection) => {
        const values = [...section];
        values.splice(index, 1);
        setSection(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!patientId) {
            toast.error("Patient data not loaded. Cannot save record.");
            return;
        }
        setIsSaving(true);

        const recordData = {
            ...formData,
            patientId,
            appointmentId,
            allergies: allergies.filter(a => a.type && a.detail),
            vaccinations: vaccinations.filter(v => v.vaccin),
            labResults: labResults.filter(l => l.test)
        };

        try {
            const response = await axios.post(`${backendUrl}/api/doctor/add-record`, recordData, {
                headers: { dtoken: dToken }
            });

            if (response.data.success) {
                toast.success('Patient record added successfully!');
                onSave(); // Callback to refresh history and close form
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding patient record:", error);
            toast.error(error.response?.data?.message || 'An error occurred while adding record.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className='bg-gray-50 rounded-lg shadow-inner border border-gray-200 p-6 mt-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Add New Consultation Record</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Consultation Details Section */}
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Consultation Details</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor='diagnosis' className='block text-sm font-medium text-gray-700 mb-1'>Diagnosis</label>
                            <textarea id='diagnosis' name='diagnosis' rows='3' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm' value={formData.diagnosis} onChange={handleChange} required></textarea>
                        </div>
                        <div>
                            <label htmlFor='prescription' className='block text-sm font-medium text-gray-700 mb-1'>Prescription</label>
                            <textarea id='prescription' name='prescription' rows='3' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm' value={formData.prescription} onChange={handleChange} required></textarea>
                        </div>
                        <div>
                            <label htmlFor='notes' className='block text-sm font-medium text-gray-700 mb-1'>Notes</label>
                            <textarea id='notes' name='notes' rows='3' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm' value={formData.notes} onChange={handleChange}></textarea>
                        </div>
                    </div>
                </div>

                {/* Accordions for additional data */}
                <Accordion title="Allergies" icon={<FaAllergies className="text-red-500" />}>
                    {allergies.map((allergy, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-center mb-4 p-2 border-b">
                            <input type="text" name="type" placeholder="Type" value={allergy.type} onChange={event => handleDynamicChange(index, event, allergies, setAllergies)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <input type="text" name="detail" placeholder="Detail" value={allergy.detail} onChange={event => handleDynamicChange(index, event, allergies, setAllergies)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <button type="button" onClick={() => handleRemove(index, allergies, setAllergies)} className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAdd(allergies, setAllergies, { type: '', detail: '' })} className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Add Allergy</button>
                </Accordion>

                <Accordion title="Vaccinations" icon={<FaSyringe className="text-green-500" />}>
                    {vaccinations.map((vaccination, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 p-2 border-b">
                            <input type="text" name="vaccin" placeholder="Vaccine" value={vaccination.vaccin} onChange={event => handleDynamicChange(index, event, vaccinations, setVaccinations)} className="col-span-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <input type="date" name="date1" value={vaccination.date1} onChange={event => handleDynamicChange(index, event, vaccinations, setVaccinations)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <input type="date" name="date2" value={vaccination.date2} onChange={event => handleDynamicChange(index, event, vaccinations, setVaccinations)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <input type="date" name="rappelPrevu" value={vaccination.rappelPrevu} onChange={event => handleDynamicChange(index, event, vaccinations, setVaccinations)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <button type="button" onClick={() => handleRemove(index, vaccinations, setVaccinations)} className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Remove</button>
                            <textarea name="observations" placeholder="Observations" value={vaccination.observations} onChange={event => handleDynamicChange(index, event, vaccinations, setVaccinations)} className="col-span-full mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAdd(vaccinations, setVaccinations, { vaccin: '', date1: '', date2: '', rappelPrevu: '', observations: '' })} className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Add Vaccination</button>
                </Accordion>

                <Accordion title="Lab Results" icon={<FaVial className="text-purple-500" />}>
                    {labResults.map((labResult, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center mb-4 p-2 border-b">
                            <input type="text" name="test" placeholder="Test Name" value={labResult.test} onChange={event => handleDynamicChange(index, event, labResults, setLabResults)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <input type="text" name="result" placeholder="Result" value={labResult.result} onChange={event => handleDynamicChange(index, event, labResults, setLabResults)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <input type="date" name="date" value={labResult.date} onChange={event => handleDynamicChange(index, event, labResults, setLabResults)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <input type="text" name="file" placeholder="File URL" value={labResult.file} onChange={event => handleDynamicChange(index, event, labResults, setLabResults)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            <button type="button" onClick={() => handleRemove(index, labResults, setLabResults)} className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAdd(labResults, setLabResults, { test: '', result: '', file: '', date: '' })} className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Add Lab Result</button>
                </Accordion>

                <div className='flex justify-end pt-4'>
                    <button type='submit' className='px-8 py-3 font-semibold text-white rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg' disabled={isSaving || !patientId}>
                        {isSaving ? 'Saving Record...' : 'Save Record'}
                    </button>
                </div>
            </form>
        </div>
    );
}


// --- Main Consultation Page Component ---
const Consultation = () => {
    const { appointmentId } = useParams();
    const { backendUrl } = useContext(AppContext);
    const { dToken } = useContext(DoctorContext);

    const [patient, setPatient] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const [patientHistory, setPatientHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddRecord, setShowAddRecord] = useState(false);

    const fetchInitialData = async () => {
        if (!dToken || !appointmentId) return;
        setLoading(true);
        try {
            const appointmentRes = await axios.get(`${backendUrl}/api/doctor/appointment/${appointmentId}`, { headers: { dtoken: dToken } });
            if (appointmentRes.data.success) {
                const appointment = appointmentRes.data.data;
                setPatient(appointment.userData);
                setPatientId(appointment.userId);

                const historyRes = await axios.get(`${backendUrl}/api/doctor/patient-records/${appointment.userId}`, { headers: { dtoken: dToken } });
                if (historyRes.data.success) {
                    setPatientHistory(historyRes.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                } else {
                    toast.error("Could not fetch patient history.");
                }
            } else {
                toast.error("Could not fetch appointment details.");
            }
        } catch (error) {
            toast.error("An error occurred while fetching patient data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [dToken, appointmentId]); // Removed backendUrl from dependencies as it's unlikely to change

    const handleSaveRecord = () => {
        setShowAddRecord(false);
        fetchInitialData(); // Refresh history
    };

    if (loading) {
        return <div className='p-8 text-center text-xl'>Loading Patient History...</div>;
    }

    if (!patient) {
        return <div className='p-8 text-center text-xl text-red-500'>Patient data not found.</div>;
    }

    return (
        <div className='p-4 md:p-8 flex flex-col gap-8'>
            {/* Patient Header */}
            <div className='bg-white p-6 rounded-lg shadow-lg flex flex-wrap justify-between items-center gap-4'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>{patient.name}</h1>
                    <p className='text-md text-gray-600'>Managing medical records for: {patient.name}</p>
                </div>
                <button
                    onClick={() => setShowAddRecord(!showAddRecord)}
                    className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300'
                >
                    {showAddRecord ? <FaTimes className="mr-2" /> : <FaPlus className="mr-2" />}
                    {showAddRecord ? 'Cancel' : 'Add Consultation Record'}
                </button>
            </div>

            {/* Add Record Form (conditionally rendered) */}
            {showAddRecord && <AddPatientRecordForm patientId={patientId} appointmentId={appointmentId} onSave={handleSaveRecord} />}

            {/* Patient Full History */}
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-4'>Patient Medical History</h2>
                {patientHistory.length > 0 ? (
                    patientHistory.map(record => (
                        <div key={record._id} className='mb-8 p-4 border rounded-lg shadow-sm bg-gray-50'>
                            <div className='flex justify-between items-center mb-4'>
                                <h3 className='text-xl font-semibold text-blue-700'>Consultation on {new Date(record.createdAt).toLocaleDateString()}</h3>
                                <p className='text-sm text-gray-500'>Record ID: {record._id}</p>
                            </div>

                            {/* Core Info */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                <div className='bg-white p-3 rounded-md border'>
                                    <h4 className='font-bold text-gray-700 flex items-center'><FaNotesMedical className="mr-2 text-blue-500" />Diagnosis</h4>
                                    <p className='mt-1 text-gray-600'>{record.diagnosis}</p>
                                </div>
                                <div className='bg-white p-3 rounded-md border'>
                                    <h4 className='font-bold text-gray-700 flex items-center'><FaNotesMedical className="mr-2 text-blue-500" />Prescription</h4>
                                    <p className='mt-1 text-gray-600'>{record.prescription}</p>
                                </div>
                                {record.notes && (
                                    <div className='md:col-span-2 bg-white p-3 rounded-md border'>
                                        <h4 className='font-bold text-gray-700'>Notes</h4>
                                        <p className='mt-1 text-gray-600'>{record.notes}</p>
                                    </div>
                                )}
                            </div>

                            {/* Allergies */}
                            {record.allergies && record.allergies.length > 0 && (
                                <div className='mb-4'>
                                    <h4 className='font-bold text-gray-700 flex items-center mb-2'><FaAllergies className="mr-2 text-red-500" />Allergies</h4>
                                    <div className='flex flex-wrap gap-2'>
                                        {record.allergies.map((allergy, i) => <span key={i} className='bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded'>{allergy.type}: {allergy.detail}</span>)}
                                    </div>
                                </div>
                            )}

                            {/* Vaccinations */}
                            {record.vaccinations && record.vaccinations.length > 0 && (
                                <div className='mb-4 overflow-x-auto'>
                                    <h4 className='font-bold text-gray-700 flex items-center mb-2'><FaSyringe className="mr-2 text-green-500" />Vaccinations</h4>
                                    <table className='min-w-full bg-white border rounded-lg'>
                                        <thead className='bg-gray-100'>
                                            <tr>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>Vaccine</th>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>Date 1</th>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>Date 2</th>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>Booster Due</th>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>Observations</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {record.vaccinations.map((v, i) => (
                                                <tr key={i} className='border-t'>
                                                    <td className='px-4 py-2'>{v.vaccin}</td>
                                                    <td className='px-4 py-2'>{v.date1 ? new Date(v.date1).toLocaleDateString() : 'N/A'}</td>
                                                    <td className='px-4 py-2'>{v.date2 ? new Date(v.date2).toLocaleDateString() : 'N/A'}</td>
                                                    <td className='px-4 py-2'>{v.rappelPrevu ? new Date(v.rappelPrevu).toLocaleDateString() : 'N/A'}</td>
                                                    <td className='px-4 py-2'>{v.observations}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Lab Results */}
                            {record.labResults && record.labResults.length > 0 && (
                                <div className='overflow-x-auto'>
                                    <h4 className='font-bold text-gray-700 flex items-center mb-2'><FaVial className="mr-2 text-purple-500" />Lab Results</h4>
                                    <table className='min-w-full bg-white border rounded-lg'>
                                        <thead className='bg-gray-100'>
                                            <tr>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>Test</th>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>Result</th>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>Date</th>
                                                <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>File</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {record.labResults.map((lab, i) => (
                                                <tr key={i} className='border-t'>
                                                    <td className='px-4 py-2'>{lab.test}</td>
                                                    <td className='px-4 py-2'>{lab.result}</td>
                                                    <td className='px-4 py-2'>{lab.date ? new Date(lab.date).toLocaleDateString() : 'N/A'}</td>
                                                    <td className='px-4 py-2'>
                                                        {lab.file ? (
                                                            <a href={lab.file} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline inline-flex items-center'>
                                                                View File <FaExternalLinkAlt className='ml-1 w-3 h-3' />
                                                            </a>
                                                        ) : 'No file'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className='text-gray-600'>No medical history found for this patient.</p>
                )}
            </div>
        </div>
    );
};

export default Consultation;
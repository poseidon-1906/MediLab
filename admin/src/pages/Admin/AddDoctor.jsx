import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl } = useContext(AppContext);
    const { aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error('Image Not Selected');
            }

            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });
            
            if (data.success) {
                toast.success(data.message);
                setDocImg(false);
                setName('');
                setPassword('');
                setEmail('');
                setAddress1('');
                setAddress2('');
                setDegree('');
                setAbout('');
                setFees('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='p-4 md:p-8 w-full bg-gray-100 min-h-screen'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Add New Doctor</h1>
            </div>

            <div className='bg-white px-8 py-8 border rounded-lg shadow-md max-w-4xl mx-auto'>
                {/* Image Upload Section */}
                <div className='flex flex-col items-center gap-4 mb-8 text-center text-gray-500'>
                    <label htmlFor="doc-img" className='cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center p-2 transition-all duration-300 hover:border-blue-500'>
                        <img className='w-full h-full object-cover rounded-full' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload area" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="doc-img" id="doc-img" hidden />
                    <p className='font-medium text-gray-600'>Upload Doctor's Picture</p>
                </div>

                {/* Form Fields Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-gray-700'>
                    {/* Column 1 */}
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>Doctor Name</label>
                            <input onChange={e => setName(e.target.value)} value={name} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' type="text" placeholder='e.g., Dr. John Doe' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>Doctor Email</label>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' type="email" placeholder='e.g., dr.john@example.com' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>Password</label>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' type="password" placeholder='Set a strong password' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>Experience</label>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white'>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>Consultation Fees</label>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' type="number" placeholder='e.g., 50' required />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>Speciality</label>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>Degree</label>
                            <input onChange={e => setDegree(e.target.value)} value={degree} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' type="text" placeholder='e.g., M.D., MBBS' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>Clinic Address</label>
                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-2' type="text" placeholder='Address Line 1' required />
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' type="text" placeholder='Address Line 2' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='font-medium'>About Doctor</label>
                            <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' rows={5} placeholder='Brief description about the doctor...'></textarea>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className='flex justify-end mt-8'>
                    <button type='submit' className='bg-blue-600 text-white font-semibold px-12 py-4 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300'>
                        Add Doctor
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddDoctor;
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loginIllustration from "../assets/images/illustration.avif";

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { backendUrl, token, setToken } = useContext(AppContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            let response;
            if (state === 'Sign Up') {
                // Pour l'inscription, nous envoyons name, email et password
                response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
            } else {
                // Pour la connexion, nous envoyons email et password seulement
                response = await axios.post(backendUrl + '/api/user/login', { email, password });
            }

            const { data } = response;

            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success(data.message); // Affichez le message de succès du backend
            } else {
                toast.error(data.message); // Affichez le message d'erreur du backend
            }
        } catch (error) {
            // Gestion des erreurs plus robuste, comme dans le premier code
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Une erreur inattendue est survenue. Veuillez réessayer.';
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div className="bg-[#f0f2f5] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden md:flex md:max-w-4xl w-full">
                {/* Left Side: Illustration and Text */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center items-center text-center">
                    <img
                        src={loginIllustration}
                        alt="Illustration"
                        className="w-full max-w-sm animate-fade-in"
                    />
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">
                        {state === 'Sign Up' ? 'Welcome!' : 'Welcome Back!'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {state === 'Sign Up' ? 'Create your account to get started.' : 'Please log in to your account to continue.'}
                    </p>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white">
                    <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
                        {state === 'Sign Up' ? 'Sign Up' : 'Sign In'}
                    </h2>
                    <form onSubmit={onSubmitHandler} className="w-full space-y-6">
                        {state === 'Sign Up' && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                                required
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                            required
                        />
                        <div className="flex justify-end">
                            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            {state === 'Sign Up' ? 'Create Account' : 'Login'}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-700">
                            {state === 'Sign Up' ? 'Already have an account?' : 'Don\'t have an account?'}
                            <span
                                onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                                className="text-blue-600 font-semibold hover:underline cursor-pointer ml-1"
                            >
                                {state === 'Sign Up' ? 'Login here' : 'Sign Up here'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
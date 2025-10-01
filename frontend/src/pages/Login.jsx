import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loginIllustration from "../assets/images/illustration.avif";

const Login = () => {
    const [state, setState] = useState("S'inscrire");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { backendUrl, token, setToken } = useContext(AppContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            let response;
            if (state === "S'inscrire") {
                response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
            } else {
                response = await axios.post(backendUrl + '/api/user/login', { email, password });
            }

            const { data } = response;

            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
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
                        {state === "S'inscrire" ? 'Bienvenue !' : 'Content de vous revoir !'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {state === "S'inscrire" ? 'Créez votre compte pour commencer.' : 'Veuillez vous connecter à votre compte pour continuer.'}
                    </p>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white">
                    <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
                        {state === "S'inscrire" ? "S'inscrire" : 'Se connecter'}
                    </h2>
                    <form onSubmit={onSubmitHandler} className="w-full space-y-6">
                        {state === "S'inscrire" && (
                            <input
                                type="text"
                                placeholder="Nom complet"
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
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                            required
                        />
                        <div className="flex justify-end">
                            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                                Mot de passe oublié ?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                            {state === "S'inscrire" ? 'Créer un compte' : 'Se connecter'}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-700">
                            {state === "S'inscrire" ? 'Vous avez déjà un compte ?' : 'Vous n\'avez pas de compte ?'}
                            <span
                                onClick={() => setState(state === "S'inscrire" ? 'Se connecter' : "S'inscrire")}
                                className="text-blue-600 font-semibold hover:underline cursor-pointer ml-1"
                            >
                                {state === "S'inscrire" ? 'Connectez-vous ici' : 'Inscrivez-vous ici'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GlassCard, Button } from '../components/UI';
import { useAuth } from '../contexts/AuthContext';
import { Rocket, Mail, Lock, User, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [searchParams] = useSearchParams();
    const isRegisterMode = searchParams.get('mode') === 'register';
    const navigate = useNavigate();
    const { login, register, isDemoMode } = useAuth();
    
    const [isRegistering, setIsRegistering] = useState(isRegisterMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegistering) {
                await register(email, password, name);
            } else {
                await login(email, password);
            }
            navigate('/');
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to authenticate.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full max-h-[600px] bg-neonBlue/10 blur-[120px] rounded-full pointer-events-none" />

            <GlassCard className="w-full max-w-md p-8 relative z-10 border-white/10">
                <div className="text-center mb-8">
                    <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                        <Rocket className="text-neonBlue w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white">
                        {isRegistering ? 'Join the Squad' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-400 mt-2">
                        {isRegistering ? 'Start your journey to success today.' : 'Access your personalized study dashboard.'}
                    </p>
                </div>

                {isDemoMode && (
                     <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-neonBlue/10 border border-neonBlue/20 text-neonBlue p-3 rounded-lg mb-6 flex items-start gap-2 text-xs"
                    >
                        <Info size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Demo Mode Active: Enter any email/password to simulate login. No real account will be created.</span>
                    </motion.div>
                )}

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
                    >
                        <AlertCircle size={16} />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    required={isRegistering}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-neonBlue focus:ring-1 focus:ring-neonBlue/50 transition-all outline-none"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-neonBlue focus:ring-1 focus:ring-neonBlue/50 transition-all outline-none"
                                placeholder="student@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-neonBlue focus:ring-1 focus:ring-neonBlue/50 transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full justify-center mt-6"
                    >
                        {loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}
                        {!loading && <ArrowRight size={18} />}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        {isRegistering ? 'Already have an account?' : "Don't have an account?"} {' '}
                        <button 
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="text-neonBlue hover:underline font-medium"
                        >
                            {isRegistering ? 'Sign In' : 'Register'}
                        </button>
                    </p>
                </div>
            </GlassCard>
        </div>
    );
};

export default Login;
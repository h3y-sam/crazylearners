import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Activity, Zap, CheckCircle } from 'lucide-react';
import { Button, GlassCard } from '../components/UI';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neonPurple/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neonBlue/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-neonGreen animate-pulse"></span>
                    <span className="text-sm font-medium text-gray-300">New Syllabus Updates 2025</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
                    Crush <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">JEE & NEET</span> <br className="hidden md:block"/>
                    Like a Pro.
                </h1>
                
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
                    The ultimate futuristic platform. High-yield notes, 20 years of PYQs, AI-powered doubt solving, and NTA alerts—all in one place.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={() => navigate('/materials')} icon={<Zap size={20}/>}>
                        Start Learning
                    </Button>
                    <Button onClick={() => navigate('/mcq')} variant="secondary" icon={<Clock size={20}/>}>
                        Practice PYQs
                    </Button>
                </div>
            </motion.div>
        </div>
    </section>
  );
};

const Features = () => {
    const features = [
        {
            title: "Study Material",
            desc: "Concise notes, formula sheets, and mind maps designed for last-minute revision.",
            icon: <BookOpen className="text-neonPurple" size={32} />,
            color: "border-neonPurple/30"
        },
        {
            title: "Smart PYQs",
            desc: "20 years of past papers with instant detailed solutions and difficulty analysis.",
            icon: <Clock className="text-neonBlue" size={32} />,
            color: "border-neonBlue/30"
        },
        {
            title: "Performance Stats",
            desc: "Track your progress with advanced analytics and futuristic visualizations.",
            icon: <Activity className="text-neonGreen" size={32} />,
            color: "border-neonGreen/30"
        }
    ];

    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className={`h-full border-t-4 ${feature.color}`} hoverEffect>
                                <div className="mb-4 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const WhyUs = () => {
    return (
        <section className="py-20 bg-[#080c1d]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
                 <div className="w-full md:w-1/2">
                    <h2 className="text-4xl font-display font-bold mb-6">Why Crazy Learners?</h2>
                    <div className="space-y-6">
                        {[
                            "Distraction-free futuristic interface",
                            "Chapter-wise weightage analysis",
                            "Daily NTA Official Updates",
                            "Dark mode optimized for long study hours"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <CheckCircle className="text-neonBlue flex-shrink-0" />
                                <span className="text-lg text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                 </div>
                 <div className="w-full md:w-1/2 relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-neonBlue to-neonPurple opacity-20 blur-3xl rounded-full"></div>
                     <GlassCard className="relative border-l-4 border-neonBlue">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold text-lg">Daily Progress</h4>
                            <span className="text-neonGreen text-sm font-bold">+14%</span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Physics</span>
                                    <span>75%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-neonPurple w-3/4"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Chemistry</span>
                                    <span>45%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-neonBlue w-[45%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Mathematics</span>
                                    <span>90%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-neonGreen w-[90%]"></div>
                                </div>
                            </div>
                        </div>
                     </GlassCard>
                 </div>
            </div>
        </section>
    )
}

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <WhyUs />
    </>
  );
};

export default HomePage;

import React, { useState } from 'react';
import { GlassCard } from '../components/UI';
import { ChevronDown, ChevronUp, Book, Atom, Dna, Sigma } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SYLLABUS_DATA = {
    JEE: {
        Physics: [
            "Kinematics", "Laws of Motion", "Work, Energy and Power", "Rotational Motion", "Gravitation", 
            "Thermodynamics", "Electrostatics", "Current Electricity", "Magnetism", "Optics", "Modern Physics"
        ],
        Chemistry: [
            "Atomic Structure", "Chemical Bonding", "Thermodynamics", "Equilibrium", "Redox Reactions", 
            "Hydrocarbons", "Alcohols, Phenols and Ethers", "Coordination Compounds", "P-Block Elements"
        ],
        Maths: [
            "Sets, Relations and Functions", "Complex Numbers", "Quadratic Equations", "Matrices and Determinants", 
            "Permutations and Combinations", "Binomial Theorem", "Sequence and Series", "Limits, Continuity and Differentiability", 
            "Integral Calculus", "Coordinate Geometry", "Vector Algebra", "3D Geometry"
        ]
    },
    NEET: {
        Physics: [
            "Physical World and Measurement", "Kinematics", "Laws of Motion", "Work, Energy and Power", 
            "Motion of System of Particles and Rigid Body", "Gravitation", "Properties of Bulk Matter", 
            "Thermodynamics", "Behaviour of Perfect Gas and Kinetic Theory", "Oscillations and Waves"
        ],
        Chemistry: [
            "Some Basic Concepts of Chemistry", "Structure of Atom", "Classification of Elements and Periodicity in Properties", 
            "Chemical Bonding and Molecular Structure", "States of Matter: Gases and Liquids", "Thermodynamics", "Equilibrium"
        ],
        Biology: [
            "Diversity in Living World", "Structural Organisation in Animals and Plants", "Cell Structure and Function", 
            "Plant Physiology", "Human Physiology", "Reproduction", "Genetics and Evolution", "Biology and Human Welfare", 
            "Biotechnology and Its Applications", "Ecology and Environment"
        ]
    }
};

const Syllabus = () => {
    const [activeTab, setActiveTab] = useState<'JEE' | 'NEET'>('JEE');
    const [expandedSubject, setExpandedSubject] = useState<string | null>('Physics');

    const toggleSubject = (subject: string) => {
        setExpandedSubject(expandedSubject === subject ? null : subject);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-display font-bold text-white mb-4">Exam Syllabus</h1>
                <p className="text-gray-400">Comprehensive chapter-wise breakdown for your preparation.</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-10">
                <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
                    {['JEE', 'NEET'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as 'JEE' | 'NEET')}
                            className={`px-8 py-2 rounded-full font-bold transition-all duration-300 ${
                                activeTab === tab 
                                ? 'bg-neonBlue text-navy shadow-[0_0_15px_rgba(0,209,255,0.4)]' 
                                : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
                {(Object.entries(SYLLABUS_DATA[activeTab]) as [string, string[]][]).map(([subject, topics]) => {
                    const isExpanded = expandedSubject === subject;
                    const Icon = subject === 'Physics' ? Atom : subject === 'Chemistry' ? Dna : subject === 'Maths' ? Sigma : Book;

                    return (
                        <GlassCard key={subject} className={`!p-0 overflow-hidden transition-all duration-300 ${isExpanded ? 'border-neonBlue/30' : ''}`}>
                            <button 
                                onClick={() => toggleSubject(subject)}
                                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${
                                        subject === 'Physics' ? 'bg-neonPurple/10 text-neonPurple' :
                                        subject === 'Chemistry' ? 'bg-neonBlue/10 text-neonBlue' :
                                        'bg-neonGreen/10 text-neonGreen'
                                    }`}>
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{subject}</h3>
                                </div>
                                {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="bg-black/20 border-t border-white/5"
                                    >
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {topics.map((topic, idx) => (
                                                <div key={idx} className="flex items-center gap-3 text-gray-300 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-neonBlue/50" />
                                                    {topic}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
};

export default Syllabus;
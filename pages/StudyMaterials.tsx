import React, { useState } from 'react';
import { GlassCard, Badge } from '../components/UI';
import { MaterialItem } from '../types';
import { FileText, Book, Sigma, Atom, Dna, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_MATERIALS: MaterialItem[] = [
    { id: '1', title: 'Electrostatics Master Notes', type: 'PDF', subjectId: 'physics', description: 'Complete chapter summary with solved examples.' },
    { id: '2', title: 'Organic Chemistry Reaction Maps', type: 'Concept', subjectId: 'chemistry', description: 'Visual charts for all named reactions.' },
    { id: '3', title: 'Integration Short Tricks', type: 'Formula', subjectId: 'math', description: 'Bypass long methods with these tricks.' },
    { id: '4', title: 'Genetics High Yield Points', type: 'Book', subjectId: 'biology', description: 'NCERT extract for NEET aspirants.' },
    { id: '5', title: 'Rotational Motion Formulas', type: 'Formula', subjectId: 'physics', description: 'Sheet containing MOI of all bodies.' },
    { id: '6', title: 'P-Block Elements Trends', type: 'PDF', subjectId: 'chemistry', description: 'Detailed trends analysis for Group 15-18.' },
];

const StudyMaterials = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filteredMaterials = MOCK_MATERIALS.filter(m => {
        const matchesFilter = filter === 'all' || m.subjectId === filter;
        const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const categories = [
        { id: 'all', label: 'All Subjects', icon: null },
        { id: 'physics', label: 'Physics', icon: <Atom size={16}/> },
        { id: 'chemistry', label: 'Chemistry', icon: <Dna size={16}/> },
        { id: 'math', label: 'Maths', icon: <Sigma size={16}/> },
        { id: 'biology', label: 'Biology', icon: <Dna size={16}/> },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Study Materials</h1>
                    <p className="text-gray-400">Curated high-quality content for your prep.</p>
                </div>
                
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search topics..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neonBlue transition-colors"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            filter === cat.id 
                            ? 'bg-neonBlue text-navy shadow-[0_0_15px_rgba(0,209,255,0.4)]' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <GlassCard className="h-full flex flex-col hover:border-neonBlue/30 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${
                                    item.subjectId === 'physics' ? 'bg-neonPurple/10 text-neonPurple' :
                                    item.subjectId === 'chemistry' ? 'bg-neonBlue/10 text-neonBlue' :
                                    'bg-neonGreen/10 text-neonGreen'
                                }`}>
                                    {item.type === 'PDF' ? <FileText size={20} /> : <Book size={20} />}
                                </div>
                                <Badge type="info">{item.type}</Badge>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neonBlue transition-colors">{item.title}</h3>
                            <p className="text-sm text-gray-400 mb-6 flex-grow">{item.description}</p>
                            
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{item.subjectId}</span>
                                <span className="text-sm text-neonBlue font-medium">Download</span>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {filteredMaterials.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p>No materials found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default StudyMaterials;

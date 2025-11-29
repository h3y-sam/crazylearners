import React from 'react';
import { GlassCard, Badge } from '../components/UI';
import { UpdateNotification } from '../types';
import { Bell, Calendar, ExternalLink } from 'lucide-react';

const MOCK_UPDATES: UpdateNotification[] = [
    { id: 1, title: "JEE Main 2025 Session 1 Result Declared", date: "Feb 12, 2025", category: "Result", isNew: true },
    { id: 2, title: "NEET UG 2025 Registration Starts Today", date: "Feb 10, 2025", category: "Exam", isNew: true },
    { id: 3, title: "Updated Syllabus for Physics Released", date: "Jan 25, 2025", category: "Syllabus", isNew: false },
    { id: 4, title: "Correction Window for JEE Main Application", date: "Jan 20, 2025", category: "Admit Card", isNew: false },
];

const UpdatesPage = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-neonBlue/10 rounded-full text-neonBlue">
                    <Bell size={24} />
                </div>
                <h1 className="text-3xl font-display font-bold">Official NTA Updates</h1>
            </div>

            <div className="space-y-4">
                {MOCK_UPDATES.map((update) => (
                    <GlassCard key={update.id} className="group hover:border-neonBlue/30 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge type={update.isNew ? 'success' : 'info'}>
                                        {update.category}
                                    </Badge>
                                    {update.isNew && (
                                        <span className="animate-pulse text-xs text-neonGreen font-bold uppercase tracking-wider">
                                            ● Live Now
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-neonBlue transition-colors">
                                    {update.title}
                                </h3>
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{update.date}</span>
                                </div>
                                <button className="text-white hover:text-neonBlue transition-colors">
                                    <ExternalLink size={20} />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
            
            <div className="mt-8 p-4 rounded-xl border border-dashed border-gray-700 text-center text-gray-500 text-sm">
                End of recent updates. Check <a href="#" className="text-neonBlue hover:underline">nta.ac.in</a> for archives.
            </div>
        </div>
    );
};

export default UpdatesPage;

import React, { useState } from 'react';
import { GlassCard, Button } from '../components/UI';
import { Question } from '../types';
import { CheckCircle, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "Which of the following has the highest dipole moment?",
        options: ["CH3Cl", "CH2Cl2", "CHCl3", "CCl4"],
        correctIndex: 0,
        explanation: "CH3Cl has the highest dipole moment because the vector sum of bond moments is maximum.",
        topic: "Chemical Bonding",
        difficulty: "Medium"
    },
    {
        id: 2,
        text: "The dimensions of Planck's Constant are same as:",
        options: ["Force", "Energy", "Linear Momentum", "Angular Momentum"],
        correctIndex: 3,
        explanation: "Planck's constant (h) has dimensions [ML2T-1], which is same as Angular Momentum (L = mvr).",
        topic: "Units & Dimensions",
        difficulty: "Easy"
    },
    {
        id: 3,
        text: "In the human body, which of the following is an example of a pivot joint?",
        options: ["Knee joint", "Atlas and Axis", "Shoulder joint", "Hip joint"],
        correctIndex: 1,
        explanation: "The joint between Atlas and Axis vertebrae allows rotation (pivot joint).",
        topic: "Locomotion",
        difficulty: "Medium"
    }
];

const MCQPage = () => {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const question = MOCK_QUESTIONS[currentQIndex];

    const handleSelect = (idx: number) => {
        if (!isSubmitted) setSelectedOption(idx);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;
        setIsSubmitted(true);
        if (selectedOption === question.correctIndex) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentQIndex < MOCK_QUESTIONS.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-display">Practice Quiz</h2>
                    <p className="text-gray-400 text-sm">Topic: Mixed Bag • {MOCK_QUESTIONS.length} Questions</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full font-mono text-neonBlue">
                    {currentQIndex + 1} / {MOCK_QUESTIONS.length}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <GlassCard className="mb-6">
                        <div className="flex gap-2 mb-4">
                            <span className={`text-xs px-2 py-1 rounded border ${
                                question.difficulty === 'Easy' ? 'border-green-500 text-green-500' :
                                question.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                                'border-red-500 text-red-500'
                            }`}>
                                {question.difficulty}
                            </span>
                            <span className="text-xs px-2 py-1 rounded border border-gray-600 text-gray-400">
                                {question.topic}
                            </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-semibold mb-8 leading-relaxed">
                            {question.text}
                        </h3>

                        <div className="space-y-4">
                            {question.options.map((option, idx) => {
                                let styleClass = "border-white/10 hover:bg-white/5";
                                if (isSubmitted) {
                                    if (idx === question.correctIndex) styleClass = "border-green-500/50 bg-green-500/10 text-green-400";
                                    else if (idx === selectedOption) styleClass = "border-red-500/50 bg-red-500/10 text-red-400";
                                } else if (selectedOption === idx) {
                                    styleClass = "border-neonBlue bg-neonBlue/10 text-white shadow-[0_0_10px_rgba(0,209,255,0.2)]";
                                }

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${styleClass}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                                                selectedOption === idx || (isSubmitted && idx === question.correctIndex) ? 'border-transparent bg-white/20' : 'border-gray-500'
                                            }`}>
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            <span>{option}</span>
                                        </div>
                                        {isSubmitted && idx === question.correctIndex && <CheckCircle size={20} className="text-green-500" />}
                                        {isSubmitted && selectedOption === idx && idx !== question.correctIndex && <XCircle size={20} className="text-red-500" />}
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>

                    {isSubmitted && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-4 mb-6"
                        >
                            <div className="flex items-start gap-3">
                                <AlertCircle className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h4 className="font-bold text-blue-300 mb-1">Explanation:</h4>
                                    <p className="text-sm text-gray-300">{question.explanation}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="flex justify-between items-center mt-8">
                        <div className="text-sm text-gray-400">
                           Score: <span className="text-white font-bold">{score}</span>
                        </div>
                        <div className="flex gap-4">
                            {!isSubmitted ? (
                                <Button onClick={handleSubmit} disabled={selectedOption === null} className={selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}>
                                    Check Answer
                                </Button>
                            ) : (
                                <Button onClick={handleNext} disabled={currentQIndex === MOCK_QUESTIONS.length - 1}>
                                    {currentQIndex === MOCK_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MCQPage;

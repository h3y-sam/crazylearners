import React from 'react';

export interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export interface MaterialItem {
  id: string;
  title: string;
  type: 'PDF' | 'Book' | 'Formula' | 'Concept';
  subjectId: string;
  description: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface UpdateNotification {
  id: number;
  title: string;
  date: string;
  category: 'Exam' | 'Syllabus' | 'Result' | 'Admit Card';
  isNew: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
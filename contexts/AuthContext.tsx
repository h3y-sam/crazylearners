import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, isDummyKey } from '../services/firebase';
import { onAuthStateChanged, User, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {},
  login: async () => {},
  register: async () => {},
  isDemoMode: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && !isDummyKey) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    } else {
        // Mock Session Restoration
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    if (auth && !isDummyKey) {
        await signInWithEmailAndPassword(auth, email, pass);
    } else {
        // Mock Login
        await new Promise(resolve => setTimeout(resolve, 800)); // Fake delay
        const mockUser = {
            uid: 'mock-user-123',
            email: email,
            displayName: email.split('@')[0],
            emailVerified: true,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: '',
            tenantId: null,
            delete: async () => {},
            getIdToken: async () => '',
            getIdTokenResult: async () => ({} as any),
            reload: async () => {},
            toJSON: () => ({}),
            phoneNumber: null,
            photoURL: null,
        } as unknown as User;
        
        setCurrentUser(mockUser);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
    }
  };

  const register = async (email: string, pass: string, name: string) => {
    if (auth && !isDummyKey) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(userCredential.user, { displayName: name });
    } else {
        // Mock Register
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockUser = {
            uid: 'mock-user-123',
            email: email,
            displayName: name,
            emailVerified: true,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: '',
            tenantId: null,
            delete: async () => {},
            getIdToken: async () => '',
            getIdTokenResult: async () => ({} as any),
            reload: async () => {},
            toJSON: () => ({}),
            phoneNumber: null,
            photoURL: null,
        } as unknown as User;

        setCurrentUser(mockUser);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
    }
  };

  const logout = async () => {
    if (auth && !isDummyKey) {
        await firebaseSignOut(auth);
    } else {
        setCurrentUser(null);
        localStorage.removeItem('mockUser');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout, login, register, isDemoMode: isDummyKey }}>
      {children}
    </AuthContext.Provider>
  );
};
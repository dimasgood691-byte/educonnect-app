import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Inisialisasi user dari localStorage saat pertama kali aplikasi di-load
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('edu_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                // Mock default user (Role Guru) jika belum ada data login
                const defaultUser = {
                    name: 'Felix',
                    email: 'felix@educonnect.id',
                    role: 'teacher', // Ubah ke 'student' atau 'teacher' untuk pengujian
                };
                setUser(defaultUser);
                localStorage.setItem('edu_user', JSON.stringify(defaultUser));
            }
        } catch (error) {
            console.error('Error reading auth state:', error);
            localStorage.removeItem('edu_user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (userData, password, role) => {
        let nextUser;

        if (typeof userData === 'object' && userData !== null) {
            nextUser = userData;
        } else {
            const email = userData;
            const name = email?.split('@')[0] || 'User';
            nextUser = {
                name,
                email,
                role: role || 'student',
            };
        }

        setUser(nextUser);
        localStorage.setItem('edu_user', JSON.stringify(nextUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('edu_user');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
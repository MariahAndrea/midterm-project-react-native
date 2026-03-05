import React, { useState, createContext, ReactNode, useContext } from 'react';

export interface Job {
    id: string;
    title: string;
    companyName: string;
    jobType: string;
    salary: string;
    workModel: string;
    description: string;
}

interface AppContextType {
    savedJobs: Job[];
    saveJob: ( job : Job ) => void;
    removeJob: ( id : string ) => void;
    isDarkMode: boolean;
    setIsDarkMode: ( val : boolean ) => void;
}

export const AppContext = createContext< AppContextType | undefined >( undefined );

export const JobProvider =({ children } : { children : React.ReactNode }) => {
    const [ savedJobs, setSavedJobs ] = useState<Job[]>([]);
    const [ isDarkMode, setIsDarkMode ] = useState(false);

    const saveJob = ( job : Job ) => {
        // checks for duplicates
        if (!savedJobs.find((j) => j.id === job.id )) {
            setSavedJobs([...savedJobs, job]);
        }
    };

    const removeJob = ( id : string ) => {
        setSavedJobs(savedJobs.filter((job) => job.id !== id));
    };

    return (
        <AppContext.Provider value={{ savedJobs, saveJob, removeJob, isDarkMode, setIsDarkMode }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within a JobProvider');
    }
    return context;
};
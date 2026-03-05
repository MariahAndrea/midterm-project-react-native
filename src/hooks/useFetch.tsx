import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { Job } from '../context/AppContext'

export const useFetch = () => {
    const [ jobs, setJobs ] = useState<Job[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch('https://empllo.com/api/v1')
        .then(res => res.json())
        .then(data => {
            const jobData = Array.isArray(data) ? data : (data.jobs || []);
            const formatted = jobData.map((j: any) => ({
            ...j,
            id: uuidv4(),
            title: j.title || j.job_title || "Untitled Job",
            company: j.company || j.company_name || "Unknown Company"
        }));
            setJobs(formatted);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);
    return { jobs, loading };
};

'use client'
import { useState, useEffect } from 'react';
import Comment from '@/components/Comment';
import styles from '../../../styles/HousemaidPage.module.css';

export default function HousemaidPage({ params }: { params: { id: string } }) {
    const [housemaid, setHousemaid] = useState<any>(null);

    useEffect(() => {
        // Fetch housemaid details here
        // For now, we'll use placeholder data
        setHousemaid({
            name: 'Nguyễn Thị Lục',
            age: 48,
            experience: '5 years',
            specialties: ['Cleaning', 'Cooking', 'Childcare']
        });
    }, [params.id]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Housemaid Details</h1>
            {housemaid ? (
                <div className={styles.detailsCard}>
                    
                    <h2 className={styles.name}>{housemaid.name}</h2>
                    <p>Age: {housemaid.age}</p>
                    <p>Experience: {housemaid.experience}</p>
                    <div className={styles.specialties}>
                        <h3>Specialties:</h3>
                        <ul>
                            {housemaid.specialties.map((specialty: string, index: number) => (
                                <li key={index}>{specialty}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading housemaid details...</p>
            )}
            <div className={styles.commentSection}>
                <h2>Comments</h2>
                <Comment housemaidId={params.id} />
            </div>
        </div>
    )
}
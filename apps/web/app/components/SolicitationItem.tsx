import React from "react";
import styles from "./solicitation-item.module.css";
import { useRouter } from "next/navigation";
import { SolicitationData } from "app/utils/trpc";

export default function SolicitationItem({ solicitation }: { solicitation: SolicitationData }) {
    const router = useRouter();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string | null) => {
        switch (status) {
            case 'open': return styles.statusOpen;
            case 'closed': return styles.statusClosed;
            case 'future': return styles.statusFuture;
            default: return styles.statusDefault;
        }
    };

    return (
        <div className={styles.card} onClick={() => router.push(`solicitation/${solicitation.id}`)}>
            <div className={styles.header}>
                <div className={styles.agency}>
                    {solicitation.agency}
                </div>
                <div className={`${styles.status} ${getStatusColor(solicitation.currentStatus)}`}>
                    {solicitation.currentStatus || 'N/A'}
                </div>
            </div>
            
            <h3 className={styles.title}>
                {solicitation.solicitationTitle}
            </h3>
            
            <div className={styles.metadata}>
                <div className={styles.programPhase}>
                    <span className={styles.program}>{solicitation.program}</span>
                    {solicitation.phase !== "BOTH" && (
                        <span className={styles.phase}>{solicitation.phase}</span>
                    )}
                </div>
                
                <div className={styles.dates}>
                    <div className={styles.dateItem}>
                        <span className={styles.dateLabel}>Open:</span>
                        <span className={styles.dateValue}>{formatDate(solicitation.openDate)}</span>
                    </div>
                    <div className={styles.dateItem}>
                        <span className={styles.dateLabel}>Close:</span>
                        <span className={styles.dateValue}>{formatDate(solicitation.closeDate)}</span>
                    </div>
                </div>
            </div>
            
            {solicitation.solicitationNumber && (
                <div className={styles.solicitationNumber}>
                    #{solicitation.solicitationNumber}
                </div>
            )}
        </div>
    );
}
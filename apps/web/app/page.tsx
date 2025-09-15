"use client"

import styles from "./page.module.css";
import { trpc } from "./utils/trpc";
import SolicitationItem from "./components/SolicitationItem";
import { useMemo, useState, useEffect } from "react";

export default function Home() {
    const { data, isLoading, error } = trpc.solicitations.listSolicitations.useQuery();
	const [searchTerm, setSearchTerm] = useState("");
	
    useEffect(() => {
        document.title = "SBIR Solicitation Viewer"
    });

	// Filter solicitations based on search term
	const filteredSolicitations = useMemo(() => {
		if (!data || !searchTerm.trim()) {
			return data || [];
		}
		
		const searchLower = searchTerm.toLowerCase();
		return data.filter((solicitation) => {
			return (
				solicitation.solicitationTitle.toLowerCase().includes(searchLower) ||
				solicitation.agency.toLowerCase().includes(searchLower) ||
				solicitation.program.toLowerCase().includes(searchLower) ||
				(solicitation.phase !== "BOTH" && solicitation.phase.toLowerCase().includes(searchLower)) ||
				(solicitation.solicitationNumber && solicitation.solicitationNumber.toLowerCase().includes(searchLower)) ||
				(solicitation.branch && solicitation.branch.toLowerCase().includes(searchLower))
			);
		});
	}, [data, searchTerm]);
	return (
       <>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search solicitations by title, agency, program, phase, or number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        className={styles.clearButton}
                    >×</button>
                )}
            </div>

            {isLoading && (
                <div className={styles.loader}></div>
            )}

            {error && (
                <div className={styles.error}>
                    <p>Error loading solicitations: {error.message}</p>
                </div>
            )}

            {!isLoading && !filteredSolicitations.length && (
                <div className={styles.noSolicitations}>No Solicitations to Show</div>
            )}

            {filteredSolicitations.map((solicitation) => (
                <SolicitationItem
                    key={solicitation.id || solicitation.solicitationTitle}
                    solicitation={solicitation}
                />
            ))}
        </>
	);
}

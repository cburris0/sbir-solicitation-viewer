"use client"

import styles from "./page.module.css";
import { Header } from "./components/Header";
import { trpc } from "./utils/trpc";
import SolicitationItem from "./components/SolicitationItem";
import { useMemo, useState } from "react";
import { Solicitation } from "./interfaces/Solicitation";

export default function Home() {
	const { data, isLoading, error } = trpc.solicitations.listSolicitations.useQuery();
	const [searchTerm, setSearchTerm] = useState("");
	
	// Filter solicitations based on search term
	const filteredSolicitations = useMemo(() => {
		if (!data?.solicitations || !searchTerm.trim()) {
			return data?.solicitations || [];
		}
		
		const searchLower = searchTerm.toLowerCase();
		return data.solicitations.filter((solicitation: Solicitation) => {
			return (
				solicitation.solicitationTitle.toLowerCase().includes(searchLower) ||
				solicitation.agency.toLowerCase().includes(searchLower) ||
				solicitation.program.toLowerCase().includes(searchLower) ||
				(solicitation.phase !== "BOTH" && solicitation.phase.toLowerCase().includes(searchLower)) ||
				(solicitation.solicitationNumber && solicitation.solicitationNumber.toLowerCase().includes(searchLower)) ||
				(solicitation.branch && solicitation.branch.toLowerCase().includes(searchLower))
			);
		});
	}, [data?.solicitations, searchTerm]);
	return (
		<div className={styles.page}>
			<Header title="SBIR Solicitations" />

			<main className={styles.main}>
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
					<div className={styles.loader}>
					</div>
				)}

				{error && (
					<div className={styles.error}>
						<p>Error loading solicitations: {error.message}</p>
					</div>
				)}
				{!isLoading && !filteredSolicitations.length && (
					<div className={styles.noSolicitations}>No Solicitations to Show</div>
				)}
				{filteredSolicitations.map((solicitation: Solicitation) => (
					<SolicitationItem
						key={solicitation.id || solicitation.solicitationTitle}
						solicitation={solicitation}
					/>
				))}
			</main>
		</div>
	);
}

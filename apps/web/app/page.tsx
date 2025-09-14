"use client"

import styles from "./page.module.css";
import SolicitationsTable from "./components/SolicitationsTable";
import { Header } from "./components/Header";
import { trpc } from "./utils/trpc";

export default function Home() {
	const { data, isLoading, error } = trpc.solicitations.listSolicitations.useQuery();
	console.log(data)

	return (
		<div className={styles.page}>
			<Header title="SBIR Solicitations"/>

			<main className={styles.main}>
				<SolicitationsTable
					solicitations={data?.solicitations || []}
					isLoading={isLoading}
				/>

			</main>
		</div>
	);
}

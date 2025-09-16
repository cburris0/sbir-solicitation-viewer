"use client";

import { trpc } from "app/utils/trpc";
import { use } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function SolicitationPage({ params }: { params: Promise<{ id: string }> }) {
	const router = useRouter();
	const { id } = use(params);
	const { data: solicitation, isLoading, error } = trpc.solicitations.get.useQuery({ id: id });

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	if (isLoading) {
		return <div className={styles.loader}></div>;
	}

	if (error) {
		return (
			<div className={styles.error}>
				<p>Error loading solicitation: {error.message}</p>
				<div className={styles.backButton} onClick={() => router.push("/")}>
					<img src="/arrow-left.svg" />
					Back to Solicitations
				</div>
			</div>
		);
	}

	if (!solicitation) {
		return (
			<div className={styles.notFound}>
				<p>Solicitation not found</p>
				<div className={styles.backButton} onClick={() => router.push("/")}>
					<img src="/arrow-left.svg" />
					Back to Solicitations
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.backButton} onClick={() => router.push("/")}>
				<img src="/arrow-left.svg" />
				Back to Solicitations
			</div>

			{/* Main Solicitation Info */}
			<div className={styles.solicitationHeader}>
				<div className={styles.headerTop}>
					<span className={styles.agency}>{solicitation.agency}</span>
					<span className={`${styles.status} ${styles[`status${solicitation.currentStatus || "Default"}`]}`}>
						{solicitation.currentStatus || "N/A"}
					</span>
				</div>

				<h1 className={styles.title}>{solicitation.solicitationTitle}</h1>

				<div className={styles.metadata}>
					<div className={styles.badges}>
						<span className={styles.program}>{solicitation.program}</span>
						{solicitation.phase !== "BOTH" && <span className={styles.phase}>{solicitation.phase}</span>}
					</div>

					<div className={styles.dates}>
						<div className={styles.dateGroup}>
							<span className={styles.dateLabel}>Open Date:</span>
							<span className={styles.dateValue}>{formatDate(solicitation.openDate)}</span>
						</div>
						<div className={styles.dateGroup}>
							<span className={styles.dateLabel}>Close Date:</span>
							<span className={styles.dateValue}>{formatDate(solicitation.closeDate)}</span>
						</div>
					</div>
				</div>

				{solicitation.solicitationNumber && (
					<div className={styles.solicitationNumber}>Solicitation #{solicitation.solicitationNumber}</div>
				)}
			</div>

			{/* Topic Info */}
			{solicitation.solicitationTopics && solicitation.solicitationTopics.length > 0 && (
				<div className={styles.topicsSection}>
					<h2 className={styles.sectionTitle}>Solicitation Topics</h2>

					{solicitation.solicitationTopics.map((topic, index) => (
						<div key={index} className={styles.topicCard}>
							<div className={styles.topicHeader}>
								<h3 className={styles.topicTitle}>{topic.topicTitle}</h3>
								{topic.topicNumber && <span className={styles.topicNumber}>{topic.topicNumber}</span>}
							</div>

							{topic.branch && (
								<div className={styles.topicBranch}>
									<strong>Branch:</strong> {topic.branch}
								</div>
							)}

							{(topic.topicOpenDate || topic.topicClosedDate) && (
								<div className={styles.topicDates}>
									{topic.topicOpenDate && (
										<div className={styles.dateGroup}>
											<span className={styles.dateLabel}>Topic Open:</span>
											<span className={styles.dateValue}>{formatDate(topic.topicOpenDate)}</span>
										</div>
									)}
									{topic.topicClosedDate && (
										<div className={styles.dateGroup}>
											<span className={styles.dateLabel}>Topic Close:</span>
											<span className={styles.dateValue}>
												{formatDate(topic.topicClosedDate)}
											</span>
										</div>
									)}
								</div>
							)}

							{topic.topicDescription && (
								<div className={styles.topicDescription}>
									<h4 className={styles.descriptionTitle}>Description</h4>
									<div className={styles.descriptionText}>
										{topic.topicDescription.split("\n\n").map((paragraph, pIndex) => (
											<p key={pIndex}>{paragraph}</p>
										))}
									</div>
								</div>
							)}

							{topic.sbirTopicLink && (
								<div className={styles.topicLink}>
									<a
										href={topic.sbirTopicLink}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.externalLink}
									>
										View Full Topic Details →
									</a>
								</div>
							)}
						</div>
					))}
				</div>
			)}

			{/* Link to Agency */}
			{solicitation.solicitationAgencyUrl && (
				<div className={styles.agencyLink}>
					<a
						href={solicitation.solicitationAgencyUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.externalLink}
					>
						View on Agency Website →
					</a>
				</div>
			)}
		</div>
	);
}

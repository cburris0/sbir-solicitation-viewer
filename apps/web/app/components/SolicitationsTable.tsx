import { Solicitation } from "app/interfaces/Solicitation";
import styles from "./solicitations-table.module.css";

interface SolicitationsTableProps 
{
	solicitations: Solicitation[];
	isLoading?: boolean;
}

export default function SolicitationsTable({ solicitations, isLoading }: SolicitationsTableProps) {
	if (isLoading) {
		return (
			<div className={styles.loader}></div>
		);
	}

	const formatDate = (dateString: string) => {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString();
	};

	const getStatusBadge = (status: string | null) => {
		const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
		switch (status?.toLowerCase()) {
			case 'open':
				return `${baseClasses} bg-green-100 text-green-800`;
			case 'closed':
				return `${baseClasses} bg-red-100 text-red-800`;
			case 'future':
				return `${baseClasses} bg-blue-100 text-blue-800`;
			default:
				return `${baseClasses} bg-gray-100 text-gray-800`;
		}
	};

	return (
		<div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Title
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Number
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Agency
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Program
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Status
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Close Date
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Topics
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{solicitations.map((solicitation) => (
						<tr key={solicitation.id} className="hover:bg-gray-50">
							<td className="px-6 py-4">
								<div className="text-sm text-gray-900 font-medium max-w-xs">
									{solicitation.solicitationTitle}
								</div>
							</td>
							<td className="px-6 py-4 text-sm text-gray-500">
								{solicitation.solicitationNumber || 'N/A'}
							</td>
							<td className="px-6 py-4 text-sm text-gray-900">
								{solicitation.agency}
							</td>
							<td className="px-6 py-4 text-sm text-gray-900">
								<span className="inline-flex items-center">
									{solicitation.program}
									{solicitation.phase && (
										<span className="ml-2 text-xs text-gray-500">
											({solicitation.phase})
										</span>
									)}
								</span>
							</td>
							<td className="px-6 py-4">
								<span className={`${styles.status} ${getStatusBadge(solicitation.currentStatus)}`}>
									{solicitation.currentStatus || 'Unknown'}
								</span>
							</td>
							<td className="px-6 py-4 text-sm text-gray-500">
								{formatDate(solicitation.closeDate)}
							</td>
							<td className="px-6 py-4 text-sm text-gray-500">
								{solicitation.solicitationTopics?.length || 0} { solicitation.solicitationTopics?.length === 1 ? "topic" : "topics" }
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
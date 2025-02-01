import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
	Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator,
} from '@/registry/new-york/ui/breadcrumb';

export default function ProjectBreadcrumb() {
	const {
		company, project, branch, pipeline,
	} = useParams();

	const isProjectPage = !pipeline;

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<Link href={`/${company}/project/list`}>Projects</Link>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{project ? <BreadcrumbItem>{project}</BreadcrumbItem> : null}

				{!isProjectPage ? (
					<>
						<BreadcrumbItem>
							<Link href={`/${company}/projects/${project}/${branch}`}>{project}</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				) : null}
				{/* {pipeline ? (
					<BreadcrumbItem>
						<BreadcrumbPage>pipelines</BreadcrumbPage>
					</BreadcrumbItem>
				) : null} */}

			</BreadcrumbList>
		</Breadcrumb>
	);
}

export type JobType = {
	start: string;
	end: string;
	stage: string;
	status: 'Failed' | 'Pending' | 'Succeeded' | 'Started'
}

export type PipelineType = {
	branch: string;
	commit: string;
	company: string;
	created: string;
	created_by: string;
	id: string;
	jobs: JobType[];
	project: string;
}

export type PipelineRequestParamType = {
	company: string,
	project: string,
	namespace: string,
	pipeline: string,
	application:string
}

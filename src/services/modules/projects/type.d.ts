export type ProjectType = {
	branch: {
		name: string;
		datacenter: Record<string, string>,
	}[];
	project: string;
	namespaces: [{
		name:string
	}];
	status: 'active';
	name:string;
	label:string;
	git_token: {};
	company: string;
	datacenter: Record<string, string>,
	git: {
		url: string;
		dockerfile: string;
		work_directory: string;
		project_type: 'golang';
	},
	dockerfile: string;
	work_directory: string;
	project_type: string;
}

export type ProjectRequestParamType = {
	company: string,
	project: string,
}

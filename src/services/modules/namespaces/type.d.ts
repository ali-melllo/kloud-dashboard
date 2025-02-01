export type NameSpaceType = {
	name: string;
	is_development: boolean;
	disable: boolean;
	datacenter: Record<string, string>;
	branch:string;
	create_data:string;
}

export type NameSpaceRequestParamType = {
	company: string;
	project: string;
	namespace?: string;
	lang?:string;
}

export type DataCenterType = {
	name: string;
	id:string;
	is_development: boolean;
	disable: boolean;
	datacenter: Record<string, string>;
	branch:string;
	create_data:string;
}

export type DataCenterRequestParamType = {
	company: string;
}

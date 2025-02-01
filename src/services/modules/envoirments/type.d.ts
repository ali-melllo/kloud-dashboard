export type ConfigmapType = {
	key: string;
	value: string;
}

export type ConfigmapRequestParamType = {
	company: string;
	project?: string;
	configMap?: string;
	key?: string;
	value?: string;
	namespace:string;
	application:string;
}

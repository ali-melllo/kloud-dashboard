export type PvcType = {
	id:string;
    name:string;
}

export type PvcRequestParamType = {
	company: string;
    project: string;
    namespace: string;
    application?: string;
    body?:any
}

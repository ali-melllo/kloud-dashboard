export type GatewayType = {
	id: string;
    host: string[];
    create: string;
    status: string[];
    backends: string[];
    hostnames:string[];
    filters: string[],
    matches: string[];
    rules:[{
        matches,
        backends,
        filters
    }]
}

export type GatewayRequestParamType = {
	company: string,
	project: string,
	namespace: string,
	gateway: string
}

export type GatewayCreateRequestType = {

}

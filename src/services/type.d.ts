export type ResponseCode = 200;

export type BaseResponses<D> = {
	msg: string;
	data: D;
	code: ResponseCode;
}

export type BaseListResponses<T> = {
	data: T;
	limit: number;
	page: number;
	code: ResponseCode;
	msg: string;
}

export type BaseListRequest<T> = {
	limit?: number;
	offset?: number;
} & T

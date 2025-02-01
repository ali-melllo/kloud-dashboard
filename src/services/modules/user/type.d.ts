export type AuthenticationType = {
	token: string;
}

export type UserRequestParamType = {
	company: string;
    body?:{}
}

export type UserType = AuthenticationType & {
	avatar: string;
	name: string;
	email: string;
	national_code: string;
	economical_number: string;
	address: string;
	post: string;
	mobile: string;
	tel: string;
	company: string;
	active: boolean;
	cash: number
}

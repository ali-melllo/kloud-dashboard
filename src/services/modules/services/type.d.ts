export type ServiceKindType = 'Redis' | 'PostgreSQL' | 'MongoDB' | 'Mysql' | 'RabbitMQ';

export type ServiceType = {
	id: string,
	kloud_crd: {
		apiVersion: string,
		kind: ServiceKindType,
		metadata: {
			creationTimestamp: string,
			generation: 1,
			name: string,
			labels: {
				'team.kloud.crd.kind': ServiceKindType;
				'team.kloud.crd.name': string;
				'team.kloud.crd.product': string;
			}
		},
		spec: {},
		status: {
			ready: 'True' | 'False',
			state: 'Ready'
		}
	},
};

export type MetaServiceItemType = {
	id: string;
	label: string;
	name: string;
	version: string;
	type: string;
	description:string;
	wizard_steps: [{
		title: string;
		description_long:string;
		fields: [{
			name: string,
			label: string,
			default: {},
			description: string,
			placeholder: string,
			type: 'string' | 'dropdown' | 'number' | 'tag' | 'password'
			values: [],
			rules: {},
			required: false
		}]
	}]
}

export type ServiceRequestParamType = {
	company: string;
	project: string;
	namespace: string;
	service: string;
	body?: {}
}

export type MetaServiceRequestParamType = {
	company: string;
	project: string;
	namespace: string;
}

export type ApplicationFileItemType = {
	group?: string;
	link?: string;
	mode: string;
	modified: string;
	name: string;
	owner: string;
	size: number;
	type: string;
}

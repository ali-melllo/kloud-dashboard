/* eslint-disable key-spacing */
export interface ApiEndpointItem {
	/*
		endpoint of the api
	*/
	url: string;

	/*
		http method of the api
	*/
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

	/*
		should we add authentication token to the api ?
		value is considered as false if omitted
	*/
	escapeAuthToken?: boolean;

	/*
		most requests are in form of json
	*/
	isJson?: boolean;

	/*
		instead of getting data from the server, getting it from the local mock data provider
	*/
	useMockData?: boolean;

	headerMetadata?: Record<string, string | number>,
}

export const apiDefaultConfig = {
	url: '',
	method: 'GET',
	escapeAuthToken: false,
	useMockData: false,
	isJson: true,
	headerMetadata: {
		'Content-Type': 'application/json',
	},
} satisfies ApiEndpointItem;

export const apiEndpoints = {
	token: { url: '/token/', method: 'POST' },
	register: { url: '/register/', method: 'POST' },

	listProject: { url: '/project/:company/', method: 'GET' },
	viewProject: { url: '/project/:company/:project', method: 'GET' },
	createProject: { url: '/project/:company/:project', method: 'POST' },
	deleteProject: { url: '/project/:company/:project', method: 'DELETE' },

	listNamespace: { url: '/namespace/:company/:project', method: 'GET' },
	createNamespace: { url: '/namespace/:company/:project', method: 'POST' },
	deleteNamespace: { url: '/namespace/:company/:project/:namespace', method: 'DELETE' },

	listGateway: { url: '/gateway/:company/:project/:branch', method: 'GET' },
	createGateway: { url: '/gateway/:company/:project/:branch', method: 'POST' },
	viewGateway: { url: '/gateway/:company/:project/:branch/:gateway', method: 'GET' },
	updateGateway: { url: '/gateway/:company/:project/:branch/:gateway', method: 'PATCH' },
	deleteGateway: { url: '/gateway/:company/:project/:branch/:gateway', method: 'DELETE' },

	listPipeline: { url: '/pipelines/:company/:project/:branch', method: 'GET' },
	viewPipeline: { url: '/pipelines/:company/:project/:branch/:pipeline', method: 'GET' },
	logPipeline: { url: '/pipelines/:company/:project/:branch/:pipeline/:stage/logs', method: 'GET' },

	listApplication: { url: '/application/:company/:project/:branch', method: 'GET' },
	viewApplication: { url: '/application/:company/:project/:branch/:application', method: 'GET' },
	startApplication: { url: '/application/:company/:project/:branch/:application/start', method: 'POST' },
	stopApplication: { url: '/application/:company/:project/:branch/:application/stop', method: 'POST' },
	logApplication: { url: '/application/:company/:project/:branch/:application/:container/logs', method: 'GET' }, // WAIT FOR SERVER

	listService: { url: '/service/:company/:project/:branch', method: 'GET' },
	createService: { url: '/service/:company/:project/:branch', method: 'POST' },
	metaService: { url: '/service/:company/:project/:branch/meta', method: 'GET' },
	viewService: { url: '/service/:company/:project/:branch/:service', method: 'GET' },
	deleteService: { url: '/service/:company/:project/:branch/:service', method: 'DELETE' },
	startService: { url: '/service/:company/:project/:branch/:service/start', method: 'POST' },
	stopService: { url: '/service/:company/:project/:branch/:service/stop', method: 'POST' },

	listConfigMap: { url: '/configmap/:company/:project/:branch', method: 'GET' },
	createConfigMap: { url: '/configmap/:company/:project/:namespace/:application', method: 'POST' },
	updateConfigMap: { url: '/configmap/:company/:project/:branch/:configmap', method: 'PATCH' }, // LOGIC ERROR
	deleteConfigMap: { url: '/configmap/:company/:project/:namespace/:application/:configmap', method: 'DELETE' }, // SERVER will not remove this row

} satisfies Record<string, ApiEndpointItem>;

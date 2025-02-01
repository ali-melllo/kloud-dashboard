export type ApplicationType = {
	metadata: {
		name: string;
		uid: string;
		resourceVersion: string;
		generation: number;
		creationTimestamp: string;
	};
	status: {
		observedGeneration?: number;
		replicas?: number,
		updatedReplicas?: number,
		readyReplicas?: number,
		availableReplicas?: number,

		conditions: {
			type: 'Available' | 'Progressing';
			status: 'True' | 'False';
			lastUpdateTime: string,
			lastTransitionTime: string,
			reason: 'MinimumReplicasAvailable' | 'NewReplicaSetAvailable',
			message: string;
		}[]
	},
	running: boolean,
	meta_service: {
		clusterIP: string,
		ports: [{
			targetPort: string,
			port: string
		}]
	},
	meta_deployment: {
		replicas: string,
		status: {
			conditions: [{
				type: string,
				status: string
			}]
		}
	},
	meta_statefulSet: {
		status: {
			replicas: string,
			availableReplicas: string
		}
	},
	meta_pods: [{
        name: string,
		nodeName: string,
		restartPolicy: string
		containers: [{
			name:string;
		}]
	}]
	type : string;
};

export type ApplicationListType = {
	applications: [{
			spec_port?: number,
			spec_replicas?: number,
			git_url?: string,
			git_dockerfile?: string,
			git_user?: string,
			git_secret?: string,
			id: string,
			create_date: string,
			name: string,
			type: string,
			meta_id?: string,
			running: boolean,
			spec?:{
				git:{
					branch:string;
					url:string;
				},
				deployment:{
					limitRam:string;
					limitCPU:string;
					replicas:string;
				}
			}
			template_id?:string
	}],

}

export type ApplicationRequestParamType = {
	company: string;
	project: string;
	namespace: string;
	application: string;
	body?: {
		name : string;
	}
}

export type ApplicationFilesRequestParamType = {
	company: string;
	project: string;
	namespace: string;
	application: string;
	meta:string;
	container:string;
	body?: any
}

export type ApplicationInstallRequestParamType = {
	company: string;
	project: string;
	namespace: string;
	application: string;
    data ?: { };
	yb_name: string;
	yb_template_id: string;
	body?: {
		name : string;
	}
}

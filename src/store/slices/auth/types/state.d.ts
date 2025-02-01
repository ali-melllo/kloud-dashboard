export type AuthStateType = {
	tokens: {
		access: string;
		refresh: string;
	};
	loginCompleted: boolean;
};

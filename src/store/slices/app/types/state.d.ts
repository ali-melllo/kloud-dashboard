import { RehydrateAction } from 'redux-persist';

export type AppStateType = {
   application:{
      type?:string;
      running?:boolean;
      id?:string;
   }
   uploadFileMeta:{
      meta : string;
		container:string;
      fileNamePath:string;
      fileName?:string;
      refetch?:boolean;
      data?:any;
   }
};

export type AppRehydrateAction = RehydrateAction & {
	payload: { app: AppStateType } ;
};

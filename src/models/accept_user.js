import {
  getaccept,
  getacceptuser,
  postaccept,
  getmessage,
  postmessage,
  postprogress,
  getaccept_deatil,
  getfiles,
  queren,
} from '@/services/accept_user';

export default {
  namespace: 'accept_user',

  state: {
    accept: [],
    dialogues:[],
    progress:[],
    isaccept:false,
    valueac:'',
  },
  effects: {
    * getaccept({ payload,callback }, { call, put }) {
      const response = yield call(getaccept, payload);
      if (callback) callback(response);
      yield put({
        type: 'acceptListHandle',
        payload: response,
      });
    },
    * accept_user({ payload ,callback }, { call, put }) {
      const response = yield call(getacceptuser, payload);
      if (callback) callback(response);
    },
    * postaccept({ payload ,callback }, { call, put }) {
      const response = yield call(postaccept, payload);
      if (callback) callback(response);
    },
    * getmessage({ payload }, { call, put }) {
      const response = yield call(getmessage, payload);
      yield put({
        type: 'messageListHandle',
        payload: response,
      });
    },
    * queren({ payload,callback }, { call, put }) {
      const response = yield call(queren, payload);
      if (callback) callback(response);
    },
    * postmessage({ payload ,callback }, { call, put }) {
      const response = yield call(postmessage, payload);
      if (callback) callback(response);
    },
    * postprogress({ payload ,callback }, { call, put }) {
      const response = yield call(postprogress, payload);
      if (callback) callback(response);
    },
    * putprogress({ payload ,callback }, { call, put }) {
      const response = yield call(postprogress, payload);
      if (callback) callback(response);
      yield put({
        type:'progressHandle',
        payload:response,
      });
    },
    * getaccept_detail({ payload ,callback }, { call, put }) {
      const response = yield call(getaccept_deatil, payload);
      if (callback) callback(response);
    },
    * getfiles({ payload ,callback }, { call, put }) {
      const response = yield call(getfiles, payload);
      if (callback) callback(response);
    },

  },

  reducers: {
    acceptListHandle(state, { payload }) {
      return {
        ...state,
        accept: payload.data.accepts,
      };
    },
    querensave(state, { payload }) {
      if(payload) {
        let List = payload.filter((item) => item.progress >0);
        if(List.length !==0) {
          return {
            ...state,
            isaccept:true,
            value:List[0].user.nickname,
          };
        }
        else {return {...state}}
      }
      return {...state}
    },
    messageListHandle(state, { payload }) {
      return {
        ...state,
        dialogues: payload.data.dialogues,

      };
    },
    progressHandle(state, { payload }) {
      if(payload.data.accept) {
        let List = state.progress.filter((item) => item.id !== payload.data.accept.id);
        console.log(List)
        return {
          ...state,
          progress: [...List, payload.data.accept],
        };
      }
    },
  },
};

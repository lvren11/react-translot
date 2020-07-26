import {
  changepassword,
  changeother,
  inform,
  getuser,
} from '@/services/center';



export default {
  namespace: 'center',

  state: {
    selfinform:[],
    systeminform:[],
    notifications:[],
    userinfo:{}
  },
  effects: {
    * changepassword({ payload,callback }, { call, put }) {
      const response = yield call(changepassword, payload);
      if (callback) callback(response);
    },
    * changeother({ payload,callback }, { call, put }) {
      const response = yield call(changeother, payload);
      if (callback) callback(response);
    },
    * getuser({ payload,callback }, { call, put }) {
      const response = yield call(getuser, payload);
      if (callback) callback(response);
      yield put({
        type: 'userHandle',
        payload: response,
      });
    },
    * inform({ payload,callback },{ call, put }) {
      const response = yield call(inform,payload);
      yield put({
        type: 'informHandle',
        payload: response,
      });
    },
  },
  reducers: {
    informHandle(state, { payload }) {
      return  {
        ...state,
        selfinform: payload.data.notices ? [...payload.data.notices] : [],
        notifications:payload.data.notices ? [...payload.data.notices.slice(0,4)] : []
      };
    },
    allNotificationsRead(state) {
      return {
        ...state,
        notifications : [],
      };
    },
    userHandle(state, { payload }) {
      return  {
        ...state,
        userinfo: payload.data.user,
      };
    },
  }
};

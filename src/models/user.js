import {
  postGetLogin,
  postRegister,
  postcheck,
  postavatar,
} from '@/services/user';

export default {
  namespace: 'user',

  state: {
    user: {},
    register: {},
  },

  effects: {
    * login({ payload, callback }, { call, put }) {
      const response = yield call(postGetLogin, payload);
      if (callback) callback(response);
    },
    * register({ payload, callback }, { call, put }) {
      const response = yield call(postRegister, payload);
      if (callback) callback(response);
    },
    * check({ payload, callback }, { call, put }) {
      const response = yield call(postcheck, payload);
      if (callback) callback(response);
    },
    * avatar({ payload, callback }, { call, put }) {
      const response = yield call(postavatar, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    userinfoHandle(state, { payload }) {
      return {
        user: payload,
      };
    },
    saveUser(state, { payload }) {
      return {
        ...state,
        user: payload.user,
      };
    },
    clearUser(state) {
      return {
        ...state,
        user: {},
      };
    },
  },
};

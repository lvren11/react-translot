import {
  getArticleList,
  getArticleDetail,
  getselfArticleList,
  postArticleComment,
  getArticleComment,
  getHotArticle,
  getCategory,
  postarticle,
  getCategoryarticle,
  postfiles,
  postlike,
  postunlike,
  getserch,
  getsort,
  doarticle,
  deletearticle,
  getselfcomment,
  deletecomment,
  docomment,
} from '@/services/article';


export default {
  namespace: 'article',

  state: {
    article: {},
    selfarticleList:[],
    articleList: [],
    hotList: [],
    comments: [],
    categorys: [],
    publish:[],
    category_List:[],
    search_List:[],
    sort_List:[],
    islike:false,
    like_count:-1,
    isEmptyList: false,
    selfcomments:[],
  },

  effects: {
    * articleList({ payload,callback }, { call, put }) {
      const response = yield call(getArticleList, payload);
      if (callback) callback(response);
      yield put({
        type: 'articleListHandle',
        payload: response,
      });
    },
    * articleDetail({ payload }, { call, put }) {
      const response = yield call(getArticleDetail, payload);
      yield put({
        type: 'articleDetailHandle',
        payload: response,
      });
    },
    * selfarticle({ payload,callback }, { call, put }) {
      const response = yield call(getselfArticleList, payload);
      if (callback) callback(response);
      yield put({
        type: 'selfarticleHandle',
        payload: response,
      });
    },
    *like({ payload,callback }, { call,put }) {
      const response = yield call(postlike, payload);
      if (callback) callback(response);
      yield put({
        type: 'likeHandle',
        payload: response,
      });
    },
    *unlike({ payload,callback }, { call,put }) {
      const response = yield call(postunlike, payload);
      if (callback) callback(response);
      yield put({
        type: 'unlikeHandle',
        payload: response,
      });
    },
    * comment({ payload, callback }, { call, put }) {
      const response = yield call(postArticleComment, payload);
      if (callback) callback(response);
    },
    * selfcomment({ payload,callback }, { call, put }) {
      const response = yield call(getselfcomment, payload);
      if (callback) callback(response);
      yield put({
        type: 'selfcommentHandle',
        payload: response,
      });
    },
    * doarticle({ payload, callback }, { call, put }) {
      const response = yield call(doarticle, payload);
      if (callback) callback(response);
    },
    * deletearticle({ payload, callback }, { call, put }) {
      const response = yield call(deletearticle, payload);
      if (callback) callback(response);
    },
    * docomment({ payload, callback }, { call, put }) {
      const response = yield call(docomment, payload);
      if (callback) callback(response);
    },
    * deletecomment({ payload, callback }, { call, put }) {
      const response = yield call(deletecomment, payload);
      if (callback) callback(response);
    },
    * commentList({ payload }, { call, put }) {
      const response = yield call(getArticleComment, payload);
      yield put({
        type: 'commentListHandle',
        payload: response,
      });
    },
    * hot({ payload }, { call, put }) {
      const response = yield call(getHotArticle, payload);
      yield put({
        type: 'hotHandle',
        payload: response,
      });
    },
    * category({ payload }, { call, put }) {
      const response = yield call(getCategory, payload);
      yield put({
        type: 'categoryHandle',
        payload: response,
      });
    },
    * publish({ payload, callback }, { call, put }) {
      const response = yield call(postarticle, payload);
      if (callback) callback(response);
      },
    * upload({ payload, callback }, { call, put }) {
      const response = yield call(postfiles, payload);
      if (callback) callback(response);
    },
    * category_List({ payload,callback }, { call, put }) {
      const response = yield call(getCategoryarticle, payload);
      yield put({
        type: 'categoryListHandle',
        payload: response,
      });
    },
    * search_List({ payload,callback }, { call, put }) {
      const response = yield call(getserch, payload);
      if (callback) callback(response);
      yield put({
        type: 'searchListHandle',
        payload: response,
      });
    },
    * sort_List({ payload,callback }, { call, put }) {
      const response = yield call(getsort, payload);
      if (callback) callback(response);
      yield put({
        type: 'sortListHandle',
        payload: response,
      });
    },
  },

  reducers: {
    articleListHandle(state, { payload }) {
      return {
        ...state,
        articleList: payload.data.posts ? [...payload.data.posts] : [],
        isEmptyList: payload.data.posts && payload.data.length === 0,
      };
    },
    articleDetailHandle(state, { payload }) {
      return {
        ...state,
        article: payload.data.posts[0] ? payload.data.posts[0] : {},
        isLike:  payload.data.posts[0].liked,
        like_count:payload.data.posts[0].like_count,
      };
    },
    selfarticleHandle(state, { payload }) {
      return  {
        ...state,
        selfarticleList: payload.data.posts ? [...payload.data.posts] : [],
      };
    },
    selfcommentHandle(state, { payload }) {
      return  {
        ...state,
        selfcomments: payload.data.comments ? [...payload.data.comments] : [],
      };
    },
    commentHandle(state, { payload }) {
      return {
        ...state,
        comments: [payload, ...state.comments],
      };
    },
    commentListHandle(state, { payload }) {
      return {
        ...state,
        comments:payload.data ? [...payload.data.comments]:[],
      };
    },
    likeHandle(state, { payload }) {
      return {
        ...state,
        isLike: true,
        like_count:state.like_count+1,
      };
    },
    unlikeHandle(state, { payload }) {
      return {
        ...state,
        isLike: false,
        like_count:state.like_count-1,
      };
    },
    hotHandle(state, { payload }) {
      return {
        ...state,
        hotList: payload.data.posts ? payload.data.posts.slice(0,7) : [],
      };
    },
    categoryHandle(state, { payload }) {
      return {
        ...state,
        categorys: payload.data.posts ? payload.data.posts : [],
      };
    },
    categoryListHandle(state, { payload }) {
      return  {
        ...state,
        category_List: payload.data.posts ? [...payload.data.posts] : [],
      };
    },
    searchListHandle(state, { payload }) {
      return  {
        ...state,
        search_List: payload.data.posts ? [...payload.data.posts] : [],
      };
    },
    sortListHandle(state, { payload }) {
      return  {
        ...state,
        sort_List: payload.data.posts ? [...payload.data.posts] : [],
      };
    },
  },
};

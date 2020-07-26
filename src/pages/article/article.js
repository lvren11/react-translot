
import React, { Component } from 'react';
import {
  Col,
  List,
  Row,
  Card,
  Icon,
  Tooltip,
  Avatar,
  Divider,
  Tag,
} from 'antd';
import { ThumbsUp } from 'react-feather';
import Link from 'umi/link';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import moment from 'moment';
import marked from 'marked';

// import hljs from 'highlight.js';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import less from 'highlight.js/lib/languages/less';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import php from 'highlight.js/lib/languages/php';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import cpp from 'highlight.js/lib/languages/cpp';
import nginx from 'highlight.js/lib/languages/nginx';
import shell from 'highlight.js/lib/languages/shell';



import AddComment from '../../components/Comment';
import Step_accept from '@/components/common/Step_accept/Step_accept';

import './article.less';
import './markdown-github.css';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-dark.css';

import storageHelper from '@/utils/storage';
import UserAvatar from '@/components/UserAvatar';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('less', less);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('php', php);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('shell', shell);



marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});

const createMarkup = (body) => {
  return { __html: body };
};

@connect(({ user,article, loading }) => ({
  user,article, loading: loading.effects['article/articleDetail'],
}))
class Article extends Component {
  state={
    isLike:false,
  }
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch({
      type: 'article/articleDetail',
      payload: {
        pid: id,
      },
    });
    dispatch({
      type: 'article/hot',
      payload:{
        len:50,
        sortby:'view',
        sort:'desc',
      },
    });
  }

  handleLike=(id,isLike,event) => {
      const {dispatch} = this.props;
      if(!isLike) {
        dispatch({
          type: 'article/like',
          payload: {
            post_id: parseInt(id),
          },
        })
      }else{
        dispatch({
          type: 'article/unlike',
          payload: {
            post_id: parseInt(id),
          },
        })
      }
  }

  render () {
    const {
      article: { article, hotList,isLike,like_count },user:{user},
      match: { params: { id } }, loading } = this.props;
    if (!article) {
      return <Redirect to="/404" />;
    }
     // const markdownHtml = marked(article.content_mark || '');//如果文章内容是markdown，先转换
    const markdownHtml = article.content || '';
    return (
      <div style={{ marginTop: '1.5rem' }}>
        <Row type="flex" justify="center">
          <Col md={16} sm={20} xs={23}>
            <Row type="flex" justify="space-around">
              <Col lg={17} sm={22} xs={24}>
                <Card
                  bordered={false}
                  loading={loading}
                  style={{ padding: '1rem' }}
                >
                  <div className="article-content-main">
                    { (user.id && (user.id !== article.user_id) ) ?
                      (<Step_accept post_id={article.id} disable={false}/>)
                      :(<Step_accept post_id={article.id} disable={true}/>)
                    }
                    <div className="py-3">
                      <div className="mmb-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex' }}>
                          { article && article.user && article.user.avatar
                            && <UserAvatar src={article.user.avatar} />
                          }
                          <div className="pl-3">
                            <h4 style={{ marginBottom: 0, fontWeight: 700 }}>
                              {article.user && article.user.nickname}
                            </h4>
                            <small>
                              {moment(article.created_at).format('LL')}
                              <span style={{ marginLeft: 10 }}>{article.view_count}浏览</span>
                            </small>
                          </div>
                        </div>
                      </div>
                      <h2 className="my-4" style={{ fontWeight: 700 }}>{article.title}</h2>
                      <div
                        className="markdown-body"
                        dangerouslySetInnerHTML={createMarkup(markdownHtml)}
                      />
                    </div>
                    <div>
                    {article.files && article.files.map((a)=>(
                      <a href={`api/upload/${a.id}?access_token=${storageHelper.get("x-auth-token")}`} >{a.filename}</a>
                    ))
                    }
                    </div>
                    <Col lg={0} md={0} sm={24} xs={24}>
                      <ThumbsUp color={isLike ? '#007bff' : '#ccc'} onClick={this.handleLike.bind(this,article.id,isLike)} />
                      <div className="article-panel-count">
                      <span style={{marginLeft:'5px'}}>{like_count}</span>
                      </div>
                    </Col>
                  </div>
                </Card>
                <Card
                  title="评论"
                  bordered={false}
                  loading={loading}
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  <AddComment articleId={id} />
                </Card>
              </Col>
              <Col lg={6} sm={0} xs={0}>
                  <Card
                    title="关于作者"
                    bordered={false}
                    size="small"
                    loading={loading}
                  >
                    <div style={{ display: 'flex', marginBottom: 20 }}>
                      { article && article.user && article.user.avatar
                      && <UserAvatar size src={article.user.avatar} />
                      }
                      <div className="pl-3">
                        <h5>{article.user && article.user.nickname}</h5>
                      </div>
                    </div>
                    <Row
                      className="text-center"
                      type="flex"
                      align="middle"
                      justify="space-between"
                    >
                      <Col span={4}>
                        <h2 className="m-0">
                          <b>{article.user && article.user.score}</b>
                        </h2>
                        <small>接受</small>
                      </Col>
                      <Col span={4}>
                        <h2 className="m-0">
                          <b>{article.user && article.user.like_post_count}</b>
                        </h2>
                        <small>点赞</small>
                      </Col>
                      {article.tags && article.tags.map((item) =>{
                        return(
                          <Col span={8}>
                            <Tag color="magenta">{item.tag_name}</Tag>
                            <small>标签</small>
                          </Col>
                        )
                      })}
                    </Row>
                  <Divider dashed style={{ marginBottom: 0 }} />
                  <div style={{ marginLeft: 10, fontSize: 16, marginTop: 10 }}>
                    <Tooltip title={article.user && article.user.phone}>
                      <a href="#" style={{ marginRight: 10 }}><Icon type="phone" /></a>
                    </Tooltip>
                    <Tooltip title={article.user && article.user.email}>
                      <a href="#" style={{ marginRight: 10 }}><Icon type="message" /></a>
                    </Tooltip>
                  </div>
                </Card>
                <Card
                  title="近期热门需求"
                  size="small"
                  bordered={false}
                  loading={loading}
                  style={{ marginTop: 20 }}
                >
                  <List
                    dataSource={hotList}
                    bordered={false}
                    size="small"
                    split={false}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <span>
                            <Icon
                              type="eye"
                              theme="outlined"
                            />
                            <span style={{ paddingLeft: 2, cursor: 'auto' }}>{item.view_count}</span>
                          </span>,
                        ]}
                      >
                        <UserAvatar size='small' src={item.user && item.user.avatar}/>
                        <Link to={`/article/${item.article_id}`} target="_block" style={{ color: '#000000a6' }}>{item.title}</Link>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
            <div className="article-panel">
              <div className="article-panel-item">
                <div className="article-panel-icon">
                  <ThumbsUp color={isLike ? '#007bff' : '#ccc'} onClick={this.handleLike.bind(this,article.id,isLike)} />
                </div>
                <div className="article-panel-count">
                  <span>{like_count}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Article;

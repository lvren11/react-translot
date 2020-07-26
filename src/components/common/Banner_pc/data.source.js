import React from 'react';
import word from '../../../assets/images/word.png';
export const Banner11DataSource = {
  wrapper: { className: 'banner1 k9s3iwudmaq-editor_css' },
  BannerAnim: {
    children: [
      {
        name: 'elem0',
        BannerElement: { className: 'banner-user-elem' },
        textWrapper: { className: 'banner1-text-wrapper' },
        bg: { className: 'bg bg0 k75v8y2qe9-editor_css' },
        title: {
          className: 'banner1-title',
          children: (
            <span>
              <span>
                <p>Translot</p>
              </span>
            </span>
          ),
        },
        content: {
          className: 'banner1-content k75v88zd6b-editor_css',
          children: <p>一个可以解决你需求的平台</p>,
        },
        button: { className: 'banner1-button', children: '了解更多' },
      },
      {
        name: 'elem1',
        BannerElement: { className: 'banner-user-elem' },
        textWrapper: { className: 'banner1-text-wrapper' },
        bg: { className: 'bg bg1' },
        title: {
          className: 'banner1-title',
          children:(<span>
              <span>
                <p>Translot</p>
              </span>
            </span>),
        },
        content: {
          className: 'banner1-content',
          children: <p>一个可以满足你帮助别人的平台</p>,
        },
        button: { className: 'banner1-button', children: '了解更多' },
      },
      {
        name: 'elem2',
        BannerElement: { className: 'banner-user-elem' },
        textWrapper: { className: 'banner1-text-wrapper' },
        bg: { className: 'bg bg1' },
        title: {
          className: 'banner1-title',
          children:(
            <span>
              <span>
                <p>Translot</p>
              </span>
            </span>
          )
        },
        content: {
          className: 'banner1-content',
          children: <p>一个可以提升自己的平台</p>,
        },
        button: { className: 'banner1-button', children: '了解更多' },
      },
    ],
  },
};
export const Feature51DataSource = {
  wrapper: { className: 'home-page-wrapper content7-wrapper' },
  page: { className: 'home-page content7' },
  OverPack: {},
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <span>
              <p>Translot使用流程</p>
            </span>
          </span>
        ),
        className: 'title-h1',
      },
      {
        name: 'content',
        children: (
          <span>
            <span>
              <p>需求互助平台主要功能简单介绍</p>
            </span>
          </span>
        ),
      },
    ],
  },
  tabsWrapper: { className: 'content7-tabs-wrapper' },
  block: {
    children: [
      {
        name: 'block0',
        tag: {
          className: 'content7-tag',
          text: {
            children: (
              <span>
                <p>发布者</p>
              </span>
            ),
            className: 'content7-tag-name',
          },
          icon: { children: '' },
        },
        content: {
          className: 'content7-content k9s8t86w2sb-editor_css',
          text: {
            className: 'content7-text k9s8z10wizg-editor_css',
            md: 14,
            xs: 24,
            children: (
              <span>
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <span>
                            <h3>大致流程</h3>
                            <p>1.发布需求</p>
                            <p>发布需求，等待接受</p>
                            <p>2.接受沟通</p>
                            <p>多人接受，可与接受人进行沟通交流，确定人选<br /></p>
                            <p>3.指定接受</p>
                            <p>沟通好之后确定指定人选，并且可在中途沟通修改进度</p>
                            <p>4.完成需求</p>
                            <p>当需求完成时，在修改进度界面将进度改为100<br /></p>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            ),
          },
          img: {
            className: 'content7-img',
            children:
              word,
            md: 10,
            xs: 24,
          },
        },
      },
      {
        name: 'block1',
        tag: {
          className: 'content7-tag',
          icon: { children: '' },
          text: {
            className: 'content7-tag-name',
            children: (
              <span>
                <span>
                  <span>
                    <p>接受者</p>
                  </span>
                </span>
              </span>
            ),
          },
        },
        content: {
          className: 'content7-content',
          text: {
            className: 'content7-text',
            md: 14,
            xs: 24,
            children: (
              <span>
                <span>
                  <h3>
                    <p>大致流程</p>
                    <p>1.浏览搜索</p>
                    <p>接受别人发布的需求，可评论，且不可重复接受</p>
                    <p>2.接受需求</p>
                    <p>接受需求之后，可以将自己优势或者文件发给发布者进行沟通</p>
                    <p>3.确认人选</p>
                    <p>当发布者确认人选之后，可以中途进行沟通，确保用户需求完成</p>
                    <p>4.完成需求</p>
                    <p> 最后可发给发布者最后的文件，等待发布者确认完成需求</p>
                  </h3>
                </span>
              </span>
            ),
          },
          img: {
            className: 'content7-img',
            md: 10,
            xs: 24,
            children:
              word,
          },
        },
      },
    ],
  },
};
export const Footer01DataSource = {
  wrapper: { className: 'home-page-wrapper footer0-wrapper' },
  OverPack: { className: 'home-page footer0', playScale: 0.05 },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        <span>©2020&nbsp;Translot&nbsp;</span>
      </span>
    ),
  },
};

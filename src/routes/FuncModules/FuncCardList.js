import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, Form, Input, Radio, Upload } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';
import styles from './FuncCardList.less';
import { message } from 'antd/lib/index';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(state => ({
  list: state.list,
}))
export default class CardList extends PureComponent {
  state = {
    modalVisible: false,
    addInputValue: '',
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'account/add',
      payload: {
        description: this.state.addInputValue,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { list: { list, loading } } = this.props;
    const { modalVisible, addInputValue } = this.state;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div>
    );

    return (
      <PageHeaderLayout
        title="卡片列表"
        content={content}
        extraContent={extraContent}
      >

        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item => (item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card} actions={[<a>编辑</a>, <a>删除</a>]}>
                  <Card.Meta
                    avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                    title={<a href="#">{item.title}</a>}
                    description={(
                      <Ellipsis className={styles.item} lines={3}>{item.description}</Ellipsis>
                      )}
                  />
                </Card>
              </List.Item>
              ) : (
                <List.Item>
                  <Button
                    type="dashed"
                    className={styles.newButton}
                    onClick={() => this.handleModalVisible(true)}
                  >
                    <Icon type="plus" /> 新增模块
                  </Button>
                </List.Item>
              )
            )}
          />
          <Modal
            title="新增模块"
            visible={modalVisible}
            onOk={this.handleAdd}
            onCancel={() => this.handleModalVisible()}
          >
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="模块名"
            >
              <Input
                placeholder="请输入模块名"
                onChange={this.handleAddInput}
                value={addInputValue}
              />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="模块描述"
            >
              <Input placeholder="请输入模块描述，不超过四个字" />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="模块图标"
            >
              <Upload>
                <Button >
                  <Icon type="upload" />点击选择图片作为模块图标
                </Button>
              </Upload>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="模块地址"
            >
              <Input placeholder="请输入模块地址" />
            </FormItem>
          </Modal>
        </div>
      </PageHeaderLayout>
    );
  }
}

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal, Form, Input, Upload } from 'antd';
import { message } from 'antd/lib/index';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';
import styles from './FuncCardList.less';

const FormItem = Form.Item;

@connect(state => ({
  list: state.list,
}))
export default class CardList extends PureComponent {
  state = {
    modalVisible: false,
    addInputValue: '',
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
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


  handleDelete = (id) => {
    this.props.dispatch({
      type: 'list/delete',
      payload: {
        moduleid: id,
      },
    });
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    message.success('删除成功');
  }

  render() {
    const { list: { list, loading } } = this.props;
    const { modalVisible, addInputValue } = this.state;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          在此处可以查看、删除、增加模块
        </p>
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
                <Card hoverable className={styles.card} title={<a href="#">{item.title}</a>} extra={[<Button onClick={() => this.handleDelete(item.id)} > 删除</Button>]}>
                  <Card.Meta
                    avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                    description={(
                      <Ellipsis className={styles.item} lines={4}>{item.description}</Ellipsis>
                    )}
                  />
                </Card>
              </List.Item>
            )
              :
              (<List.Item>
                <Button
                  type="dashed"
                  className={styles.newButton}
                  onClick={() => this.handleModalVisible(true)}
                >
                  <Icon type="plus" /> 新增模块
                  </Button>
              </List.Item>)
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
              <Upload
                beforeUpload={{}}
              >
                <Button >
                  <Icon type="upload" />点击选择图片作为模块图标
                </Button>
              </Upload>
            </FormItem>
          </Modal>
        </div>
      </PageHeaderLayout>
    );
  }
}

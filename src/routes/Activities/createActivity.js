import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Upload,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

@connect(state => ({
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return (
      <PageHeaderLayout title="新建活动" content="新建活动表单">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="活动名称">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入活动名称',
                  },
                ],
              })(<Input placeholder="给活动起个名字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="属于的管理员">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请填写管理员',
                  },
                ],
              })(<Input placeholder="输入管理员名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="模板">
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="模块选择">
              <Select
                mode="multiple"
                placeholder="请选择所需模块，先选在前后选在后"
                defaultValue={['a10', 'c12']}
              >
                {children}
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="分享图片">
              <Upload>
                <Button>
                  <Icon type="upload" />点击选择图片
                </Button>
              </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="分享标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入朋友圈分享标题',
                  },
                ],
              })(
                <TextArea style={{ minHeight: 16 }} placeholder="请输入您要分享的标题" rows={4} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}

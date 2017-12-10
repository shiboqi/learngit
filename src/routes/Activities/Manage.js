import React, { PureComponent, Component } from 'react'
import { connect } from 'dva'
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
  Upload
} from 'antd'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './style.less'

const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const RadioGroup = Radio.Group

@connect(state => ({
  activities: state.activities
}))
@Form.create()
export default class BasicForms extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  handleSelectChange = value => {
    console.log(value)
  }
  render() {
    const { submitting } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    const {
      managerList,
      templateList,
      selectedActivity,
      systemModuleList
    } = this.props.activities
    const {
      activityName,
      belongManager,
      id,
      shareImage,
      shareText,
      status,
      templateId,
      moduleList,
      userAccount
    } = selectedActivity

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    }

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    }

    const moduleOptions = systemModuleList.map(module => (
      <Option key={module.id.toString()}>{module.moduleName}</Option>
    ))
    const defaultModuleValue = moduleList.map(module => ({
      key: module.id.toString(),
      label: module.moduleName
    }))
    const managerOptions = managerList.map(manager => (
      <Option key={manager.id.toString()}>{manager.userAccount}</Option>
    ))

    return (
      <PageHeaderLayout title="活动设置" content="设置活动表单">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem {...formItemLayout} label="活动名称">
              {getFieldDecorator('activityName', {
                rules: [
                  {
                    required: true,
                    message: '请输入活动名称'
                  }
                ],
                initialValue: activityName
              })(<Input placeholder="给活动起个名字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="属于的管理员">
              {getFieldDecorator('belongManager', {
                initialValue: { key: `0${belongManager}`, label: userAccount },
                rules: [
                  {
                    required: true,
                    message: '请填写管理员'
                  }
                ]
              })(
                <Select labelInValue={true} placeholder="输入管理员名称">
                  {managerOptions}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="模板">
              <RadioGroup name="radiogroup" defaultValue={templateId}>
                {templateList.map(template => (
                  <Radio key={template.id} value={template.id}>
                    {template.templateName}
                  </Radio>
                ))}
              </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="模块选择">
              {getFieldDecorator('moduleList', {
                initialValue: defaultModuleValue,
                rules: [
                  {
                    type: 'array',
                    required: true,
                    len: 4,
                    message: '请选择四个模块'
                  }
                ]
              })(
                <Select
                  labelInValue={true}
                  mode="multiple"
                  placeholder="请选择所需模块，先选在前后选在后"
                >
                  {moduleOptions}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="分享图片">
              <div className={styles.shareimg}>
                <img src={shareImage} />
              </div>
              <Upload>
                <Button>
                  <Icon type="upload" />点击选择图片
                </Button>
              </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="分享标题">
              {getFieldDecorator('shareText', {
                rules: [
                  {
                    required: true,
                    message: '请输入朋友圈分享标题'
                  }
                ]
              })(
                <TextArea
                  style={{ minHeight: 16 }}
                  placeholder="请输入您要分享的标题"
                  rows={4}
                />
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
    )
  }
}

import React, { PureComponent } from 'react'
import moment from 'moment'
import {
  Table,
  Alert,
  Badge,
  Divider,
  Modal,
  Form,
  Input,
  Radio,
  Select,
  Upload,
  Button,
  Icon
} from 'antd'
import { routerRedux } from 'dva/router'

import styles from './ActivityTable.less'

const { TextArea } = Input
const statusMap = ['processing', 'success', 'error']
const FormItem = Form.Item
const RadioGroup = Radio.Group

@Form.create()
class ActivityTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    settingRocord: {},
    visible: false
  }

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: []
      })
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows)
    }

    this.setState({ selectedRowKeys })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter)
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], [])
  }

  handleTimeSort = key => (a, b) => {
    return new Date(a[key]).getTime() - new Date(b[key]).getTime()
  }

  handleOk = () => {
    this.setState({ visible: true })
  }
  handleCancle = () => {
    this.setState({ visible: false })
  }

  handleSettingClick = record => {
    this.props.dispatch({ type: 'activities/configActivity', payload: record })
  }

  render() {
    const { selectedRowKeys } = this.state
    const { data, pagination, loading } = this.props

    const status = ['未开启', '开启', '异常']
    const columns = [
      {
        title: '活动名',
        dataIndex: 'activityName'
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0
          },
          {
            text: status[1],
            value: 1
          }
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />
        },
        onFilter: (value, record) => parseInt(value) === record.status
      },
      {
        title: '模板编号',
        dataIndex: 'templateId'
      },
      {
        title: '创建时间',
        dataIndex: 'addTime',
        sorter: this.handleTimeSort('addTime'),
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        sorter: this.handleTimeSort('updateTime'),
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '操作',
        render: (_, record, index) => (
          <div>
            <Button
              type="primary"
              onClick={() => this.handleSettingClick(record)}
            >
              配置
            </Button>
            <Divider type="vertical" />
            <a href="">开启</a>
          </div>
        )
      }
    ]

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled
      })
    }
    const { getFieldDecorator } = this.props.form

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <div>
                已选择{' '}
                <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{' '}
                项&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </div>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

export default ActivityTable

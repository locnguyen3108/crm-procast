import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd'
// import { useState } from 'react'
const { Option } = Select
// interface DataNodeType {
//   value: string
//   label: string
//   children?: DataNodeType[]
// }
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}
export default function Profile() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  // const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([])

  return (
    <div className='flex justify-center  h-screen'>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
        rootClassName='pt-4 w-3/4'
      >
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The new password that you entered do not match!'))
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='nickname'
          label='Nickname'
          tooltip='What do you want others to call you?'
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='intro' label='Intro' rules={[{ required: true, message: 'Please input Intro' }]}>
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item name='gender' label='Gender' rules={[{ required: true, message: 'Please select gender!' }]}>
          <Select placeholder='select your gender'>
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
            <Option value='other'>Other</Option>
          </Select>
        </Form.Item>

        <Form.Item label='Captcha' extra='We must make sure that your are a human.'>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name='captcha'
                noStyle
                rules={[{ required: true, message: 'Please input the captcha you got!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
            }
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href=''>agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' rootClassName='bg-cyan-200'>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

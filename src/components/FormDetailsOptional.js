import React, { Component } from "react";
import { Form, Input, Button, Radio } from "antd";

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields

export class FormDetailsOptional extends Component {
  state = {
    value: 1,
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };

    const { value } = this.state;
    const { values, handleChange } = this.props;
    
    return (
      <div style={{ marginTop: "2rem" }}>
        <Form
          nextstep={this.nextstep}
          handleChange={this.handleChange}
          values={values}
          {...formItemLayout}
          name="register"
          onFinish={this.onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="fundingSource"
            label="Funding Source"
          >
            <Radio.Group onChange={this.onChange} value={value}>
              <Radio style={radioStyle} value={1}>
                Self Funded
              </Radio>
              <Radio style={radioStyle} value={2}>
                LPDP
              </Radio>
              <Radio style={radioStyle} value={3}>
                Chevening
              </Radio>
              <Radio style={radioStyle} value={4}>
                Gates Foundation
              </Radio>
              <Radio style={radioStyle} value={5}>
                IDB
              </Radio>
              <Radio style={radioStyle} value={6}>
                Other
                {value === 6 ? (
                  <Input style={{ width: 100, marginLeft: 10 }} />
                ) : null}
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="faculty"
            label="Faculty / School"
          >
            <Input 
            onChange={handleChange("faculty")}
            defaultValue={values.faculty} />
          </Form.Item>

          <Form.Item
            name="ukAddress"
            label="UK Address / optional"
          >
            <Input
            onChange={handleChange("ukAddress")}
            defaultValue={values.ukAddress} />
          </Form.Item>

          <Form.Item
            name="personalEmail"
            label="Personal Email"
          >
            <Input 
            onChange={handleChange("personalEmail")}
            defaultValue={values.personalEmail} />
          </Form.Item>

          <Form.Item
            name="linkLinkedin"
            label="Link LinkedIn / optional"
          >
            <Input
            onChange={handleChange("linkLinkedin")}
            defaultValue={values.linkLinkedin} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="secondary" onClick={this.back}>
              Back
            </Button>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default FormDetailsOptional;

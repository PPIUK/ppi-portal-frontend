import React, { Component } from "react";
import { Form, Input, Button, Radio, DatePicker } from "antd";

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const uniEmailRules = [
  { type: "email", message: "The input is not valid E-mail!" },
  { required: true, message: "Please input your E-mail!" },
];

const passwordRules = [
  { required: true, message: "Please input your password!" },
];

const fullNameRules = [
  {
    required: true,
    message: "Please input your full name!",
    whitespace: true,
  },
];

const postCodeRules = [
  {
    required: true,
    message: "Please input your post code!",
    whitespace: true,
  },
];

const degreeLevelRules = [
  {
    required: true,
  },
];

const studyProgramRules = [
  {
    required: true,
    message: "Please input your program of study, course or interest!",
    whitespace: true,
  },
];

const startDateRules = [
  {
    required: true,
  },
];

const endDateRules = [
  {
    required: true,
  },
];

const dobRules = [
  {
    required: true
  },
];

const cityOriginRules = [
  {
    required: true,
    message: "Please input your city Origin!",
    whitespace: true,
  },
];

const whatsappRules = [
  {
    required: true,
    message: "Please input your WhatsApp number!",
    whitespace: true,
  },
];

const universityRules = [
  {
    required: true,
    message: "Please select from the dropdown list",
    whitespace: true,
  },
];

export class FormDetailsMandatory extends Component {
  state = {
    value: 1,
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
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
    const { values, handleChange } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <div style={{ marginTop: "2rem" }}>
          <Form
            {...formItemLayout}
            name="register"
            scrollToFirstError
          >
            <Form.Item
              name="uni email"
              label="University or School Email"
              rules={uniEmailRules}
            >
              <Input 
              onChange={handleChange("uniEmail")}
              defaultValue={values.uniEmail} />
            </Form.Item>

            <Form.Item
              name="user password"
              label="Password"
              rules={passwordRules}
              hasFeedback
            >
              <Input.Password 
              onChange={handleChange("password")}
              defaultValue={values.password} />
            </Form.Item>

            <Form.Item
              name="full name"
              label="Full name"
              rules={fullNameRules}
            >
              <Input placeholder="Full name as written in ID or Passport"
              onChange={handleChange("fullName")}
              defaultValue={values.fullName} />
            </Form.Item>

            <Form.Item
              name="date of birth"
              label="Date of Birth"
              rules={dobRules}
            >
              <DatePicker/>
            </Form.Item>

            <Form.Item
              name="city of origin"
              label="City of origin / in Indonesia"
              rules={cityOriginRules}
            >
              <Input 
              onChange={handleChange("cityOrigin")}
              defaultValue={values.cityOrigin} />
            </Form.Item>

            <Form.Item
              name="uk postcode"
              label="UK PostCode"
              rules={postCodeRules}
            >
              <Input 
              onChange={handleChange("ukPostcode")}
              defaultValue={values.ukPostcode} />
            </Form.Item>

            <Form.Item
              name="wa number"
              label="WhatsApp Number"
              rules={whatsappRules}
            >
              <Input 
              onChange={handleChange("waNumber")}
              defaultValue={values.waNumber} />
            </Form.Item>

            <Form.Item
              name="university name"
              label="University Name"
              rules={universityRules}
            >
              <Input               
              onChange={handleChange("university")}
              defaultValue={values.university} />
            </Form.Item>

            <Form.Item
              name="degree level"
              label="Degree Level"
              rules={degreeLevelRules}
            >
              <Radio.Group onChange={this.onChange} value={value}>
                <Radio style={radioStyle} value={1}>
                  S1 / Undergraduate
                </Radio>
                <Radio style={radioStyle} value={2}>
                  S2 / Masters
                </Radio>
                <Radio style={radioStyle} value={3}>
                  S3 / Doctorate
                </Radio>
                <Radio style={radioStyle} value={4}>
                  A-Level / Foundation
                </Radio>
                <Radio style={radioStyle} value={5}>
                  Other
                  {value === 5 ? (
                    <Input style={{ width: 100, marginLeft: 10 }} />
                  ) : null}
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="study programme"
              label="Study Programme / Course"
              rules={studyProgramRules}
            >
              <Input 
              onChange={handleChange("studyProgramme")}
              defaultValue={values.studyProgramme} />
            </Form.Item>

            <Form.Item
              name="start date"
              label="Start Date"
              rules={startDateRules}
            >
              <DatePicker/>
            </Form.Item>

            <Form.Item
              name="end date"
              label="Estimated End Date"
              rules={endDateRules}
            >
              <DatePicker/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="secondary" onClick={this.continue}>
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default FormDetailsMandatory;

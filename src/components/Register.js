/**
 * Registration form component for app signup.
 */
import React from "react";
import FormDetailsMandatory from "./FormDetailsMandatory";
import FormDetailsOptional from "./FormDetailsOptional";

class RegistrationForm extends React.Component {
  state = {
    step: 1,
    uniEmail: "",
    password: "",
    confirmPass: "",
    fullName: "",
    dob: "",
    cityOrigin: "",
    ukPostcode: "",
    waNumber: "",
    university: "",
    degreeLevel: "",
    studyProgramme: "",
    startDate: "",
    endDate: "",
    fundingSource: "",
    faculty: "",
    ukAddress: "",
    personalEmail: "",
    linkLinkedin: ""
  };

  //proceed the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  //go back to the previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  //handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      uniEmail,
      password,
      confirmPass,
      fullName,
      dob,
      cityOrigin,
      ukPostcode,
      waNumber,
      university,
      degreeLevel,
      studyProgramme,
      startDate,
      endDate,
      fundingSource,
      faculty,
      ukAddress,
      personalEmail,
      linkLinkedin,
    } = this.state;

    const values = {
      uniEmail,
      password,
      confirmPass,
      fullName,
      dob,
      cityOrigin,
      ukPostcode,
      waNumber,
      university,
      degreeLevel,
      studyProgramme,
      startDate,
      endDate,
      fundingSource,
      faculty,
      ukAddress,
      personalEmail,
      linkLinkedin,
    };

    switch (step) {
      case 1:
        return (
          <FormDetailsMandatory
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormDetailsOptional
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
    }
  }
}

export default RegistrationForm;

import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    AutoComplete,
    Divider,
    Alert,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const universityOptions = [
    { value: 'University of Aberdeen' },
    { value: 'Abertay University' },
    { value: 'Aberystwyth University (Prifysgol Aberystwyth)' },
    { value: 'Anglia Ruskin University' },
    { value: 'Anglo-European College of Chiropractic' },
    { value: 'Archbishop of Canterbury, The' },
    {
        value:
            'Arden University (formerly known as Resource Development International)',
    },
    { value: 'Ashridge Business School' },
    { value: 'Aston University' },
    { value: 'Bangor University (Prifysgol Bangor)' },
    { value: 'University of Bath' },
    { value: 'Bath Spa University' },
    { value: 'University of Bedfordshire' },
    { value: 'Birkbeck, University of London' },
    { value: 'University of Birmingham' },
    { value: 'Birmingham City University' },
    { value: 'University College Birmingham' },
    { value: 'Bishop Grossteste University' },
    { value: 'University of Bolton' },
    { value: 'Arts University Bournemouth' },
    { value: 'Bournemouth University' },
    { value: 'BPP University' },
    { value: 'University of Bradford' },
    { value: 'University of Brighton' },
    { value: 'University of Bristol' },
    { value: 'Brunel University London' },
    { value: 'University of Buckingham' },
    { value: 'Buckinghamshire New University' },
    { value: 'University of Cambridge' },
    { value: 'Canterbury Christ Church University' },
    {
        value:
            'Cardiff Metropolitan University (Prifysgol Metropolitan Caerdydd)',
    },
    { value: 'Cardiff University (Prifysgol Caerdydd)' },
    { value: 'University of Chester' },
    { value: 'University of Chichester' },
    { value: 'City University London' },
    { value: 'Courtauld Institute of Art, The' },
    { value: 'Coventry University' },
    { value: 'Cranfield University' },
    { value: 'University for the Creative Arts' },
    { value: 'University of Cumbria' },
    { value: 'De Montfort University' },
    { value: 'University of Derby' },
    { value: 'University of Dundee' },
    { value: 'Durham University' },
    { value: 'University of East Anglia' },
    { value: 'University of East London' },
    { value: 'Edge Hill University' },
    { value: 'University of Edinburgh, The' },
    { value: 'Edinburgh Napier University' },
    { value: 'University of Essex' },
    { value: 'University of Exeter' },
    { value: 'Falmouth University' },
    { value: 'University of Glasgow' },
    { value: 'Glasgow Caledonian University' },
    { value: 'University of Gloucestershire' },
    { value: 'Glyndŵr University (Prifysgol Glyndŵr)' },
    { value: 'Goldsmiths, University of London' },
    { value: 'University of Greenwich' },
    { value: 'Guildhall School of Music and Drama' },
    { value: 'Harper Adams University' },
    { value: 'Hartpury University' },
    { value: 'Heriot-Watt University' },
    { value: 'University of Hertfordshire' },
    { value: 'Heythrop College' },
    { value: 'University of the Highlands and Islands' },
    { value: 'University of Huddersfield' },
    { value: 'University of Hull' },
    { value: 'Imperial College of Science, Technology and Medicine' },
    { value: 'Institute of Cancer Research, The' },
    { value: 'Institute of Education, University of London' },
    { value: 'Keele University' },
    { value: 'University of Kent' },
    { value: 'King’s College London' },
    { value: 'Kingston University' },
    { value: 'University of Central Lancashire' },
    { value: 'Lancaster University' },
    { value: 'University of Leeds' },
    { value: 'Leeds Beckett University' },
    { value: 'Leeds Arts University' },
    { value: 'Leeds Trinity University' },
    { value: 'University of Leicester' },
    { value: 'University of Lincoln' },
    { value: 'University of Liverpool' },
    { value: 'Liverpool Hope University' },
    { value: 'Liverpool John Moores University' },
    { value: 'Liverpool School of Tropical Medicine' },
    { value: 'University of London' },
    { value: 'London Business School' },
    { value: 'London Institute of Banking and Finance, The' },
    { value: 'London Metropolitan University' },
    { value: 'London School of Hygiene and Tropical Medicine' },
    { value: 'London School of Economics and Political Science, The (LSE)' },
    { value: 'London South Bank University' },
    { value: 'University College London' },
    { value: 'Loughborough University' },
    { value: 'University of Manchester' },
    { value: 'Manchester Metropolitan University' },
    { value: 'Middlesex University' },
    { value: 'NCG' },
    { value: 'Newcastle University' },
    { value: 'Newman University, Birmingham' },
    { value: 'University of Northampton, The' },
    { value: 'Northumbria University Newcastle' },
    { value: 'Norwich University of the Arts' },
    { value: 'University of Nottingham' },
    { value: 'Nottingham Trent University' },
    { value: 'Open University, The' },
    { value: 'University of Oxford' },
    { value: 'Oxford Brookes University' },
    { value: 'Plymouth University' },
    { value: 'University of Portsmouth' },
    { value: 'Queen Margaret University, Edinburgh' },
    { value: 'Queen Mary, University of London' },
    { value: 'Queen’s University Belfast' },
    { value: 'Ravensbourne' },
    { value: 'University of Reading' },
    { value: 'Regent’s University London' },
    { value: 'Richmond, The American International University in London' },
    { value: 'Robert Gordon University, Aberdeen' },
    { value: 'University of Roehampton' },
    { value: 'Rose Bruford College of Theatre and Performance' },
    { value: 'Royal Academy of Music' },
    { value: 'Royal Agricultural University' },
    {
        value:
            'Royal Central School of Speech and Drama (University of London)',
    },
    { value: 'Royal College of Art' },
    { value: 'Royal College of Music' },
    { value: 'Royal College of Nursing' },
    { value: 'Royal Conservatoire of Scotland' },
    { value: 'Royal Holloway, University of London' },
    { value: 'Royal Northern College of Music' },
    { value: 'Royal Veterinary College, The' },
    { value: 'University of Salford' },
    {
        value:
            'School of Oriental and African Studies (SOAS), University of London',
    },
    { value: 'University of Sheffield' },
    { value: 'Sheffield Hallam University' },
    { value: 'University of South Wales (Prifysgol De Cymru)' },
    { value: 'University of Southampton' },
    { value: 'Solent University' },
    { value: 'University of St Andrews' },
    { value: 'St George’s, University of London' },
    { value: 'University of St Mark and St John, Plymouth' },
    { value: 'St Mary’s University, Twickenham' },
    { value: 'Staffordshire University' },
    { value: 'University of Stirling' },
    { value: 'University of Strathclyde' },
    { value: 'University of Suffolk' },
    { value: 'University of Sunderland' },
    { value: 'University of Surrey' },
    { value: 'University of Sussex' },
    { value: 'Swansea University (Prifysgol Abertawe)' },
    { value: 'Teesside University' },
    { value: 'Trinity Laban Conservatoire of Music and Dance' },
    { value: 'University of the Arts, London' },
    { value: 'University College of Estate Management' },
    { value: 'University College of Osteopathy' },
    { value: 'University of Law, The' },
    { value: 'University of Ulster' },
    { value: 'University of Wales (Prifysgol Cymru)' },
    {
        value:
            'University of Wales Trinity Saint David (Prifysgol Cymru Y Drindod Dewi Sant',
    },
    { value: 'University of Warwick' },
    { value: 'University of the West of England, Bristol' },
    { value: 'University of West London' },
    { value: 'University of the West of Scotland' },
    { value: 'University of Westminster' },
    { value: 'University of Winchester, The' },
    { value: 'University of Wolverhampton' },
    { value: 'University of Worcester' },
    { value: 'Writtle University College' },
    { value: 'University of York' },
    { value: 'York St John University' },
    { value: 'Blackpool and the Fylde College' },
    { value: 'Cornwall College Group' },
    { value: 'Grimsby Institute of Higher Education' },
    { value: 'Hull College' },
    { value: 'Leeds City College' },
    { value: 'New College Durham' },
    { value: 'Newcastle College' },
    { value: 'Warwickshire College' },
];

const branchOptions = [
    { value: 'General' },
    { value: 'Aberdeen' },
    { value: 'Belfast' },
    { value: 'Birmingham' },
    { value: 'Bournemouth' },
    { value: 'Bradford' },
    { value: 'Brighton' },
    { value: 'Bristol' },
    { value: 'Cambridge' },
    { value: 'Canterbury' },
    { value: 'Coventry' },
    { value: 'Cranfield' },
    { value: 'Durham' },
    { value: 'Edinburgh' },
    { value: 'Exeter' },
    { value: 'Glasgow' },
    { value: 'Hatfield' },
    { value: 'Hull' },
    { value: 'Lancaster' },
    { value: 'Leeds' },
    { value: 'Leicester' },
    { value: 'Liverpool' },
    { value: 'London' },
    { value: 'Manchester' },
    { value: 'Newcastle' },
    { value: 'Northampton' },
    { value: 'Norwich' },
    { value: 'Nottingham' },
    { value: 'Oxford' },
    { value: 'Portsmouth' },
    { value: 'Reading' },
    { value: 'Sheffield' },
    { value: 'Southampton' },
    { value: 'Sunderland' },
    { value: 'Wales' },
    { value: 'Warwick' },
    { value: 'York' },
];

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
    labelCol: { span: 6 },
};

// define validation rules for the form fields
const uniEmailRules = [
    { type: 'email', message: 'Please enter a valid email!' },
    { required: true, message: 'Please enter your email!' },
    () => ({
        validator(rule, value) {
            return new Promise((resolve, reject) => {
                if (!value) return resolve();
                axios
                    .post(
                        '/api/auth/account-lookup',
                        { email: value },
                        {
                            validateStatus: false,
                        }
                    )
                    .then((resp) => {
                        switch (resp.status) {
                            case 404:
                                return resolve();
                            default:
                                return reject('Email is already registered!');
                        }
                    })
                    .catch(() => reject('A server error occured'));
            });
        },
    }),
];

const passwordRules = [{ required: true, message: 'Please enter a password!' }];
const confirmPasswordRules = [
    {
        required: true,
        message: 'Please confirm your password',
    },
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }

            return Promise.reject(
                'The two passwords that you entered do not match!'
            );
        },
    }),
];

const fullNameRules = [
    {
        required: true,
        message: 'Please fill in your full name',
        whitespace: true,
    },
];

const postCodeRules = [
    {
        required: true,
        message: 'Please fill in your postcode',
        whitespace: true,
    },
];

const degreeLevelRules = [
    {
        required: true,
        message: 'Please select / state your degree level',
    },
];

const studyProgramRules = [
    {
        required: true,
        message: 'Please fill in your course / study programme',
        whitespace: true,
    },
];

const startDateRules = [
    {
        required: true,
        message: 'Please fill in your course start date',
    },
];

const endDateRules = [
    {
        required: true,
        message: 'Please fill in your course estimated end date',
    },
];

const dobRules = [
    {
        required: true,
        message: 'Please fill in your date of birth',
    },
];

const cityOriginRules = [
    {
        required: true,
        message: 'Please state your city of origin',
        whitespace: true,
    },
];

const whatsappRules = [
    {
        required: true,
        message: 'Please fill in your WhatsApp number',
        whitespace: true,
    },
];

const universityRules = [
    {
        required: true,
        message: 'Please select a university',
        whitespace: true,
    },
];

const branchRules = [
    {
        required: true,
        message: 'Please select a branch',
        whitespace: true,
    },
];

export default function FormDetailsMandatory() {
    const [form] = useForm();
    const navigate = useNavigate();
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const [other, setOther] = useState(false);
    const [submitState, setSubmitState] = useState('idle');
    useEffect(() => {
        if (submitState === 'success;')
            setTimeout(() => {
                navigate('/login');
            }, 5000);
    }, [submitState]);

    const onRegisterSubmit = (vals) => {
        setSubmitState('submitting;');
        axios
            .post('/api/auth/register/new', {
                ...vals,
                degreeLevel:
                    vals.degreeLevel !== 'Other'
                        ? vals.degreeLevel
                        : vals.degreeLevelOther,
            })
            .then(() => {
                setSubmitState('success;');
            })
            .catch((err) =>
                setSubmitState(`errored;${err.response.data.message}`)
            );
    };

    let feedbackAlert = null;
    if (submitState.split(';')[0] === 'success')
        feedbackAlert = (
            <Alert
                message="Registration successful! Please check your email to confirm"
                type="success"
            />
        );
    else if (submitState.split(';')[0] === 'errored')
        feedbackAlert = (
            <Alert
                message={`An error occured: ${submitState.split(';')[1]}`}
                type="error"
            />
        );

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onRegisterSubmit}
            scrollToFirstError
        >
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                    loading={submitState === 'submitting;'}
                >
                    Register
                </Button>
                Already a member? <Link to="/login">Login now!</Link>
            </Form.Item>
            <Divider />

            <Form.Item
                name="email"
                label="Campus Email"
                rules={uniEmailRules}
                validateTrigger="onBlur"
                hasFeedback
            >
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={passwordRules}
                hasFeedback
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
                name="passwordConfirm"
                label="Confirm Password"
                dependencies={['password']}
                rules={confirmPasswordRules}
                hasFeedback
            >
                <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Divider />

            <Form.Item name="fullName" label="Full name" rules={fullNameRules}>
                <Input placeholder="Full name as written in ID or Passport" />
            </Form.Item>

            <Form.Item name="dob" label="Date of Birth" rules={dobRules}>
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="originCity"
                label="City of Origin"
                rules={cityOriginRules}
            >
                <Input placeholder="City of Origin (in Indonesia)" />
            </Form.Item>

            <Form.Item
                name="postcodeUK"
                label="UK Postcode"
                rules={postCodeRules}
            >
                <Input placeholder="Postcode" />
            </Form.Item>

            <Form.Item
                name="phoneWA"
                label="WhatsApp Number"
                rules={whatsappRules}
            >
                <Input placeholder="WhatsApp Number" />
            </Form.Item>

            <Form.Item name="branch" label="PPI Branch" rules={branchRules}>
                <AutoComplete
                    options={branchOptions}
                    placeholder="Branch (select General if you don't know)"
                    filterOption={(inputValue, option) =>
                        option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </Form.Item>

            <Form.Item
                name="university"
                label="University"
                rules={universityRules}
            >
                <AutoComplete
                    options={universityOptions}
                    placeholder="University"
                    filterOption={(inputValue, option) =>
                        option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </Form.Item>

            <Form.Item
                name="degreeLevel"
                label="Degree Level"
                rules={degreeLevelRules}
            >
                <Radio.Group
                    onChange={(e) => setOther(e.target.value === 'Other')}
                >
                    <Radio style={radioStyle} value={'S1 / Undergraduate'}>
                        S1 / Undergraduate
                    </Radio>
                    <Radio style={radioStyle} value={'S2 / Masters'}>
                        S2 / Masters
                    </Radio>
                    <Radio style={radioStyle} value={'S3 / Doctorate'}>
                        S3 / Doctorate
                    </Radio>
                    <Radio style={radioStyle} value={'A-Level / Foundation'}>
                        A-Level / Foundation
                    </Radio>
                    <Radio style={radioStyle} value={'Other'}>
                        Other
                        {other ? (
                            <Form.Item
                                name="degreeLevelOther"
                                rules={degreeLevelRules}
                            >
                                <Input placeholder="Specify Other" />
                            </Form.Item>
                        ) : null}
                    </Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="course" label="Course" rules={studyProgramRules}>
                <Input placeholder="Study Programme / Course" />
            </Form.Item>

            <Form.Item
                name="startDate"
                label="Start Date"
                rules={startDateRules}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="endDate"
                label="Estimated End Date"
                rules={endDateRules}
            >
                <DatePicker />
            </Form.Item>

            {feedbackAlert}

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                    loading={submitState === 'submitting;'}
                >
                    Register
                </Button>
                Already a member? <Link to="/login">Login now!</Link>
            </Form.Item>
        </Form>
    );
}

import React, { useEffect, useState } from 'react';
import {
    Card,
    Descriptions,
    Input,
    Form,
    DatePicker,
    Button,
    message,
    AutoComplete,
    Upload,
    Space,
    Image,
    Typography,
} from 'antd';
import {
    DownloadOutlined,
    UploadOutlined,
    UserOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../utils/useAuth';

import moment from 'moment';

import axios from 'axios';

import download from 'downloadjs';

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

import allowedDomains from '../../data/uniemails.json';

function OwnProfileView() {
    const auth = useAuth();
    const [profile, setProfile] = useState(null);
    const [form] = Form.useForm();
    const [uploadStudentProofList, setUploadStudentProofList] = useState([]);
    const [uploadProfilePictureList, setUploadProfilePictureList] = useState(
        []
    );
    const [imageBlob, setImageBlob] = useState(null);

    const onStudentProofFileChoose = (e) =>
        setUploadStudentProofList([...e.fileList].slice(-1));

    const onProfilePictureFileChoose = (e) =>
        setUploadProfilePictureList([...e.fileList].slice(-1));

    const uniEmailRules = [
        { type: 'email', message: 'Please enter a valid email!' },
        { required: true, message: 'Please enter your email!' },
        () => ({
            validator(rule, value) {
                return new Promise((resolve, reject) => {
                    if (!value) return resolve();
                    if (value === profile.email) return resolve();
                    if (!allowedDomains.includes(value.match(/@(.*)/)[1]))
                        return reject(
                            'Campus email should match your university email domain'
                        );
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
                                    return reject(
                                        'Email is already registered!'
                                    );
                            }
                        })
                        .catch(() => reject('A server error occured'));
                });
            },
        }),
    ];

    const personalEmailRules = [
        { type: 'email', message: 'Please enter a valid email!' },
        ({ getFieldValue }) => ({
            validator(rule, value) {
                return new Promise((resolve, reject) => {
                    if (!getFieldValue('hasUniEmail') && !value) {
                        return reject('Please enter your personal email!');
                    }
                    if (!value) return resolve();
                    if (value === profile.emailPersonal) return resolve();
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
                                    return reject(
                                        'Email is already registered!'
                                    );
                            }
                        })
                        .catch(() => reject('A server error occured'));
                });
            },
        }),
    ];

    const submitForm = (vals) => {
        let formData = new FormData();
        for (const name in vals) {
            if (vals[name]) {
                formData.append(name, vals[name]);
            }
        }
        if (uploadStudentProofList.length > 0) {
            formData.append(
                'studentProof',
                uploadStudentProofList[0].originFileObj
            );
        }
        if (uploadProfilePictureList.length > 0) {
            formData.append(
                'profilePicture',
                uploadProfilePictureList[0].originFileObj
            );
        }
        message.loading(
            {
                content: 'Saving details...',
                key: 'saveProfileLoading',
            },
            0
        );
        axios
            .patch('/api/profiles/me', formData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                message.success(
                    {
                        content: 'Profile details saved!',
                        key: 'saveProfileLoading',
                    },
                    4.5
                );
                axios
                    .get('/api/profiles/me', {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                    })
                    .then((resp) => {
                        setProfile(resp.data.data);
                    });
            })
            .catch((e) => {
                message.error({
                    content: `Failed to save: ${e.response.data.message}`,
                    key: 'saveProfileLoading',
                });
            });
    };
    const downloadStudentProof = () => {
        axios
            .get('/api/profiles/me/studentproof', {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                responseType: 'blob',
            })
            .then((resp) => {
                const headerVal = resp.headers['content-disposition'];
                const filename = headerVal
                    .split(';')[1]
                    .split('=')[1]
                    .replace('"', '')
                    .replace('"', '');
                download(resp.data, filename);
            });
    };

    const imageUploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload New Picture</div>
        </div>
    );

    useEffect(() => {
        axios
            .get('/api/profiles/me', {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                setProfile(resp.data.data);
            })
            .then(() => {
                axios
                    .get('/api/profiles/me/profilepicture', {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                        responseType: 'blob',
                    })
                    .then((resp) => {
                        let reader = new FileReader();
                        reader.readAsDataURL(resp.data);
                        reader.onload = () => setImageBlob(reader.result);
                    });
            });
    }, []);

    return (
        <Card
            title={
                <span>
                    <UserOutlined /> My Profile
                </span>
            }
            extra={
                <Button type="primary" onClick={() => form.submit()}>
                    Save
                </Button>
            }
        >
            {profile && (
                <Form form={form} onFinish={submitForm}>
                    <Descriptions bordered>
                        <Descriptions.Item label="Branch" span={3}>
                            <Form.Item
                                name="branch"
                                initialValue={profile.branch}
                                noStyle
                            >
                                <AutoComplete
                                    style={{ width: '100%' }}
                                    options={
                                        auth.user.branch !== 'All'
                                            ? branchOptions
                                            : [
                                                  { value: 'All' },
                                                  ...branchOptions,
                                              ]
                                    }
                                    filterOption={(inputValue, option) =>
                                        option.value
                                            .toUpperCase()
                                            .indexOf(
                                                inputValue.toUpperCase()
                                            ) !== -1
                                    }
                                />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Full Name" span={3}>
                            <Form.Item
                                name="fullName"
                                initialValue={profile.fullName}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of Birth" span={3}>
                            <Form.Item
                                name="dob"
                                initialValue={moment(profile.dob)}
                                noStyle
                            >
                                <DatePicker />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Origin City" span={3}>
                            <Form.Item
                                name="originCity"
                                initialValue={profile.originCity}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Address (UK)" span={3}>
                            <Form.Item
                                name="addressUK"
                                initialValue={profile.addressUK}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Postcode (UK)" span={3}>
                            <Form.Item
                                name="postcodeUK"
                                initialValue={profile.postcodeUK}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="University" span={3}>
                            <Form.Item
                                name="university"
                                initialValue={profile.university}
                                noStyle
                            >
                                <AutoComplete
                                    style={{ width: '100%' }}
                                    options={universityOptions}
                                    filterOption={(inputValue, option) =>
                                        option.value
                                            .toUpperCase()
                                            .indexOf(
                                                inputValue.toUpperCase()
                                            ) !== -1
                                    }
                                />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Degree Level" span={3}>
                            <Form.Item
                                name="degreeLevel"
                                initialValue={profile.degreeLevel}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Faculty" span={3}>
                            <Form.Item
                                name="faculty"
                                initialValue={profile.faculty}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Course" span={3}>
                            <Form.Item
                                name="course"
                                initialValue={profile.course}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Start Date" span={3}>
                            <Form.Item
                                name="startDate"
                                initialValue={moment(profile.startDate)}
                                noStyle
                            >
                                <DatePicker />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="End Date" span={3}>
                            <Form.Item
                                name="endDate"
                                initialValue={moment(profile.endDate)}
                                noStyle
                            >
                                <DatePicker />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Funding Source" span={3}>
                            <Form.Item
                                name="fundingSource"
                                initialValue={profile.fundingSource}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email (Uni)" span={3}>
                            <Form.Item
                                name="email"
                                initialValue={profile.email}
                                rules={uniEmailRules}
                                validateTrigger="onBlur"
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                            {!profile.email && (
                                <Typography.Text type="danger">
                                    You need to update your university email no
                                    later than 31 September 2021!
                                </Typography.Text>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email (Personal)" span={3}>
                            <Form.Item
                                name="emailPersonal"
                                initialValue={profile.emailPersonal}
                                rules={personalEmailRules}
                                validateTrigger="onBlur"
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Contact Number (WhatsApp)"
                            span={3}
                        >
                            <Form.Item
                                name="phoneWA"
                                initialValue={profile.phoneWA}
                                noStyle
                            >
                                <Input />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Student Status Proof (Student ID Card/CAS/LoA)"
                            span={3}
                        >
                            <Form.Item name="studentProof" noStyle>
                                <Space>
                                    {profile.studentProof ? (
                                        <Button
                                            type="primary"
                                            icon={<DownloadOutlined />}
                                            onClick={downloadStudentProof}
                                        >
                                            Download Saved File
                                        </Button>
                                    ) : null}
                                    <Upload
                                        maxCount={1}
                                        onChange={onStudentProofFileChoose}
                                        fileList={uploadStudentProofList}
                                        beforeUpload={() => false}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Click to Upload New File
                                        </Button>
                                    </Upload>
                                </Space>
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="Profile Picture" span={3}>
                            <Form.Item name="profilePicture" noStyle>
                                <Space>
                                    {profile.profilePicture ? (
                                        <Image
                                            width={200}
                                            loading={imageBlob === null}
                                            src={imageBlob}
                                        />
                                    ) : null}
                                    <Upload
                                        accept="image/*"
                                        maxCount={1}
                                        listType="picture-card"
                                        showUploadList={{
                                            showPreviewIcon: false,
                                            showRemoveIcon: false,
                                        }}
                                        onChange={onProfilePictureFileChoose}
                                        fileList={uploadProfilePictureList}
                                        beforeUpload={() => false}
                                    >
                                        {imageUploadButton}
                                    </Upload>
                                </Space>
                            </Form.Item>
                        </Descriptions.Item>
                    </Descriptions>
                    <br />
                    <Button block type="primary" onClick={() => form.submit()}>
                        Save
                    </Button>
                </Form>
            )}
        </Card>
    );
}

export default OwnProfileView;

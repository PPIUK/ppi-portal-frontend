import React, { useState } from 'react';

import {
    AutoComplete,
    Button,
    Card,
    DatePicker,
    Form,
    Input,
    Modal,
    Select,
    Upload,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import {
    FormOutlined,
    InboxOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import Axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../../utils/useAuth';

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

import axios from 'axios';
import { useNavigate } from 'react-router';

export default function ThesisSubmissionView() {
    const [form] = useForm();
    const auth = useAuth();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [usersSearch, setUsersSearch] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const onUsersSearch = (val) => {
        Axios.get('/api/profiles/search/name', {
            params: {
                name: val,
            },
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((resp) => {
            setUsersSearch(
                resp.data.data.map((profile) => {
                    return {
                        key: profile._id,
                        label: profile.fullName,
                        value: profile.fullName,
                    };
                })
            );
        });
    };

    const onUserSelect = (val, option) => {
        setSelectedUsers([...selectedUsers, option]);
    };

    const onFormSubmit = (vals) => {
        const formData = new FormData();
        // Set authors
        vals['authors'] = vals['authors'].map((author) => {
            const foundId = selectedUsers.find((user) => {
                return user.value === author;
            });
            return foundId !== undefined ? foundId.key : author;
        });
        // Set correspondingAuthor
        const foundId = selectedUsers.find((user) => {
            return user.value === vals['correspondingAuthor'];
        });
        vals['correspondingAuthor'] =
            foundId !== undefined ? foundId.key : vals['correspondingAuthor'];

        Object.entries(vals).map(([key, val]) => {
            if (val !== undefined) {
                formData.append(
                    key,
                    typeof val === 'string' ? val : JSON.stringify(val)
                );
            }
        });
        formData.append('file', file);
        formData.set('year', moment(vals['year']).format('YYYY'));

        axios
            .post('/api/thesis', formData, {
                headers: { Authorization: `Bearer ${auth.accessToken}` },
            })
            .then((res) => {
                navigate(`/thesis-bank/${res.data.id}`);
            })
            .catch((e) => {
                Modal.error({
                    title: 'Error',
                    content: e.response.data.message,
                });
            });
    };

    return (
        <Card
            title={
                <span>
                    <FormOutlined /> Thesis Bank Submission
                </span>
            }
        >
            <Form form={form} layout="vertical" onFinish={onFormSubmit}>
                <Form.Item
                    name="cluster"
                    label="Cluster"
                    initialValue="Economics and Business"
                >
                    <Select defaultValue="Economics and Business">
                        <Select.Option value="Economics and Business">
                            Economics and Business
                        </Select.Option>
                        <Select.Option value="Education">
                            Education
                        </Select.Option>
                        <Select.Option value="Energy">Energy</Select.Option>
                        <Select.Option value="Health">Health</Select.Option>
                        <Select.Option value="Infrastructure and Built Environment">
                            Infrastructure and Built Environment
                        </Select.Option>
                        <Select.Option value="Politics and Law">
                            Politics and Law
                        </Select.Option>
                        <Select.Option value="Social Development, Arts and Humanity">
                            Social Development, Arts and Humanity
                        </Select.Option>
                        <Select.Option value="STEM">STEM</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Title"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Missing title',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.List
                    name="authors"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1)
                                    return Promise.reject(
                                        new Error('At least 1 author')
                                    );
                            },
                        },
                    ]}
                    initialValue={['']}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? 'Authors' : null}
                                    required
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing author',
                                            },
                                        ]}
                                        extra="Select from list if possible"
                                    >
                                        <AutoComplete
                                            options={usersSearch}
                                            onSearch={onUsersSearch}
                                            onSelect={onUserSelect}
                                        >
                                            <Input placeholder="Start typing to search for members..." />
                                        </AutoComplete>
                                    </Form.Item>
                                    {index !== 0 && (
                                        <MinusCircleOutlined
                                            onClick={() => remove(field.name)}
                                        />
                                    )}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Add author
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item name="link" label="Link">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="abstract"
                    label="Abstract"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Missing abstract',
                        },
                    ]}
                >
                    <Input.TextArea autoSize={{ minRows: 2 }} />
                </Form.Item>
                <Form.Item
                    name="correspondingAuthor"
                    extra="Select from list if possible"
                    label="Corresponding Author"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Missing corresponding author',
                        },
                    ]}
                >
                    <AutoComplete
                        options={usersSearch}
                        onSearch={onUsersSearch}
                    >
                        <Input placeholder="Start typing to search for members..." />
                    </AutoComplete>
                </Form.Item>
                <Form.Item
                    name="university"
                    label="University"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Missing university',
                        },
                    ]}
                >
                    <AutoComplete
                        options={universityOptions}
                        filterOption={(inputValue, option) =>
                            option.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="year"
                    label="Year"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Missing year',
                        },
                    ]}
                >
                    <DatePicker picker="year" />
                </Form.Item>
                <Form.Item
                    name="itemType"
                    label="Submission Type"
                    initialValue="Thesis (PhD)"
                >
                    <Select defaultValue="Thesis (PhD)">
                        <Select.Option value="Thesis (PhD)">
                            Thesis (PhD)
                        </Select.Option>
                        <Select.Option value="Thesis (Master)">
                            Thesis (Master)
                        </Select.Option>
                        <Select.Option value="Thesis (Bachelor)">
                            Thesis (Bachelor)
                        </Select.Option>
                        <Select.Option value="Journal Paper">
                            Journal Paper
                        </Select.Option>
                        <Select.Option value="Conference Paper">
                            Conference Paper
                        </Select.Option>
                        <Select.Option value="Essay">Essay</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Upload PDF">
                    <Upload.Dragger
                        name="file"
                        accept="application/pdf"
                        beforeUpload={(file) => {
                            setFile(file);
                            return false;
                        }}
                        fileList={file ? [file] : []}
                        onRemove={() => setFile(null)}
                    >
                        <InboxOutlined />
                        <br />
                        Upload/Drop PDF
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

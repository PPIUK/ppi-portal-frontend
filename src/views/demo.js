import React, { useState } from 'react';
import {
    AutoComplete,
    Button,
    Card,
    Form,
    Input,
    Radio,
    Checkbox,
    Typography,
} from 'antd';
import { FormOutlined } from '@ant-design/icons';
import axios from 'axios';

import { useAuth } from '../utils/useAuth';

// eslint-disable-next-line no-unused-vars
const schema = {
    fields: [
        {
            component: 'textarea',
            name: 'AA_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'select',
            name: 'AB',
            label:
                'Aktif mengikuti workshop yang diadakan baik oleh universitas di UK',
            options: [
                {
                    value: 'AB1',
                    label: 'Workshop terkait bidang studi',
                },
                {
                    value: 'AB2',
                    label: 'Workshop khusus terkait penelitian yang dilakukan',
                },
                {
                    value: 'AB3',
                    label: 'Workshop terkait metodologi penelitian',
                },
                {
                    value: 'AB4',
                    label:
                        'Mengikuti public seminar yang diadakan oleh universitas',
                },
                {
                    value: 'AB5',
                    label: 'Mengikuti program edukasi tahunan',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'textarea',
            name: 'AB_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'select',
            name: 'AC',
            label:
                'Ikut serta dalam kompetisi akademik yang diadakan oleh universitas di UK',
            options: [
                {
                    value: 'AC1',
                    label:
                        'Kompetisi akademik tingkat departemen (e.g. esai, karya ilmiah, debat)',
                },
                {
                    value: 'AC2',
                    label:
                        'Kompetisi akademik tingkat universitas (e.g. esai, karya ilmiah, debat)',
                },
                {
                    value: 'AC3',
                    label:
                        'Kompetisi akademik tingkat nasional (e.g. esai, karya ilmiah, debat)',
                },
                {
                    value: 'AC4',
                    label:
                        'Kompetisi akademik tingkat internasional (e.g. esai, karya ilmiah, debat)',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'textarea',
            name: 'AC_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'select',
            name: 'AD',
            label: 'Melakukan kolaborasi riset dengan dosen',
            options: [
                {
                    value: 'AD1',
                    label:
                        'Penulisan paper/artikel ilmiah bersama dosen (sudah terbit)',
                },
                {
                    value: 'AD2',
                    label:
                        'Penulisan paper/artikel ilmiah bersama dosen  (dalam proses pengerjaan/menunggu keputusan)',
                },
                {
                    value: 'AD3',
                    label:
                        'Penulisan artikel populer bersama dosen (sudah terbit)',
                },
                {
                    value: 'AD4',
                    label:
                        'Penulisan artikel populer bersama dosen  (dalam proses pengerjaan/menunggu keputusan)',
                },
                {
                    value: 'AD5',
                    label:
                        'Keterlibatan dalam proyek riset tingkat universitas',
                },
                {
                    value: 'AD6',
                    label:
                        'Keterlibatan dalam proyek riset tingkat nasional (UK)',
                },
                {
                    value: 'AD7',
                    label:
                        'Keterlibatan dalam proyek riset tingkat internasional',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'textarea',
            name: 'AD_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'select',
            name: 'AE',
            label: 'Mendapatkan bantuan pendanaan untuk kuliah',
            options: [
                {
                    value: 'AE1',
                    label: 'Full Scholarship',
                },
                {
                    value: 'AE2',
                    label: 'Partial Scholarship',
                },
                {
                    value: 'AE3',
                    label: 'Grant',
                },
                {
                    value: 'AE4',
                    label: 'Bantuan Pendanaan Riset',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'textarea',
            name: 'AE_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /A/,
            },
        },
        {
            component: 'plain-text',
            name: 'B',
            initialValue: '',
            label: 'Best Academic Contribution',
            strong: true,
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'select',
            name: 'BA',
            label: 'Publikasi Paper/Artikel/Esai',
            options: [
                {
                    value: 'BA1',
                    label:
                        'Publikasi Paper/Artikel Ilmiah di Jurnal Q1 sebagai Author',
                },
                {
                    value: 'BA2',
                    label:
                        'Publikasi Paper/Artikel Ilmiah di Jurnal Q1 sebagai Co-Author',
                },
                {
                    value: 'BA3',
                    label:
                        'Publikasi Paper/Artikel Ilmiah di Jurnal Q2 sebagai Author',
                },
                {
                    value: 'BA4',
                    label:
                        'Publikasi Paper/Artikel Ilmiah di Jurnal Q2 sebagai Co-Author',
                },
                {
                    value: 'BA5',
                    label:
                        'Publikasi Paper/Artikel Ilmiah di Jurnal Q3 sebagai Author',
                },
                {
                    value: 'BA6',
                    label:
                        'Publikasi Paper/Artikel Ilmiah di Jurnal Q3 sebagai Co-Author',
                },
                {
                    value: 'BA7',
                    label:
                        'Publikasi Paper/Artikel Ilmiah di Jurnal Q4 sebagai Author',
                },
                {
                    value: 'BA8',
                    label:
                        'Publikasi Paper/Artikel Ilmiah di Jurnal Q4 sebagai Co-Author',
                },
                {
                    value: 'BA9',
                    label: 'Publikasi Paper dalam Conference Proceeding',
                },
                {
                    value: 'BA10',
                    label: 'Publikasi Esai oleh media nasional',
                },
                {
                    value: 'BA11',
                    label: 'Publikasi Esai oleh media internasional',
                },
                {
                    value: 'BA12',
                    label:
                        'Publikasi hasil penelitian dalam bentuk working paper',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'textarea',
            name: 'BA_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'select',
            name: 'BB',
            label:
                'Berkontribusi terhadap pembaruan literatur (konseptual dan/atau empiris)',
            options: [
                {
                    value: 'BB1',
                    label: 'Memperbaharui pemahaman akan suatu teori',
                },
                {
                    value: 'BB2',
                    label: 'Membuat teori baru',
                },
                {
                    value: 'BB3',
                    label: 'Memperbaharui pemahaman akan suatu konsep',
                },
                {
                    value: 'BB4',
                    label: 'Membuat konsep baru',
                },
                {
                    value: 'BB5',
                    label: 'Mengisi empirical gap dalam suatu bidang',
                },
                {
                    value: 'BB6',
                    label:
                        'Menghasilkan penelitian  yang menggunakan pendekatan interdisipliner',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'textarea',
            name: 'BB_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'select',
            name: 'BC',
            label: 'Menjadi Pembicara di Seminar Internasional',
            options: [
                {
                    value: 'BC1',
                    label: 'Hadir sebagai keynote speaker',
                },
                {
                    value: 'BC2',
                    label: 'Hadir sebagai guest speaker',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'textarea',
            name: 'BC_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'select',
            name: 'BD',
            label:
                'Mempresentasikan karya ilmiahnya di Konferensi Akademik Internasional (author atau co-author)',
            options: [
                {
                    value: 'BD1',
                    label: 'Mempresentasikan karya ilmiah sebagai author',
                },
                {
                    value: 'BD2',
                    label: 'Mempresentasikan karya ilmiah sebagai co-author',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'textarea',
            name: 'BD_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'select',
            name: 'BE',
            label: 'HAKI/Patent yang dimiliki',
            options: [
                {
                    value: 'BE1',
                    label: 'HAKI/Patent Nasional',
                },
                {
                    value: 'BE2',
                    label: 'HAKI/Patent Internasional',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'textarea',
            name: 'B5_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /B/,
            },
        },
        {
            component: 'plain-text',
            name: 'C',
            label: 'Most Dedicated',
            strong: true,
            initialValue:
                'Menjadi discussant di berbagai seminar nasional/internasional',
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'select',
            name: 'CA',
            label:
                'Meningkatkan pemahaman masyarakat akan isu yang ditekuni dalam bentuk tulisan populer, video, ataupun karya kreatif lainnya',
            options: [
                {
                    value: 'CA1',
                    label:
                        'Publikasi tulisan populer di outlet/media nasional ',
                },
                {
                    value: 'CA2',
                    label:
                        'Publikasi tulisan populer di outlet/media internasional',
                },
                {
                    value: 'CA3',
                    label:
                        'Content-creator di Youtube/Instagram terkait isu yang ditekuni',
                },
                {
                    value: 'CA4',
                    label:
                        'Membuat situs khusus terkait isu yang ditekuni (website/blog)',
                },
                {
                    value: 'CA5',
                    label:
                        'Membuat forum virtual terkait isu yang ditekuni (whatsapp group, facebook group, et cetera)',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'textarea',
            name: 'CA_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'select',
            name: 'CB',
            label:
                'Mentrasformasi temuan penelitian atau hasil kajian akan suatu isu menjadi suatu aksi nyata/produk/institusi yang bermanfaat untuk Masyarakat/Entitas Bisnis/Pemerintah',
            options: [
                {
                    value: 'CB1',
                    label:
                        'Upaya mentransformasi hasil penelitian untuk kepentingan masyarakat di tingkat akar rumput (grassroot)',
                },
                {
                    value: 'CB2',
                    label:
                        'Upaya mentransformasi hasil penelitian untuk perekonomian/aktivitas industri',
                },
                {
                    value: 'CB3',
                    label:
                        'Upaya mentransformasi hasil penelitian untuk kebijakan publik',
                },
                {
                    value: 'CB4',
                    label:
                        'Upaya mentransformasi hasil penelitian menjadi suatu bentuk  gerakan nasional',
                },
                {
                    value: 'CB5',
                    label:
                        'Upaya mentransformasi hasil penelitian menjadi suatu bentuk  gerakan internasional',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'textarea',
            name: 'CB_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'select',
            name: 'CC',
            label:
                'Keterlibatan dalam program/aktivitas/organisasi di tingkat universitas/nasional/internasional terkait isu yang ditekuni',
            options: [
                {
                    value: 'CC1',
                    label:
                        'Menjadi INISIATOR organisasi/komunitas riset tingkat universitas',
                },
                {
                    value: 'CC2',
                    label:
                        'Menjadi ANGGOTA organisasi riset tingkat universitas',
                },
                {
                    value: 'CC3',
                    label:
                        'Menjadi INISIATOR organisasi/komunitas riset tingkat nasional',
                },
                {
                    value: 'CC4',
                    label:
                        'Menjadi ANGGOTA organisasi/komunitas riset tingkat nasional',
                },
                {
                    value: 'CC5',
                    label:
                        'Menjadi INISIATOR organisasi/komunitas riset tingkat internasional',
                },
                {
                    value: 'CC6',
                    label:
                        'Menjadi ANGGOTA organisasi/komunitas riset tingkat internasional',
                },
                {
                    value: 'CC7',
                    label:
                        'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Universitas',
                },
                {
                    value: 'CC8',
                    label:
                        'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Universitas',
                },
                {
                    value: 'CC9',
                    label:
                        'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat nasional',
                },
                {
                    value: 'CC10',
                    label:
                        'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat nasional ',
                },
                {
                    value: 'CC11',
                    label:
                        'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat internasional',
                },
                {
                    value: 'CC12',
                    label:
                        'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat internasional',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'textarea',
            name: 'CC_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'select',
            name: 'CD',
            label:
                'Menjadi discussant di berbagai seminar nasional/internasional',
            options: [
                {
                    value: 'CD1',
                    label: 'Menjadi panelist/discussant di seminar nasional',
                },
                {
                    value: 'CD2',
                    label:
                        'Menjadi panelist/discussant di seminar internasional',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'textarea',
            name: 'CD_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'select',
            name: 'CE',
            label:
                'Keterlibatan dalam proyek penelitian/industri dalam rangka penyelesaian masalah di bidang yang ditekuni',
            options: [
                {
                    value: 'CE1',
                    label:
                        'Menjalankan proyek independen untuk isu yang ditekuni (sendiri)',
                },
                {
                    value: 'CE2',
                    label:
                        'Menjalankan proyek independen untuk isu yang ditekuni (dalam tim, sebagai inisiator)',
                },
                {
                    value: 'CE3',
                    label:
                        'Menjalankan proyek independen untuk isu yang ditekuni (dalam tim, sebagai anggota)',
                },
                {
                    value: 'CE4',
                    label:
                        'Menjalankan proyek yang merupakan bentuk kerja sama dengan Pemerintah untuk isu yang ditekuni (sebagai inisiator)',
                },
                {
                    value: 'CE5',
                    label:
                        'Menjalankan proyek yang merupakan bentuk kerja sama dengan Pemerintah untuk isu yang ditekuni (mitra)',
                },
                {
                    value: 'CE6',
                    label:
                        'Menjalankan proyek yang merupakan bentuk kerja sama dengan Industri untuk isu yang ditekuni (sebagai inisiator)',
                },
                {
                    value: 'CE7',
                    label:
                        'Menjalankan proyek yang merupakan bentuk kerja sama dengan Industri untuk isu yang ditekuni (mitra)',
                },
                {
                    value: 'CE8',
                    label:
                        'Menjalankan proyek yang merupakan bentuk kerja sama dengan NGOs/IOs untuk isu yang ditekuni (sebagai inisiator)',
                },
                {
                    value: 'CE9',
                    label:
                        'Menjalankan proyek yang merupakan bentuk kerja sama dengan NGOs/IOs untuk isu yang ditekuni (mitra)',
                },
                {
                    value: 'CE10',
                    label:
                        'Menjalankan proyek yang merupakan bentuk kerja sama dengan lembaga informal untuk isu yang ditekuni (sebagai inisiator)',
                },
                {
                    value: 'CE11',
                    label:
                        'Menjalankan proyek yang merupakan bentuk kerja sama dengan lembaga informal untuk isu yang ditekuni (anggota tim)',
                },
            ],
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
        {
            component: 'textarea',
            name: 'CE_explanation',
            label: 'Penjelasan terkait poin yang dipilih',
            condition: {
                when: 'award_chosen',
                pattern: /C/,
            },
        },
    ],
};

function AcademicExcellenceSubsection({ form }) {
    return (
        <div>
            <Typography.Title level={5}>Academic Excellence</Typography.Title>
            <Form.Item name="AA">
                <Checkbox.Group
                    options={['Aktif dalam kegiatan akademik di Universitas']}
                />
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue('AA');
                    let selectedSubs = getFieldValue('AA_subs') || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item name="AA_subs">
                                <Checkbox.Group>
                                    <Checkbox
                                        value="Menjadi koordinator angkatan di program studi
                                yang ditekuni"
                                    >
                                        Menjadi koordinator angkatan di program
                                        studi yang ditekuni
                                        <Form.Item
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi koordinator angkatan di program studi yang ditekuni'
                                                )
                                            }
                                            name="AA_subs_0"
                                            noStyle
                                        >
                                            <Input placeholder="Penjelasan" />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengikuti seminar/kajian rutin yang diadakan oleh program studi">
                                        Mengikuti seminar/kajian rutin yang
                                        diadakan oleh program studi
                                        <Form.Item
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengikuti seminar/kajian rutin yang diadakan oleh program studi'
                                                )
                                            }
                                            name="AA_subs_1"
                                            noStyle
                                        >
                                            <Input placeholder="Penjelasan" />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengikuti seminar/kajian rutin yang di tingkat departemen">
                                        Mengikuti seminar/kajian rutin yang di
                                        tingkat departemen
                                        <Form.Item
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengikuti seminar/kajian rutin yang di tingkat departemen'
                                                )
                                            }
                                            name="AA_subs_2"
                                            noStyle
                                        >
                                            <Input placeholder="Penjelasan" />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengikuti seminar/kajian rutin yang di tingkat universitas">
                                        Mengikuti seminar/kajian rutin yang di
                                        tingkat universitas
                                        <Form.Item
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengikuti seminar/kajian rutin yang di tingkat universitas'
                                                )
                                            }
                                            name="AA_subs_3"
                                            noStyle
                                        >
                                            <Input placeholder="Penjelasan" />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menginisiasi suatu klub ilmiah (reading group)">
                                        Menginisiasi suatu klub ilmiah (reading
                                        group)
                                        <Form.Item
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menginisiasi suatu klub ilmiah (reading group)'
                                                )
                                            }
                                            name="AA_subs_4"
                                            noStyle
                                        >
                                            <Input placeholder="Penjelasan" />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjadi partisipan dalam klub ilmiah">
                                        Menjadi partisipan dalam klub ilmiah
                                        <Form.Item
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi partisipan dalam klub ilmiah'
                                                )
                                            }
                                            name="AA_subs_5"
                                            noStyle
                                        >
                                            <Input placeholder="Penjelasan" />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
        </div>
    );
}

const awardOptions = [
    'Academic Excellence',
    'Best Academic Contribution',
    'Most Dedicated for Tackling Real World Problems',
];

export default function DemoView() {
    const auth = useAuth();

    const [form] = Form.useForm();
    const [submitterType, setSubmitterType] = useState('Nominee');
    const [awardTypes, setAwardTypes] = useState([]);
    const [nominatedUsersSearch, setNominatedUsersSearch] = useState([]);
    const [selectedNominee, setSelectedNominee] = useState(
        'Please select a nominee'
    );

    const onUsersSearch = (val) => {
        axios
            .get('/api/profiles/search/name', {
                params: {
                    name: val,
                },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                setNominatedUsersSearch(
                    resp.data.data.map((profile) => {
                        return {
                            label: profile.fullName,
                            value: profile._id,
                        };
                    })
                );
            });
    };
    const onNomineeSelect = (val, option) => setSelectedNominee(option.label);
    const onSubmitterChange = (e) => setSubmitterType(e.target.value);
    const onAwardTypeChange = () =>
        setAwardTypes(form.getFieldValue('awardTypes'));

    return (
        <Card
            title={
                <span>
                    <FormOutlined /> MVP Awards
                </span>
            }
            extra={<Button type="primary">Save</Button>}
        >
            <Form form={form} preserve={false}>
                <Typography.Title level={5}>Data Diri</Typography.Title>
                <Form.Item
                    name="submitterType"
                    label="I am a"
                    onChange={onSubmitterChange}
                    initialValue="Nominee"
                >
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="Nominee">Nominee</Radio.Button>
                        <Radio.Button value="Nominator">Nominator</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="nominatedUser"
                    label="I am nominating"
                    hidden={submitterType != 'Nominator'}
                >
                    <AutoComplete
                        options={nominatedUsersSearch}
                        onSearch={onUsersSearch}
                        onSelect={onNomineeSelect}
                        disabled={selectedNominee !== 'Please select a nominee'}
                    >
                        <Input
                            addonBefore={selectedNominee}
                            addonAfter={
                                <Button
                                    type="link"
                                    onClick={() => {
                                        form.setFieldsValue({
                                            nominatedUser: '',
                                        });
                                        setSelectedNominee(
                                            'Please select a nominee'
                                        );
                                    }}
                                >
                                    Clear Selection
                                </Button>
                            }
                            placeholder="Start typing to search for members..."
                        />
                    </AutoComplete>
                </Form.Item>
                <Typography.Title level={5}>Kategori Award</Typography.Title>
                <Form.Item name="awardTypes" onChange={onAwardTypeChange}>
                    <Checkbox.Group options={awardOptions} />
                </Form.Item>
                {awardTypes.includes('Academic Excellence') && (
                    <AcademicExcellenceSubsection />
                )}
                {awardTypes.includes('Best Academic Contribution') && <div />}
                {awardTypes.includes(
                    'Most Dedicated for Tackling Real World Problems'
                ) && <div />}
            </Form>
            <Button type="primary">Save</Button>
            <Button
                style={{
                    backgroundColor: '#48c774',
                    color: 'white',
                    marginLeft: '5px',
                }}
            >
                Submit
            </Button>
        </Card>
    );
}

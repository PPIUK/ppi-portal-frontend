// MVP Awards Form
//
// Note: this form has no server side validation, the scoring can be easily attacked and faked
//       unfortunately we don't have time right now to do it, so let's just hope no one is
//       mischeivous enough to do so.
//       Also I know there are a lot of reused patterns that can be abstracted away but the due date :)

import React, { useEffect, useState } from 'react';
import {
    AutoComplete,
    Button,
    Card,
    Form,
    Input,
    Radio,
    Checkbox,
    Typography,
    Divider,
    Upload,
    Popover,
    Popconfirm,
    Modal,
} from 'antd';
import {
    FormOutlined,
    UploadOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';

import { useAuth } from '../../utils/useAuth';

import { useNavigate } from 'react-router-dom';

function AcademicExcellenceSubsection({ form }) {
    const onChange = () => {
        let awardIndicators = form.getFieldValue('awardIndicators') || [];
        let academicExcellenceIndicators =
            form.getFieldValue('Academic Excellence') || {};
        let indicators = {
            award: 'Academic Excellence',
            indicators: [],
        };

        for (let indicator of Object.values(academicExcellenceIndicators)) {
            const name = indicator.name[0];
            let cIndicator = {
                name: name,
                subindicators: [],
            };
            if (indicator.subindicators)
                for (let subindicator of indicator.subindicators) {
                    cIndicator.subindicators.push({
                        name: subindicator,
                        elaboration: indicator['elaborations']
                            ? indicator['elaborations'][`${subindicator}`]
                            : '',
                    });
                }
            indicators.indicators.push(cIndicator);
        }

        awardIndicators[0] = indicators;

        form.setFieldsValue({ awardIndicators: awardIndicators });
    };
    return (
        <div>
            <Typography.Title level={5}>Academic Excellence</Typography.Title>
            <Form.Item
                onChange={onChange}
                name={['Academic Excellence', 'A', 'name']}
            >
                <Checkbox.Group
                    options={['Aktif dalam kegiatan akademik di Universitas']}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Academic Excellence',
                        'A',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Academic Excellence',
                            'A',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Academic Excellence',
                                    'A',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox
                                        value="Menjadi koordinator angkatan di program studi
                                yang ditekuni"
                                    >
                                        Menjadi koordinator angkatan di program
                                        studi yang ditekuni
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi koordinator angkatan di program studi yang ditekuni'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'A',
                                                'elaborations',
                                                'Menjadi koordinator angkatan di program studi yang ditekuni',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengikuti seminar/kajian rutin yang diadakan oleh program studi">
                                        Mengikuti seminar/kajian rutin yang
                                        diadakan oleh program studi
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengikuti seminar/kajian rutin yang diadakan oleh program studi'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'A',
                                                'elaborations',
                                                'Mengikuti seminar/kajian rutin yang diadakan oleh program studi',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengikuti seminar/kajian rutin yang di tingkat departemen">
                                        Mengikuti seminar/kajian rutin yang di
                                        tingkat departemen
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengikuti seminar/kajian rutin yang di tingkat departemen'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'A',
                                                'elaborations',
                                                'Mengikuti seminar/kajian rutin yang di tingkat departemen',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengikuti seminar/kajian rutin yang di tingkat universitas">
                                        Mengikuti seminar/kajian rutin yang di
                                        tingkat universitas
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengikuti seminar/kajian rutin yang di tingkat universitas'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'A',
                                                'elaborations',
                                                'Mengikuti seminar/kajian rutin yang di tingkat universitas',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menginisiasi suatu klub ilmiah (reading group)">
                                        Menginisiasi suatu klub ilmiah (reading
                                        group)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menginisiasi suatu klub ilmiah (reading group)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'A',
                                                'elaborations',
                                                'Menginisiasi suatu klub ilmiah (reading group)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjadi partisipan dalam klub ilmiah (reading group)">
                                        Menjadi partisipan dalam klub ilmiah
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi partisipan dalam klub ilmiah (reading group)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'A',
                                                'elaborations',
                                                'Menjadi partisipan dalam klub ilmiah (reading group)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>

            <Divider />

            <Form.Item
                onChange={onChange}
                name={['Academic Excellence', 'B', 'name']}
            >
                <Checkbox.Group
                    options={[
                        'Aktif mengikuti workshop yang diadakan baik oleh universitas di UK',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Academic Excellence',
                        'B',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Academic Excellence',
                            'B',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Academic Excellence',
                                    'B',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Workshop terkait bidang studi">
                                        Workshop terkait bidang studi
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Workshop terkait bidang studi'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'B',
                                                'elaborations',
                                                'Workshop terkait bidang studi',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Workshop khusus terkait penelitian yang dilakukan">
                                        Workshop khusus terkait penelitian yang
                                        dilakukan
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Workshop khusus terkait penelitian yang dilakukan'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'B',
                                                'elaborations',
                                                'Workshop khusus terkait penelitian yang dilakukan',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Workshop terkait metodologi penelitian">
                                        Workshop terkait metodologi penelitian
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Workshop terkait metodologi penelitian'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'B',
                                                'elaborations',
                                                'Workshop terkait metodologi penelitian',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengikuti public seminar yang diadakan oleh universitas">
                                        Mengikuti public seminar yang diadakan
                                        oleh universitas
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengikuti public seminar yang diadakan oleh universitas'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'B',
                                                'elaborations',
                                                'Mengikuti public seminar yang diadakan oleh universitas',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengikuti program edukasi tahunan (e.g. summer school)">
                                        Mengikuti program edukasi tahunan (e.g.
                                        summer school)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengikuti program edukasi tahunan (e.g. summer school)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'B',
                                                'elaborations',
                                                'Mengikuti program edukasi tahunan (e.g. summer school)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>

            <Divider />

            <Form.Item
                onChange={onChange}
                name={['Academic Excellence', 'C', 'name']}
            >
                <Checkbox.Group
                    options={[
                        'Ikut serta dalam kompetisi akademik yang diadakan oleh universitas di UK',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Academic Excellence',
                        'C',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Academic Excellence',
                            'C',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Academic Excellence',
                                    'C',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Kompetisi akademik tingkat departemen (e.g. esai, karya ilmiah, debat)">
                                        Kompetisi akademik tingkat departemen
                                        (e.g. esai, karya ilmiah, debat)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Kompetisi akademik tingkat departemen (e.g. esai, karya ilmiah, debat)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'C',
                                                'elaborations',
                                                'Kompetisi akademik tingkat departemen (e.g. esai, karya ilmiah, debat)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Kompetisi akademik tingkat universitas (e.g. esai, karya ilmiah, debat)">
                                        Kompetisi akademik tingkat universitas
                                        (e.g. esai, karya ilmiah, debat)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Kompetisi akademik tingkat universitas (e.g. esai, karya ilmiah, debat)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'C',
                                                'elaborations',
                                                'Kompetisi akademik tingkat universitas (e.g. esai, karya ilmiah, debat)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Kompetisi akademik tingkat nasional (se-UK) (e.g. esai, karya ilmiah, debat)">
                                        Kompetisi akademik tingkat nasional
                                        (se-UK) (e.g. esai, karya ilmiah, debat)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Kompetisi akademik tingkat nasional (se-UK) (e.g. esai, karya ilmiah, debat)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'C',
                                                'elaborations',
                                                'Kompetisi akademik tingkat nasional (se-UK) (e.g. esai, karya ilmiah, debat)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Kompetisi akademik tingkat internasional (e.g. esai, karya ilmiah, debat)">
                                        Kompetisi akademik tingkat internasional
                                        (e.g. esai, karya ilmiah, debat)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Kompetisi akademik tingkat internasional (e.g. esai, karya ilmiah, debat)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'C',
                                                'elaborations',
                                                'Kompetisi akademik tingkat internasional (e.g. esai, karya ilmiah, debat)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>

            <Divider />

            <Form.Item
                onChange={onChange}
                name={['Academic Excellence', 'D', 'name']}
            >
                <Checkbox.Group
                    options={['Melakukan kolaborasi riset dengan dosen']}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Academic Excellence',
                        'D',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Academic Excellence',
                            'D',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Academic Excellence',
                                    'D',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Penulisan paper/artikel ilmiah bersama dosen (sudah terbit)">
                                        Penulisan paper/artikel ilmiah bersama
                                        dosen (sudah terbit)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Penulisan paper/artikel ilmiah bersama dosen (sudah terbit)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'D',
                                                'elaborations',
                                                'Penulisan paper/artikel ilmiah bersama dosen (sudah terbit)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Penulisan paper/artikel ilmiah bersama dosen (dalam proses pengerjaan/menunggu keputusan)">
                                        Penulisan paper/artikel ilmiah bersama
                                        dosen (dalam proses pengerjaan/menunggu
                                        keputusan)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Penulisan paper/artikel ilmiah bersama dosen (dalam proses pengerjaan/menunggu keputusan)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'D',
                                                'elaborations',
                                                'Penulisan paper/artikel ilmiah bersama dosen (dalam proses pengerjaan/menunggu keputusan)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Penulisan artikel populer bersama dosen (sudah terbit)">
                                        Penulisan artikel populer bersama dosen
                                        (sudah terbit)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Penulisan artikel populer bersama dosen (sudah terbit)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'D',
                                                'elaborations',
                                                'Penulisan artikel populer bersama dosen (sudah terbit)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Penulisan artikel populer bersama dosen (dalam proses pengerjaan/menunggu keputusan)">
                                        Penulisan artikel populer bersama dosen
                                        (dalam proses pengerjaan/menunggu
                                        keputusan)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Penulisan artikel populer bersama dosen (dalam proses pengerjaan/menunggu keputusan)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'D',
                                                'elaborations',
                                                'Penulisan artikel populer bersama dosen (dalam proses pengerjaan/menunggu keputusan)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Keterlibatan dalam proyek riset tingkat universitas">
                                        Keterlibatan dalam proyek riset tingkat
                                        universitas
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Keterlibatan dalam proyek riset tingkat universitas'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'D',
                                                'elaborations',
                                                'Keterlibatan dalam proyek riset tingkat universitas',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Keterlibatan dalam proyek riset tingkat nasional (UK)">
                                        Keterlibatan dalam proyek riset tingkat
                                        nasional (UK)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Keterlibatan dalam proyek riset tingkat nasional (UK)'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'D',
                                                'elaborations',
                                                'Keterlibatan dalam proyek riset tingkat nasional (UK)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Keterlibatan dalam proyek riset tingkat internasional">
                                        Keterlibatan dalam proyek riset tingkat
                                        internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Keterlibatan dalam proyek riset tingkat internasional'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'D',
                                                'elaborations',
                                                'KKeterlibatan dalam proyek riset tingkat internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>

            <Divider />

            <Form.Item
                onChange={onChange}
                name={['Academic Excellence', 'E', 'name']}
            >
                <Checkbox.Group
                    options={['Mendapatkan bantuan pendanaan untuk kuliah']}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Academic Excellence',
                        'E',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Academic Excellence',
                            'E',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Academic Excellence',
                                    'E',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Full Scholarship">
                                        Full Scholarship
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Full Scholarship'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'E',
                                                'elaborations',
                                                'Full Scholarship',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Partial Scholarship">
                                        Partial Scholarship
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Partial Scholarship'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'E',
                                                'elaborations',
                                                'Partial Scholarship',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Grant">
                                        Mengikuti seminar/kajian rutin yang di
                                        tingkat departemen
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes('Grant')
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'E',
                                                'elaborations',
                                                'Grant',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Bantuan Pendanaan Riset">
                                        Bantuan Pendanaan Riset
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Bantuan Pendanaan Riset'
                                                )
                                            }
                                            name={[
                                                'Academic Excellence',
                                                'E',
                                                'elaborations',
                                                'Bantuan Pendanaan Riset',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
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

function BestAcademicContribSubsection({ form }) {
    const onChange = () => {
        let awardIndicators = form.getFieldValue('awardIndicators') || [];
        let BACIndicators =
            form.getFieldValue('Best Academic Contribution') || {};
        let indicators = {
            award: 'Best Academic Contribution',
            indicators: [],
        };

        for (let indicator of Object.values(BACIndicators)) {
            const name = indicator.name[0];
            let cIndicator = {
                name: name,
                subindicators: [],
            };
            if (indicator.subindicators)
                for (let subindicator of indicator.subindicators) {
                    cIndicator.subindicators.push({
                        name: subindicator,
                        elaboration: indicator['elaborations']
                            ? indicator['elaborations'][`${subindicator}`]
                            : '',
                    });
                }
            indicators.indicators.push(cIndicator);
        }

        awardIndicators[1] = indicators;

        form.setFieldsValue({ awardIndicators: awardIndicators });
    };
    return (
        <div>
            <Typography.Title level={5}>
                Best Academic Contribution
            </Typography.Title>

            <Form.Item
                onChange={onChange}
                name={['Best Academic Contribution', 'A', 'name']}
            >
                <Checkbox.Group options={['Publikasi Paper/Artikel/Esai']} />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Best Academic Contribution',
                        'A',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Best Academic Contribution',
                            'A',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Best Academic Contribution',
                                    'A',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Publikasi Paper/Artikel Ilmiah di Jurnal Q1 sebagai Author">
                                        Publikasi Paper/Artikel Ilmiah di Jurnal
                                        Q1 sebagai <strong>Author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper/Artikel Ilmiah di Jurnal Q1 sebagai Author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper/Artikel Ilmiah di Jurnal Q1 sebagai Author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi Paper/Artikel Ilmiah di Jurnal Q2 sebagai Author">
                                        Publikasi Paper/Artikel Ilmiah di Jurnal
                                        Q2 sebagai <strong>Author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper/Artikel Ilmiah di Jurnal Q2 sebagai Author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper/Artikel Ilmiah di Jurnal Q2 sebagai Author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi Paper/Artikel Ilmiah di Jurnal Q3 sebagai Author">
                                        Publikasi Paper/Artikel Ilmiah di Jurnal
                                        Q3 sebagai <strong>Author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper/Artikel Ilmiah di Jurnal Q3 sebagai Author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper/Artikel Ilmiah di Jurnal Q3 sebagai Author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi Paper/Artikel Ilmiah di Jurnal Q4 sebagai Author">
                                        Publikasi Paper/Artikel Ilmiah di Jurnal
                                        Q4 sebagai <strong>Author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper/Artikel Ilmiah di Jurnal Q4 sebagai Author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper/Artikel Ilmiah di Jurnal Q4 sebagai Author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Publikasi Paper/Artikel Ilmiah di Jurnal Q1 sebagai Co-Author">
                                        Publikasi Paper/Artikel Ilmiah di Jurnal
                                        Q1 sebagai <strong>Co-Author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper/Artikel Ilmiah di Jurnal Q1 sebagai Co-Author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper/Artikel Ilmiah di Jurnal Q1 sebagai Co-Author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi Paper/Artikel Ilmiah di Jurnal Q2 sebagai Co-Author">
                                        Publikasi Paper/Artikel Ilmiah di Jurnal
                                        Q2 sebagai <strong>Co-Author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper/Artikel Ilmiah di Jurnal Q2 sebagai Co-Author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper/Artikel Ilmiah di Jurnal Q2 sebagai Co-Author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi Paper/Artikel Ilmiah di Jurnal Q3 sebagai Co-Author">
                                        Publikasi Paper/Artikel Ilmiah di Jurnal
                                        Q3 sebagai <strong>Co-Author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper/Artikel Ilmiah di Jurnal Q3 sebagai Co-Author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper/Artikel Ilmiah di Jurnal Q3 sebagai Co-Author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi Paper/Artikel Ilmiah di Jurnal Q4 sebagai Co-Author">
                                        Publikasi Paper/Artikel Ilmiah di Jurnal
                                        Q4 sebagai <strong>Co-Author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper/Artikel Ilmiah di Jurnal Q4 sebagai Co-Author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper/Artikel Ilmiah di Jurnal Q4 sebagai Co-Author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Publikasi Paper dalam Conference Proceeding">
                                        Publikasi Paper dalam Conference
                                        Proceeding
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Paper dalam Conference Proceeding'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Paper dalam Conference Proceeding',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi Esai oleh media nasional">
                                        Publikasi Esai oleh media nasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Esai oleh media nasional'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Esai oleh media nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi Esai oleh media internasional">
                                        Publikasi Esai oleh media internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi Esai oleh media internasional'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi Esai oleh media internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi hasil penelitian dalam bentuk working paper">
                                        Publikasi hasil penelitian dalam bentuk
                                        working paper
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi hasil penelitian dalam bentuk working paper'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'A',
                                                'elaborations',
                                                'Publikasi hasil penelitian dalam bentuk working paper',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
            <Divider />

            <Form.Item
                onChange={onChange}
                name={['Best Academic Contribution', 'B', 'name']}
            >
                <Checkbox.Group
                    options={[
                        'Berkontribusi terhadap pembaruan literatur (konseptual dan/atau empiris)',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Best Academic Contribution',
                        'B',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Best Academic Contribution',
                            'B',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Best Academic Contribution',
                                    'B',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Memperbaharui pemahaman akan suatu teori">
                                        Memperbaharui pemahaman akan suatu teori
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Memperbaharui pemahaman akan suatu teori'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'B',
                                                'elaborations',
                                                'Memperbaharui pemahaman akan suatu teori',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Membuat teori baru">
                                        Membuat teori baru
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Membuat teori baru'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'B',
                                                'elaborations',
                                                'Membuat teori baru',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Memperbaharui pemahaman akan suatu konsep">
                                        Memperbaharui pemahaman akan suatu
                                        konsep
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Memperbaharui pemahaman akan suatu konsep'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'B',
                                                'elaborations',
                                                'Memperbaharui pemahaman akan suatu konsep',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Membuat konsep baru">
                                        Membuat konsep baru
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Membuat konsep baru'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'B',
                                                'elaborations',
                                                'Membuat konsep baru',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Mengisi empirical gap dalam suatu bidang">
                                        Mengisi empirical gap dalam suatu bidang
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Mengisi empirical gap dalam suatu bidang'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'B',
                                                'elaborations',
                                                'Mengisi empirical gap dalam suatu bidang',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menghasilkan penelitian yang menggunakan pendekatan interdisipliner">
                                        Menghasilkan penelitian yang menggunakan
                                        pendekatan interdisipliner
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menghasilkan penelitian yang menggunakan pendekatan interdisipliner'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'B',
                                                'elaborations',
                                                'Menghasilkan penelitian yang menggunakan pendekatan interdisipliner',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
            <Divider />

            <Form.Item
                onChange={onChange}
                name={['Best Academic Contribution', 'C', 'name']}
            >
                <Checkbox.Group
                    options={['Menjadi Pembicara di Seminar Internasional']}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Best Academic Contribution',
                        'C',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Best Academic Contribution',
                            'C',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Best Academic Contribution',
                                    'C',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Hadir sebagai keynote speaker">
                                        Hadir sebagai keynote speaker
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Hadir sebagai keynote speaker'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'C',
                                                'elaborations',
                                                'Hadir sebagai keynote speaker',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Hadir sebagai guest speaker">
                                        Hadir sebagai guest speaker
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Hadir sebagai guest speaker'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'C',
                                                'elaborations',
                                                'Hadir sebagai guest speaker',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
            <Divider />

            <Form.Item
                onChange={onChange}
                name={['Best Academic Contribution', 'D', 'name']}
            >
                <Checkbox.Group
                    options={[
                        'Karya ilmiahnya dipresentasikan di Konferensi Akademik Internasional (author atau co-author)',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Best Academic Contribution',
                        'D',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Best Academic Contribution',
                            'D',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Best Academic Contribution',
                                    'D',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Karya ilmiahnya dipresentasikan di Konferensi Akademik Internasional ilmiah sebagai author">
                                        Karya ilmiahnya dipresentasikan di
                                        Konferensi Akademik Internasional ilmiah
                                        sebagai <strong>author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Karya ilmiahnya dipresentasikan di Konferensi Akademik Internasional ilmiah sebagai author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'D',
                                                'elaborations',
                                                'Karya ilmiahnya dipresentasikan di Konferensi Akademik Internasional ilmiah sebagai author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Karya ilmiahnya dipresentasikan di Konferensi Akademik Internasional ilmiah sebagai co-author">
                                        Karya ilmiahnya dipresentasikan di
                                        Konferensi Akademik Internasional ilmiah
                                        sebagai <strong>co-author</strong>
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Karya ilmiahnya dipresentasikan di Konferensi Akademik Internasional ilmiah sebagai co-author'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'D',
                                                'elaborations',
                                                'Karya ilmiahnya dipresentasikan di Konferensi Akademik Internasional ilmiah sebagai co-author',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
            <Divider />

            <Form.Item
                onChange={onChange}
                name={['Best Academic Contribution', 'E', 'name']}
            >
                <Checkbox.Group options={['HAKI/Patent yang dimiliki']} />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Best Academic Contribution',
                        'E',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Best Academic Contribution',
                            'E',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Best Academic Contribution',
                                    'E',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="HAKI/Paten Nasional">
                                        HAKI/Paten Nasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'HAKI/Paten Nasional'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'E',
                                                'elaborations',
                                                'HAKI/Paten Nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="HAKI/Paten Internasional">
                                        HAKI/Paten Internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'HAKI/Paten Internasional'
                                                )
                                            }
                                            name={[
                                                'Best Academic Contribution',
                                                'E',
                                                'elaborations',
                                                'HAKI/Paten Internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
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

function RealWorldSubsection({ form }) {
    const onChange = () => {
        let awardIndicators = form.getFieldValue('awardIndicators') || [];
        let realWorldIndicators =
            form.getFieldValue(
                'Most Dedicated for Tackling Real World Problems'
            ) || {};
        let indicators = {
            award: 'Most Dedicated for Tackling Real World Problems',
            indicators: [],
        };

        for (let indicator of Object.values(realWorldIndicators)) {
            const name = indicator.name[0];
            let cIndicator = {
                name: name,
                subindicators: [],
            };
            if (indicator.subindicators)
                for (let subindicator of indicator.subindicators) {
                    cIndicator.subindicators.push({
                        name: subindicator,
                        elaboration: indicator['elaborations']
                            ? indicator['elaborations'][`${subindicator}`]
                            : '',
                    });
                }
            indicators.indicators.push(cIndicator);
        }

        awardIndicators[2] = indicators;

        form.setFieldsValue({ awardIndicators: awardIndicators });
    };

    return (
        <div>
            <Typography.Title level={5}>
                Most Dedicated for Tackling Real World Problems
            </Typography.Title>

            <Form.Item
                onChange={onChange}
                name={[
                    'Most Dedicated for Tackling Real World Problems',
                    'A',
                    'name',
                ]}
            >
                <Checkbox.Group
                    options={[
                        'Meningkatkan pemahaman masyarakat akan isu yang ditekuni dalam bentuk tulisan populer, video, ataupun karya kreatif lainnya',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Most Dedicated for Tackling Real World Problems',
                        'A',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Most Dedicated for Tackling Real World Problems',
                            'A',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Most Dedicated for Tackling Real World Problems',
                                    'A',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Publikasi tulisan populer di outlet/media publikasi nasional">
                                        Publikasi tulisan populer di
                                        outlet/media publikasi nasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi tulisan populer di outlet/media publikasi nasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'A',
                                                'elaborations',
                                                'Publikasi tulisan populer di outlet/media publikasi nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Publikasi tulisan populer di outlet/media publikasi internasional">
                                        Publikasi tulisan populer di
                                        outlet/media publikasi internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Publikasi tulisan populer di outlet/media publikasi internasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'A',
                                                'elaborations',
                                                'Publikasi tulisan populer di outlet/media publikasi internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Content-creator di Youtube/Instagram terkait isu yang ditekuni">
                                        Content-creator di Youtube/Instagram
                                        terkait isu yang ditekuni
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Content-creator di Youtube/Instagram terkait isu yang ditekuni'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'A',
                                                'elaborations',
                                                'Content-creator di Youtube/Instagram terkait isu yang ditekuni',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Membuat situs khusus terkait isu yang ditekuni (website/blog)">
                                        Membuat situs khusus terkait isu yang
                                        ditekuni (website/blog){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Membuat situs khusus terkait isu yang ditekuni (website/blog)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'A',
                                                'elaborations',
                                                'Membuat situs khusus terkait isu yang ditekuni (website/blog)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Membuat forum virtual terkait isu yang ditekuni (whatsapp group, facebook group, et cetera )">
                                        Membuat forum virtual terkait isu yang
                                        ditekuni (whatsapp group, facebook
                                        group, et cetera ){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Membuat forum virtual terkait isu yang ditekuni (whatsapp group, facebook group, et cetera )'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'A',
                                                'elaborations',
                                                'Membuat forum virtual terkait isu yang ditekuni (whatsapp group, facebook group, et cetera )',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
            <Divider />

            <Form.Item
                onChange={onChange}
                name={[
                    'Most Dedicated for Tackling Real World Problems',
                    'B',
                    'name',
                ]}
            >
                <Checkbox.Group
                    options={[
                        'Mentrasformasi temuan penelitian atau hasil kajian akan suatu isu menjadi suatu aksi nyata/produk/institusi',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Most Dedicated for Tackling Real World Problems',
                        'B',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Most Dedicated for Tackling Real World Problems',
                            'B',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Most Dedicated for Tackling Real World Problems',
                                    'B',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Upaya mentransformasi hasil penelitian untuk kepentingan masyarakat di tingkat akar rumput (grassroot)">
                                        Upaya mentransformasi hasil penelitian
                                        untuk kepentingan masyarakat di tingkat
                                        akar rumput (grassroot)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Upaya mentransformasi hasil penelitian untuk kepentingan masyarakat di tingkat akar rumput (grassroot)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'B',
                                                'elaborations',
                                                'Upaya mentransformasi hasil penelitian untuk kepentingan masyarakat di tingkat akar rumput (grassroot)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Upaya mentransformasi hasil penelitian untuk perekonomian/aktivitas industri">
                                        Upaya mentransformasi hasil penelitian
                                        untuk perekonomian/aktivitas industri
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Upaya mentransformasi hasil penelitian untuk perekonomian/aktivitas industri'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'B',
                                                'elaborations',
                                                'Upaya mentransformasi hasil penelitian untuk perekonomian/aktivitas industri',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Upaya mentransformasi hasil penelitian untuk kebijakan publik">
                                        Upaya mentransformasi hasil penelitian
                                        untuk kebijakan publik
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Upaya mentransformasi hasil penelitian untuk kebijakan publik'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'B',
                                                'elaborations',
                                                'Upaya mentransformasi hasil penelitian untuk kebijakan publik',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Upaya mentransformasi hasil penelitian menjadi suatu bentuk gerakan nasional">
                                        Upaya mentransformasi hasil penelitian
                                        menjadi suatu bentuk gerakan nasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Upaya mentransformasi hasil penelitian menjadi suatu bentuk gerakan nasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'B',
                                                'elaborations',
                                                'Upaya mentransformasi hasil penelitian menjadi suatu bentuk gerakan nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Upaya mentransformasi hasil penelitian menjadi suatu bentuk gerakan internasional">
                                        Upaya mentransformasi hasil penelitian
                                        menjadi suatu bentuk gerakan
                                        internasional{' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Upaya mentransformasi hasil penelitian menjadi suatu bentuk gerakan internasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'B',
                                                'elaborations',
                                                'Upaya mentransformasi hasil penelitian menjadi suatu bentuk gerakan internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
            <Divider />

            <Form.Item
                onChange={onChange}
                name={[
                    'Most Dedicated for Tackling Real World Problems',
                    'C',
                    'name',
                ]}
            >
                <Checkbox.Group
                    options={[
                        'Keterlibatan dalam program/aktivitas/organisa si di tingkat universitas/nasional/intern asional terkait isu yang ditekuni',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Most Dedicated for Tackling Real World Problems',
                        'C',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Most Dedicated for Tackling Real World Problems',
                            'C',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Most Dedicated for Tackling Real World Problems',
                                    'C',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Menjadi INISIATOR organisasi/komunitas riset tingkat universitas">
                                        Menjadi INISIATOR organisasi/komunitas
                                        riset tingkat universitas
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi INISIATOR organisasi/komunitas riset tingkat universitas'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Menjadi INISIATOR organisasi/komunitas riset tingkat universitas',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjadi ANGGOTA organisasi/komunitas riset tingkat universitas">
                                        Menjadi ANGGOTA organisasi/komunitas
                                        riset tingkat universitas
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi ANGGOTA organisasi/komunitas riset tingkat universitas'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Menjadi ANGGOTA organisasi/komunitas riset tingkat universitas',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Menjadi INISIATOR organisasi/komunitas riset tingkat nasional">
                                        Menjadi INISIATOR organisasi/komunitas
                                        riset tingkat nasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi INISIATOR organisasi/komunitas riset tingkat nasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Menjadi INISIATOR organisasi/komunitas riset tingkat nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjadi ANGGOTA organisasi/komunitas riset tingkat nasional">
                                        Menjadi ANGGOTA organisasi/komunitas
                                        riset tingkat nasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi ANGGOTA organisasi/komunitas riset tingkat nasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Menjadi ANGGOTA organisasi/komunitas riset tingkat nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Menjadi INISIATOR organisasi/komunitas riset tingkat internasional">
                                        Menjadi INISIATOR organisasi/komunitas
                                        riset tingkat internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi INISIATOR organisasi/komunitas riset tingkat internasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Menjadi INISIATOR organisasi/komunitas riset tingkat internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjadi ANGGOTA organisasi/komunitas riset tingkat internasional">
                                        Menjadi ANGGOTA organisasi/komunitas
                                        riset tingkat internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi ANGGOTA organisasi/komunitas riset tingkat internasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Menjadi ANGGOTA organisasi/komunitas riset tingkat internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Universitas">
                                        Terlibat sebagai INISIATOR dalam
                                        program/aktivitas terkait isu yang
                                        ditekuni (e.g. charity/free meal
                                        programmes) di tingkat Universitas{' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Universitas'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Universitas',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Universitas">
                                        Terlibat sebagai ANGGOTA dalam
                                        program/aktivitas terkait isu yang
                                        ditekuni (e.g. charity/free meal
                                        programmes) di tingkat Universitas{' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Universitas'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Universitas',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Nasional">
                                        Terlibat sebagai INISIATOR dalam
                                        program/aktivitas terkait isu yang
                                        ditekuni (e.g. charity/free meal
                                        programmes) di tingkat Nasional{' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Nasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Nasional">
                                        Terlibat sebagai ANGGOTA dalam
                                        program/aktivitas terkait isu yang
                                        ditekuni (e.g. charity/free meal
                                        programmes) di tingkat Nasional{' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Nasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat Nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat internasional">
                                        Terlibat sebagai INISIATOR dalam
                                        program/aktivitas terkait isu yang
                                        ditekuni (e.g. charity/free meal
                                        programmes) di tingkat internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat internasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Terlibat sebagai INISIATOR dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat internasional">
                                        Terlibat sebagai ANGGOTA dalam
                                        program/aktivitas terkait isu yang
                                        ditekuni (e.g. charity/free meal
                                        programmes) di tingkat internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat internasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'C',
                                                'elaborations',
                                                'Terlibat sebagai ANGGOTA dalam program/aktivitas terkait isu yang ditekuni (e.g. charity/free meal programmes) di tingkat internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
            <Divider />

            <Form.Item
                onChange={onChange}
                name={[
                    'Most Dedicated for Tackling Real World Problems',
                    'D',
                    'name',
                ]}
            >
                <Checkbox.Group
                    options={[
                        'Menjadi discussant di berbagai seminar/forum nasional/internasional',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Most Dedicated for Tackling Real World Problems',
                        'D',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Most Dedicated for Tackling Real World Problems',
                            'D',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Most Dedicated for Tackling Real World Problems',
                                    'D',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Menjadi panelist/discussant di seminar/forum nasional">
                                        Menjadi panelist/discussant di
                                        seminar/forum nasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi panelist/discussant di seminar/forum nasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'D',
                                                'elaborations',
                                                'Menjadi panelist/discussant di seminar/forum nasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjadi panelist/discussant di seminar/forum internasional">
                                        Menjadi panelist/discussant di
                                        seminar/forum internasional
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjadi panelist/discussant di seminar/forum internasional'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'D',
                                                'elaborations',
                                                'Menjadi panelist/discussant di seminar/forum internasional',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    ) : null;
                }}
            </Form.Item>
            <Divider />

            <Form.Item
                onChange={onChange}
                name={[
                    'Most Dedicated for Tackling Real World Problems',
                    'E',
                    'name',
                ]}
            >
                <Checkbox.Group
                    options={[
                        'Keterlibatan dalam proyek penelitian/industri dalam rangka penyelesaian masalah',
                    ]}
                />
            </Form.Item>
            <Form.Item onChange={onChange} shouldUpdate noStyle>
                {({ getFieldValue }) => {
                    let val = getFieldValue([
                        'Most Dedicated for Tackling Real World Problems',
                        'E',
                        'name',
                    ]);
                    let selectedSubs =
                        getFieldValue([
                            'Most Dedicated for Tackling Real World Problems',
                            'E',
                            'subindicators',
                        ]) || [];
                    return val && val.length > 0 ? (
                        <>
                            <Typography.Text>Pilih subkategori</Typography.Text>
                            <Form.Item
                                onChange={onChange}
                                name={[
                                    'Most Dedicated for Tackling Real World Problems',
                                    'E',
                                    'subindicators',
                                ]}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="Menjalankan proyek independen untuk isu yang ditekuni (sendiri)">
                                        Menjalankan proyek independen untuk isu
                                        yang ditekuni (sendiri)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek independen untuk isu yang ditekuni (sendiri)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek independen untuk isu yang ditekuni (sendiri)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjalankan proyek independen untuk isu yang ditekuni (dalam tim, sebagai inisiator)">
                                        Menjalankan proyek independen untuk isu
                                        yang ditekuni (dalam tim, sebagai
                                        inisiator)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek independen untuk isu yang ditekuni (dalam tim, sebagai inisiator)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek independen untuk isu yang ditekuni (dalam tim, sebagai inisiator)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjalankan proyek independen untuk isu yang ditekuni (dalam tim, sebagai anggota)">
                                        Menjalankan proyek independen untuk isu
                                        yang ditekuni (dalam tim, sebagai
                                        anggota)
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek independen untuk isu yang ditekuni (dalam tim, sebagai anggota)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek independen untuk isu yang ditekuni (dalam tim, sebagai anggota)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Menjalankan proyek yang merupakan bentuk kerja sama dengan Pemerintah untuk isu yang ditekuni (sebagai inisiator)">
                                        Menjalankan proyek yang merupakan bentuk
                                        kerja sama dengan Pemerintah untuk isu
                                        yang ditekuni (sebagai inisiator){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek yang merupakan bentuk kerja sama dengan Pemerintah untuk isu yang ditekuni (sebagai inisiator)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek yang merupakan bentuk kerja sama dengan Pemerintah untuk isu yang ditekuni (sebagai inisiator)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjalankan proyek yang merupakan bentuk kerja sama dengan Pemerintah untuk isu yang ditekuni (sebagai mitra)">
                                        Menjalankan proyek yang merupakan bentuk
                                        kerja sama dengan Pemerintah untuk isu
                                        yang ditekuni (sebagai mitra){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek yang merupakan bentuk kerja sama dengan Pemerintah untuk isu yang ditekuni (sebagai mitra)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek yang merupakan bentuk kerja sama dengan Pemerintah untuk isu yang ditekuni (sebagai mitra)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Menjalankan proyek yang merupakan bentuk kerja sama dengan Industri untuk isu yang ditekuni (sebagai inisiator)">
                                        Menjalankan proyek yang merupakan bentuk
                                        kerja sama dengan Industri untuk isu
                                        yang ditekuni (sebagai inisiator){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek yang merupakan bentuk kerja sama dengan Industri untuk isu yang ditekuni (sebagai inisiator)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek yang merupakan bentuk kerja sama dengan Industri untuk isu yang ditekuni (sebagai inisiator)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjalankan proyek yang merupakan bentuk kerja sama dengan Industri untuk isu yang ditekuni (sebagai mitra)">
                                        Menjalankan proyek yang merupakan bentuk
                                        kerja sama dengan Industri untuk isu
                                        yang ditekuni (sebagai mitra){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek yang merupakan bentuk kerja sama dengan Industri untuk isu yang ditekuni (sebagai mitra)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek yang merupakan bentuk kerja sama dengan Industri untuk isu yang ditekuni (sebagai mitra)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <br />
                                    <Checkbox value="Menjalankan proyek yang merupakan bentuk kerja sama dengan NGOs/IOs untuk isu yang ditekuni (sebagai inisiator)">
                                        Menjalankan proyek yang merupakan bentuk
                                        kerja sama dengan NGOs/IOs untuk isu
                                        yang ditekuni (sebagai inisiator){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek yang merupakan bentuk kerja sama dengan NGOs/IOs untuk isu yang ditekuni (sebagai inisiator)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek yang merupakan bentuk kerja sama dengan NGOs/IOs untuk isu yang ditekuni (sebagai inisiator)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjalankan proyek yang merupakan bentuk kerja sama dengan NGOs/IOs untuk isu yang ditekuni (sebagai mitra)">
                                        Menjalankan proyek yang merupakan bentuk
                                        kerja sama dengan NGOs/IOs untuk isu
                                        yang ditekuni (sebagai mitra){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek yang merupakan bentuk kerja sama dengan NGOs/IOs untuk isu yang ditekuni (sebagai mitra)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek yang merupakan bentuk kerja sama dengan NGOs/IOs untuk isu yang ditekuni (sebagai mitra)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>

                                    <br />
                                    <br />

                                    <Checkbox value="Menjalankan proyek yang merupakan bentuk kerja sama dengan Lembaga Informal untuk isu yang ditekuni (sebagai inisiator)">
                                        Menjalankan proyek yang merupakan bentuk
                                        kerja sama dengan Lembaga Informal untuk
                                        isu yang ditekuni (sebagai inisiator){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek yang merupakan bentuk kerja sama dengan Lembaga Informal untuk isu yang ditekuni (sebagai inisiator)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek yang merupakan bentuk kerja sama dengan Lembaga Informal untuk isu yang ditekuni (sebagai inisiator)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
                                        </Form.Item>
                                    </Checkbox>
                                    <br />
                                    <Checkbox value="Menjalankan proyek yang merupakan bentuk kerja sama dengan Lembaga Informal untuk isu yang ditekuni (sebagai mitra)">
                                        Menjalankan proyek yang merupakan bentuk
                                        kerja sama dengan Lembaga Informal untuk
                                        isu yang ditekuni (sebagai mitra){' '}
                                        <Form.Item
                                            onChange={onChange}
                                            hidden={
                                                !selectedSubs.includes(
                                                    'Menjalankan proyek yang merupakan bentuk kerja sama dengan Lembaga Informal untuk isu yang ditekuni (sebagai mitra)'
                                                )
                                            }
                                            name={[
                                                'Most Dedicated for Tackling Real World Problems',
                                                'E',
                                                'elaborations',
                                                'Menjalankan proyek yang merupakan bentuk kerja sama dengan Lembaga Informal untuk isu yang ditekuni (sebagai mitra)',
                                            ]}
                                            noStyle
                                        >
                                            <Input.TextArea
                                                rows={4}
                                                placeholder="Penjelasan"
                                            />
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

function alreadySubmitted(message, navigate) {
    let secondsToGo = 5;
    const modal = Modal.info({
        title: 'Form Submitted',
        content: `${message} You will be redirected in ${secondsToGo} seconds`,
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: `${message} You will be redirected in ${secondsToGo} seconds`,
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
        navigate('/app/profile/me');
    }, secondsToGo * 1005);
}

export default function MVPAwardFormView() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [submitterType, setSubmitterType] = useState('Nominee');
    const [awardTypes, setAwardTypes] = useState([]);
    const [nominatedUsersSearch, setNominatedUsersSearch] = useState([]);
    const [selectedNominee, setSelectedNominee] = useState(
        'Please select a nominee'
    );
    const [uploadFileList, setUploadFileList] = useState([]);

    const onFileChoose = (e) => setUploadFileList([...e.fileList].slice(-1));
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

    const submitForm = (vals) => {
        axios
            .post(
                '/api/forms/mvpawards/edit',
                {
                    ...vals,
                    awardIndicators: form.getFieldValue('awardIndicators'),
                    submitted: true,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            )
            .then(() => {
                alreadySubmitted(
                    'Form has been submitted successfully!',
                    navigate
                );
            })
            .catch(() => {
                Modal.error({
                    title: 'Error',
                    content:
                        'A server error has occured, please try again in a moment',
                });
            });
    };

    useEffect(() => {
        form.setFieldsValue({ awardIndicators: [] });
    }, []);

    useEffect(() => {
        axios
            .get('/api/forms/mvpawards/edit', {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                if (resp.data.data && resp.data.data.submitted)
                    alreadySubmitted(
                        'Form has already been submitted!',
                        navigate
                    );
            });
    }, []);

    return (
        <Card
            title={
                <span>
                    <FormOutlined /> MVP Awards
                </span>
            }
        >
            <Form form={form} preserve={false} onFinish={submitForm}>
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
                    <Typography.Text type="secondary">
                        If you cannot find the user you want to nominate, please
                        ask them to go to{' '}
                        <Typography.Link href="https://portal.ppiuk.org/register">
                            https://portal.ppiuk.org/register
                        </Typography.Link>{' '}
                        to create a user on the member portal
                    </Typography.Text>
                </Form.Item>

                <Form.Item
                    name="areaOfStudy"
                    label="Area of study"
                    initialValue="Natural Science"
                >
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="Natural Science">
                            Natural Science
                        </Radio.Button>
                        <Radio.Button value="Social Science & Humanities">
                            Social Science & Humanities
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Typography.Title level={5}>Kategori Award</Typography.Title>
                <Form.Item name="awardTypes" onChange={onAwardTypeChange}>
                    <Checkbox.Group options={awardOptions} />
                </Form.Item>
                {awardTypes.includes('Academic Excellence') && (
                    <AcademicExcellenceSubsection form={form} />
                )}
                {awardTypes.includes('Best Academic Contribution') && (
                    <BestAcademicContribSubsection form={form} />
                )}
                {awardTypes.includes(
                    'Most Dedicated for Tackling Real World Problems'
                ) && <RealWorldSubsection form={form} />}
                {awardTypes.length > 0 && (
                    <>
                        <Typography.Title level={5}>
                            {submitterType == 'Nominee'
                                ? 'Upload CV (mandatory) '
                                : 'Upload CV of nominated candidate (optional) '}
                            <Popover
                                content={
                                    submitterType == 'Nominee' ? (
                                        <div>
                                            <strong>
                                                A. Curriculum Vitae (mandatory)
                                            </strong>
                                            <p>
                                                1. Mandatory: All achievements
                                                related to the selected award
                                                category, written in a sequence
                                                and detail
                                            </p>
                                            <p>
                                                2. Core optional: work/research
                                                experiences, awards
                                                accomplishment, other
                                                achievements
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <strong>
                                                A. Curriculum Vitae of your
                                                nominated candidate (optional)
                                            </strong>
                                            <p>
                                                1. Mandatory: All achievements
                                                related to the selected award
                                                category, written in a sequence
                                                and detail
                                            </p>
                                            <p>
                                                2. Core optional: work/research
                                                experiences, awards
                                                accomplishment, other
                                                achievements
                                            </p>
                                        </div>
                                    )
                                }
                                title="Advice on what to include in your supporting documents"
                            >
                                <QuestionCircleOutlined />
                            </Popover>
                        </Typography.Title>
                        <Upload
                            accept=".pdf"
                            onChange={onFileChoose}
                            fileList={uploadFileList}
                            action={`${axios.defaults.baseURL}/api/forms/mvpawards/edit`}
                            headers={{
                                Authorization: `Bearer ${auth.accessToken}`,
                            }}
                        >
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Upload>
                        <Typography.Text type="secondary">
                            Hover over the question mark for more information
                        </Typography.Text>

                        <Typography.Title level={5}>
                            {submitterType == 'Nominee'
                                ? 'Personal Statement '
                                : 'Statement of Support '}
                            <Popover
                                content={
                                    submitterType == 'Nominee' ? (
                                        <div>
                                            <strong>
                                                B. Personal Statement (Optional)
                                            </strong>
                                            <p>
                                                1. Why you deserve to get The
                                                MVP Awards in the chosen
                                                category
                                            </p>
                                            <p>
                                                2. Elaborate interestingly any
                                                achievement related, including
                                                the hardship you face
                                            </p>
                                            <p>
                                                3. How you reflect yourself to
                                                your achievements
                                            </p>
                                            <p>
                                                4. What are your expectations if
                                                you win the MVP Awards?
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <strong>
                                                B. Statement of Support
                                                (optional)
                                            </strong>
                                            <p>
                                                1. Why the nominated candidate
                                                deserves to get The MVP Awards
                                                in the award category you choose
                                            </p>
                                            <p>
                                                2. Elaborate interestingly any
                                                achievement related of nominated
                                                candidate
                                            </p>
                                            <p>
                                                3. How do you view your
                                                nominated candidate’s
                                                achievements?
                                            </p>
                                        </div>
                                    )
                                }
                                title="Advice on what to include in your supporting documents"
                            >
                                <QuestionCircleOutlined />
                            </Popover>
                        </Typography.Title>
                        <Form.Item name="statement">
                            <Input.TextArea
                                rows={4}
                                placeholder="Write here..."
                            />
                        </Form.Item>
                        <Typography.Text type="secondary">
                            Hover over the question mark for more information
                        </Typography.Text>
                    </>
                )}

                <Divider />
                <Popconfirm
                    title="Are you sure? You cannot edit or resubmit after submitting"
                    onConfirm={() => form.submit()}
                    placement="topLeft"
                >
                    <Button type="primary" disabled={awardTypes.length == 0}>
                        Submit
                    </Button>
                </Popconfirm>
            </Form>
        </Card>
    );
}

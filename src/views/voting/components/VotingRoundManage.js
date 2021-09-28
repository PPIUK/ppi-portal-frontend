import React, { useEffect, useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Grid,
    message,
    Select,
    Skeleton,
    Typography,
} from 'antd';
import Axios from 'axios';
import { useAuth } from '../../../utils/useAuth';
import moment from 'moment';

const { useBreakpoint } = Grid;
const { Option } = Select;

export default function VotingRoundManage({
    electionID,
    roundID,
    electionData,
    setElectionData,
}) {
    const screens = useBreakpoint();
    const [form] = Form.useForm();
    const auth = useAuth();

    const [roundData, setRoundData] = useState(null);
    const [candidateNames, setCandidateNames] = useState(null);
    const [selectedCandidates, setSelectedCandidates] = useState(null);

    useEffect(() => {
        Axios.get(`/api/voting/${electionID}/round/${roundID}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => {
            setRoundData(res.data.data);
            let promises = [];
            let names = {};
            for (let candidate of electionData.candidatePool)
                promises.push(
                    Axios.get(`/api/profiles/${candidate.candidateID}/public`, {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                    }).then((res) => {
                        names[candidate._id] = res.data.data.fullName;
                    })
                );
            Promise.all(promises).then(() => setCandidateNames(names));
        });
    }, [electionData]);

    const submitForm = (vals) => {
        Axios.patch(`/api/voting/admin/${electionID}/round/${roundID}`, vals, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then(() =>
            Axios.post(
                `/api/voting/admin/${electionID}/round/${roundID}/candidates`,
                { candidates: selectedCandidates },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            )
                .then(() =>
                    Axios.get(`/api/voting/${electionID}`, {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                    }).then((res) => setElectionData(res.data.data))
                )
                .catch((err) => message.error(err.response.data.message))
        );
    };

    return roundData && candidateNames ? (
        <Form form={form} onFinish={submitForm}>
            <Form.Item
                label="Start Date"
                name="startDate"
                initialValue={moment(roundData.startDate)}
                rules={[{ required: true }]}
            >
                <DatePicker showTime />
            </Form.Item>
            <Form.Item
                label="End Date"
                name="endDate"
                initialValue={moment(roundData.endDate)}
                rules={[{ required: true }]}
            >
                <DatePicker showTime />
            </Form.Item>
            <Form.Item
                label="Voter List Finalisation Date"
                name="voterListFinalisationDate"
                initialValue={moment(roundData.voterListFinalisationDate)}
                rules={[{ required: true }]}
            >
                <DatePicker showTime />
            </Form.Item>
            <Typography>Select Candidates</Typography>
            <br />
            <Select
                mode="multiple"
                allowClear
                style={screens.xs ? { width: '100%' } : { width: '50%' }}
                placeholder="Please select the candidates"
                defaultValue={roundData.candidates}
                onChange={(vals) => setSelectedCandidates(vals)}
            >
                {electionData.candidatePool.map((c) => (
                    <Option key={c._id}>{candidateNames[c._id]}</Option>
                ))}
            </Select>
            <br />
            <br />
            <Button onClick={() => form.submit()}>Save</Button>
        </Form>
    ) : (
        <Skeleton />
    );
}

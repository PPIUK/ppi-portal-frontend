import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Layout, Typography } from 'antd';

const { Content } = Layout;

function IsicSciEssayFormSubmittedView() {
    const { id } = useParams();

    useEffect(() => {
        document.title = 'ISIC x SCI 2021 Essay Competition';
    });

    return (
        <Layout
            style={{
                background:
                    'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(0,212,240,1) 20%, rgba(4,0,255,1) 100%',
                minHeight: '100vh',
            }}
        >
            <Content
                style={{
                    margin: '24px 16px',
                    marginTop: 24,
                    padding: 24,
                    minHeight: '100vh',
                    overflow: 'initial',
                }}
            >
                <Card style={{ textAlign: 'center' }}>
                    <Typography.Title>Abstract Submitted</Typography.Title>
                    <Typography>
                        Thank you for participating in ISIC x SCI 2021 Essay
                        Competition.
                    </Typography>
                    <Typography>
                        We have received the abstract that you submitted.
                    </Typography>
                    <Typography>This is your submission ID: {id}.</Typography>
                    <Typography>
                        Please keep it safe because you will need it again when
                        you submit your full essay.
                    </Typography>
                    <Typography>
                        The submission ID has also been sent to your email
                        address, confirming your participation.
                    </Typography>
                </Card>

                <Card style={{ textAlign: 'center' }}>
                    <Typography>
                        If there is any question, kindly seek advice from the
                        the committee and contact us at:
                    </Typography>
                    <Typography>
                        Email:{' '}
                        <a href="mailto:isicxsci@gmail.com">
                            isicxsci@gmail.com
                        </a>
                    </Typography>
                    <Typography>Phone: +447927878411 (Ilham) </Typography>
                    <Typography>
                        Instagram:{' '}
                        <a href={'https://www.instagram.com/isic.ppiuk/'}>
                            @isic.ppiuk
                        </a>
                    </Typography>
                </Card>
            </Content>
        </Layout>
    );
}

export default IsicSciEssayFormSubmittedView;

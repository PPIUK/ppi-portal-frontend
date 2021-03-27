import React, { useEffect, useRef, useState } from 'react';
import { Grid } from 'antd';

const { tableau } = window;

function TableauEmbed({ url }) {
    const [viz, setViz] = useState(null);
    const ref = useRef(null);
    const screens = Grid.useBreakpoint();

    const options = {
        device: screens.xs ? 'mobile' : 'desktop',
    };

    const initViz = () => {
        if (viz) {
            viz.dispose();
            setViz(null);
        }
        const tableauViz = new tableau.Viz(ref.current, url, options);
        setViz(tableauViz);
    };

    useEffect(() => {
        initViz();
    }, [screens]);

    return <div ref={ref} />;
}

export default TableauEmbed;

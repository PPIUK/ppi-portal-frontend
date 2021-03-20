import React, { useEffect, useRef, useState } from 'react';
import { Grid } from 'antd';

const { tableau } = window;

// TODO: proper sizing
function TableauEmbed({ url }) {
    const [viz, setViz] = useState(null);
    const ref = useRef(null);
    const screens = Grid.useBreakpoint();

    const options = {
        // width: '100%',
        // height: '100%',
        device: screens.sm ? 'default' : 'tablet',
    };

    const initViz = () => {
        if (viz) {
            viz.dispose();
            setViz(null);
        }
        const tableauViz = new tableau.Viz(ref.current, url, options);
        // tableauViz.setFrameSize(600, 1000);
        setViz(tableauViz);
    };

    useEffect(() => {
        initViz();
    }, []);

    return <div ref={ref} />;
}

export default TableauEmbed;

// ref: https://segmentfault.com/a/1190000021357051
import React, { useCallback } from 'react';

const mx = require('mxgraph')({
    mxBasePath: 'mxgraph'
});

const { mxGraph } = mx;

function MxGraphFunction() {

    const containerRef = useCallback(node => {
        let graph = null;
        if (node !== null) {
            graph = new mxGraph(node);
            const parent = graph.getDefaultParent()
            graph.getModel().beginUpdate()
            try {
                const v1 = graph.insertVertex(parent, null, 'vertex 1', 0, 0, 80, 20)
                const v2 = graph.insertVertex(parent, null, 'vertex 2', 100, 0, 80, 20)
                graph.insertEdge(parent, null, '', v1, v2)
            } finally {
                graph.getModel().endUpdate();
            }
        }
    }, []);

    return (
        <div ref={containerRef} style={{ height: "400px", width: "400px", borderStyle: "groove" }}>
            <h3>Created using MxGraphFunction</h3>
        </div>
    );
}

export default MxGraphFunction;

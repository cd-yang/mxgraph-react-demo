// ref: https://segmentfault.com/a/1190000021357051
// 从js代码绘制 3000 个图元，页面加载约2.3秒
import React, { useCallback } from 'react';

const mx = require('mxgraph')({
    mxBasePath: 'mxgraph'
});

const { mxGraph, mxUtils, mxCodec } = mx;

function LargeDiagramExport() {

    let graph = null;
    const containerRef = useCallback(container => {
        if (container !== null) {
            graph = new mxGraph(container);
            graph.resizeContainer = true;
        }
    }, []);

    function generate() {
        const parent = graph.getDefaultParent()
        graph.getModel().beginUpdate()
        try {
            let height = 0;
            for (let i = 0; i < 600; i++) {
                const v1 = graph.insertVertex(parent, null, 'vertex 1', 0, height, 80, 20)
                const v2 = graph.insertVertex(parent, null, 'vertex 2', 100, height, 80, 20)
                graph.insertEdge(parent, null, '', v1, v2)
                const v3 = graph.insertVertex(parent, null, 'vertex 3', 200, height, 80, 20)
                graph.insertEdge(parent, null, '', v2, v3)
                height += 30
            }
        } finally {
            graph.getModel().endUpdate();
        }
    }

    function exportToXml() {
        var encoder = new mxCodec();
        var node = encoder.encode(graph.getModel());
        mxUtils.popup(mxUtils.getXml(node), true);
        let xml = mxUtils.getXml(node);
        alert(xml, true);
        console.log(xml);
    }

    return (
        <div style={{ height: "400px", width: "400px", borderStyle: "groove" }}>
            <h3>Large diagram export</h3>
            <button onClick={generate}>generate</button>
            <button onClick={exportToXml}>export to xml</button>
            <div ref={containerRef} className="canvas" style={{ height: "400px", width: "400px" }} />
        </div>
    );
}

export default LargeDiagramExport;

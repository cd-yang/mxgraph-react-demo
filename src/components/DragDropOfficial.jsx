/* eslint-disable no-unused-vars */
// ref: javascript/examples/dynamictoolbar.html
import React, { useEffect, useRef } from 'react';
import { createCanvas, createToolbar } from '../utility/mxGraphDragDrop'

const { mxGraph, mxGraphModel, mxKeyHandler, mxRubberband, mxToolbar, mxCell, mxGeometry, mxEvent, mxUtils } = require('mxgraph')({
    mxBasePath: 'mxgraph'
});

function DragDropOfficial() {

    const canvasRef = useRef(null);
    const toolbarRef = useRef(null);

    useEffect(() => {
        let toolbar = createToolbar(toolbarRef);
        createCanvas(canvasRef, toolbar);
    }, []);

    return (
        <div style={{ width: "800px", borderStyle: "groove" }}>
            <h3>Drag Drop by Official toolbar example</h3>
            <table>
                <tbody>
                    <tr>
                        <td style={{ verticalAlign: "top" }}>
                            <div ref={toolbarRef}>toolbar</div>
                        </td>
                        <td>
                            <div ref={canvasRef} className="canvas" style={{ width: "400px", height: "400px" }}></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DragDropOfficial;

// ref: https://www.liaoxuefeng.com/wiki/1022910821149312/1103327377678688
import React, { useEffect, useRef } from 'react';

const { mxGraph, mxGraphModel, mxKeyHandler, mxRubberband, mxToolbar, mxCell, mxGeometry, mxEvent, mxUtils } = require('mxgraph')({
    mxBasePath: 'mxgraph'
});

const client = new WebSocket('ws://127.0.0.1:5000/ws');

client.onopen = () => {
    console.log('WebSocket Client Connected');
};

client.onmessage = (message) => {
    console.log(message);
};

function WebSocketConnection() {

    const canvasRef = useRef(null);
    const toolbarRef = useRef(null);

    useEffect(() => {

        client.send('hello dotnet');
    }, []);

    return (
        <div style={{ width: "800px", borderStyle: "groove" }}>
            <h3>WebSocket connection example</h3>
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

export default WebSocketConnection;

// ref
// websocket: https://www.liaoxuefeng.com/wiki/1022910821149312/1103327377678688
import React, { useEffect, useRef, useState } from 'react';
import { createCanvas, createToolbar } from '../utility/mxGraphDragDrop'

const { mxEvent } = require('mxgraph')({
    mxBasePath: 'mxgraph'
});


function WebSocketConnection() {

    const canvasRef = useRef(null);
    const toolbarRef = useRef(null);

    const [isConnected, setIsConnected] = useState(false);
    let client = null;

    useEffect(() => {
        client = new WebSocket('ws://127.0.0.1:5000/ws');
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            console.log(message);
        };
        client.onopen = () => {
            setIsConnected(true);
        }
        client.onclose = () => {
            setIsConnected(false);
        }

        let toolbar = createToolbar(toolbarRef);
        let graph = createCanvas(canvasRef, toolbar);
        graph.addListener(mxEvent.ADD_CELLS, addCellsHandler);
        graph.addListener(mxEvent.CELLS_ADDED, cellsAddedHandler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addCellsHandler = (mxGraph, event, arg) => {
        console.log(`addCells, cells: ${JSON.stringify(event.properties.cells[0].id)}`);
    }

    const cellsAddedHandler = (mxGraph, event, arg) => {
        console.log(`cellsAdded, cells: ${JSON.stringify(event.properties.cells[0].id)}`);
        if (client === null || client.readyState !== WebSocket.OPEN)
            return;

        client.send(event.properties.cells[0].id);
    }

    return (
        <div style={{ width: "800px", borderStyle: "groove" }}>
            <h3>WebSocket connection example</h3>
            {isConnected ?
                <h3 style={{ color: 'green' }}>websocket connected</h3>
                : <h3 style={{ color: 'red' }}>websocket not connected</h3>
            }
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

function simpleStringify(object) {
    var simpleObject = {};
    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }
        if (typeof (object[prop]) == 'object') {
            continue;
        }
        if (typeof (object[prop]) == 'function') {
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};
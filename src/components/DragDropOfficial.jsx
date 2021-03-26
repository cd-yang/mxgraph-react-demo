/* eslint-disable no-unused-vars */
// ref: javascript/examples/dynamictoolbar.html
import React, { useEffect, useRef } from 'react';

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

// 创建 toolbar
function createToolbar(toolbarRef) {
    if (toolbarRef?.current === null)
        return;
    let toolbarDom = toolbarRef.current;
    toolbarDom.style.overflow = 'hidden';
    toolbarDom.style.padding = '2px';
    toolbarDom.style.left = '0px';
    toolbarDom.style.top = '0px';
    toolbarDom.style.width = '60px';
    toolbarDom.style.bottom = '0px';

    let toolbar = new mxToolbar(toolbarDom);
    toolbar.enabled = false

    return toolbar;
}

// 创建画布，并建立与 toolbar 的关联
function createCanvas(canvasRef, toolbar) {
    if (canvasRef === null)
        return;
    let model = new mxGraphModel();
    let graph = new mxGraph(canvasRef.current, model);

    // Enables new connections in the graph
    graph.setConnectable(true);
    graph.setMultigraph(false);

    // Stops editing on enter or escape keypress
    // var keyHandler = new mxKeyHandler(graph);

    // 添加框选功能
    new mxRubberband(graph);

    addVertex(graph, toolbar, './images/rectangle.gif', 100, 40, '');
    // addVertex(graph, toolbar, './images/rounded.gif', 100, 40, 'shape=rounded');
    addVertex(graph, toolbar, './images/ellipse.gif', 40, 40, 'shape=ellipse');
    // addVertex(graph, toolbar, './images/rhombus.gif', 40, 40, 'shape=rhombus');
    // addVertex(graph, toolbar, './images/triangle.gif', 40, 40, 'shape=triangle');
    addVertex(graph, toolbar, './images/cylinder.gif', 40, 40, 'shape=cylinder');
    // addVertex(graph, toolbar, './images/actor.gif', 30, 40, 'shape=actor');
}

// 添加一种图元的类型
function addVertex(graph, toolbar, icon, w, h, style) {
    var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
    vertex.setVertex(true);

    // 添加到 toolbar
    var img = addToolbarItem(graph, toolbar, vertex, icon);
    img.enabled = true;

    // 监听事件
    graph.getSelectionModel().addListener(mxEvent.CHANGE, function () {
        var tmp = graph.isSelectionEmpty();
        mxUtils.setOpacity(img, (tmp) ? 100 : 20);
        img.enabled = tmp;
    });
};

// 将图元原型加到 toolbar 上，并添加生成真实图元的回调
function addToolbarItem(graph, toolbar, prototype, image) {
    // Function that is executed when the image is dropped on
    // the graph. The cell argument points to the cell under
    // the mousepointer if there is one.
    var funct = function (graph, evt, cell, x, y) {
        graph.stopEditing(false);

        var vertex = graph.getModel().cloneCell(prototype);
        vertex.geometry.x = x;
        vertex.geometry.y = y;

        graph.addCell(vertex);
        graph.setSelectionCell(vertex);
    }

    // Creates the image which is used as the drag icon (preview)
    var img = toolbar.addMode(null, image, function (evt, cell) {
        var pt = this.graph.getPointForEvent(evt);
        funct(graph, evt, cell, pt.x, pt.y);
    });

    // Disables dragging if element is disabled. This is a workaround
    // for wrong event order in IE. Following is a dummy listener that
    // is invoked as the last listener in IE.
    mxEvent.addListener(img, 'mousedown', function (evt) {
        // do nothing
    });

    // This listener is always called first before any other listener
    // in all browsers.
    mxEvent.addListener(img, 'mousedown', function (evt) {
        if (img.enabled === false) {
            mxEvent.consume(evt);   // 吃掉当前事件，不往下执行
        }
    });

    mxUtils.makeDraggable(img, graph, funct);

    return img;
}
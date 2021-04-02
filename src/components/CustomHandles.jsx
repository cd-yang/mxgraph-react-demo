// ref: http://127.0.0.1:5500/javascript/examples/handles.html
import React, { useCallback } from 'react';

const mx = require('mxgraph')({
    mxBasePath: 'mxgraph'
});

const { mxCellRenderer, mxConstants, mxCylinder, mxEvent, mxGraph, mxRectangle, mxUtils, mxVertexHandler, mxHandle, mxPoint } = mx;

function CustomHandles() {
    let graph = null;
    const containerRef = useCallback(container => {
        if (container !== null) {
            mxEvent.disableContextMenu(container);
            graph = new mxGraph(container);

            // Changes the default style for vertices "in-place"
            // to use the custom shape.
            var style = graph.getStylesheet().getDefaultVertexStyle();
            style[mxConstants.STYLE_SHAPE] = 'box';
        }
    }, []);

    const load = () => {
        const parent = graph.getDefaultParent();
        graph.getModel().beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                20, 20, 240, 120, 'shape=myShape;whiteSpace=wrap;overflow=hidden;pos1=30;pos2=80;');
            // const v2 = graph.insertVertex(parent, null, 'vertex 2', 100, 0, 80, 60, 'shape=swimlane');
        } finally {
            graph.getModel().endUpdate();
        }
    }
    return (
        <div style={{ height: "400px", width: "400px", borderStyle: "groove" }}>
            <h3>Custom handles</h3>
            <button onClick={load}>load</button>
            <div ref={containerRef} className="canvas" />
        </div>
    );
}

export default CustomHandles;


function MyShape() {
    mxCylinder.call(this);
};

mxUtils.extend(MyShape, mxCylinder);

MyShape.prototype.defaultPos1 = 20;
MyShape.prototype.defaultPos2 = 60;

MyShape.prototype.getLabelBounds = function (rect) {
    var pos1 = mxUtils.getValue(this.style, 'pos1', this.defaultPos1) * this.scale;
    var pos2 = mxUtils.getValue(this.style, 'pos2', this.defaultPos2) * this.scale;

    return new mxRectangle(rect.x, rect.y + pos1, rect.width, Math.min(rect.height, pos2) - Math.max(0, pos1));
};

MyShape.prototype.redrawPath = function (path, x, y, w, h, isForeground) {
    if (isForeground) {
        var pos1 = mxUtils.getValue(this.style, 'pos1', this.defaultPos1);
        var pos2 = mxUtils.getValue(this.style, 'pos2', this.defaultPos2);
        if (pos1 < h) {
            path.moveTo(0, pos1);
            path.lineTo(w, pos1);
        }

        if (pos2 < h) {
            path.moveTo(0, pos2);
            path.lineTo(w, pos2);
        }
    }
    else {
        path.rect(0, 0, w, h);
    }
};

mxCellRenderer.registerShape('myShape', MyShape);

mxVertexHandler.prototype.createCustomHandles = function () {
    if (this.state.style['shape'] === 'myShape') {
        // Implements the handle for the first divider
        var firstHandle = new mxHandle(this.state);

        // firstHandle.getPosition = function (bounds) {
        //     var pos2 = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos2', MyShape.prototype.defaultPos2))));
        //     var pos1 = Math.max(0, Math.min(pos2, parseFloat(mxUtils.getValue(this.state.style, 'pos1', MyShape.prototype.defaultPos1))));

        //     return new mxPoint(bounds.getCenterX(), bounds.y + pos1);
        // };
        // 获取第一个 handle 的位置
        firstHandle.getPosition = (bounds) => {
            let pos1 = this.state.style['pos1'] ?? MyShape.prototype.defaultPos1;
            pos1 = Math.max(0, Number.parseFloat(pos1));

            return new mxPoint(bounds.getCenterX(), bounds.y + pos1);
        };

        // firstHandle.setPosition = function (bounds, pt) {
        //     var pos2 = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos2', MyShape.prototype.defaultPos2))));

        //     this.state.style['pos1'] = Math.round(Math.max(0, Math.min(pos2, pt.y - bounds.y)));
        // };
        // 设置第一个 handle 的位置
        firstHandle.setPosition = (bounds, pt) => {
            let pos2 = this.state.style['pos2'] ?? MyShape.prototype.defaultPos2;
            pos2 = Math.max(0, parseFloat(pos2));

            this.state.style['pos1'] = Math.round(Math.max(0, Math.min(pos2, pt.y - bounds.y)));
        };

        // 移动结束后，将 handle 位置保存到 state
        firstHandle.execute = function () {
            this.copyStyle('pos1');
        }

        firstHandle.ignoreGrid = true;

        // Implements the handle for the second divider
        var secondHandle = new mxHandle(this.state);
        // secondHandle.getPosition = function (bounds) {
        //     var pos1 = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos1', MyShape.prototype.defaultPos1))));
        //     var pos2 = Math.max(pos1, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos2', MyShape.prototype.defaultPos2))));

        //     return new mxPoint(bounds.getCenterX(), bounds.y + pos2);
        // };
        // 获取第二个 handle 的位置
        secondHandle.getPosition = (bounds) => {
            let pos1 = this.state.style['pos1'] ?? MyShape.prototype.defaultPos1;
            pos1 = Math.max(0, parseFloat(pos1));
            let pos2 = this.state.style['pos2'] ?? MyShape.prototype.defaultPos2;
            pos2 = Math.max(pos1, parseFloat(pos2));

            return new mxPoint(bounds.getCenterX(), bounds.y + pos2);
        };
        // secondHandle.setPosition = function (bounds, pt) {
        //     var pos1 = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'pos1', MyShape.prototype.defaultPos1))));

        //     this.state.style['pos2'] = Math.round(Math.max(pos1, Math.min(bounds.height, pt.y - bounds.y)));
        // };
        // 设置第二个 handle 的位置
        secondHandle.setPosition = (bounds, pt) => {
            let pos1 = this.state.style['pos1'] ?? MyShape.prototype.defaultPos1;
            pos1 = Math.max(0, parseFloat(pos1));

            this.state.style['pos2'] = Math.round(Math.max(pos1, Math.min(bounds.height, pt.y - bounds.y)));
        };
        secondHandle.execute = function () {
            this.copyStyle('pos2');
        }

        secondHandle.ignoreGrid = true;

        return [firstHandle, secondHandle];
    }

    return null;
};

mxVertexHandler.prototype.livePreview = true;
mxVertexHandler.prototype.rotationEnabled = true;

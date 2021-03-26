// ref: https://github.com/eyupcolak/mxgraph-react
// https://codesandbox.io/s/r154655m4n?file=/src/MxGraphGridEditor.js:20612-20633

/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React from "react"
import ReactDOM from "react-dom";
import "./DragDrop.css"

var mxnspaceobj = require("mxgraph")({
    mxImageBasePath: "mxgraph/javascript/src/images",
    mxBasePath: "mxgraph/javascript/src"
})
export default class DragDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: {},
            layout: {},
            json: "",
            dragElt: null,
            createVisile: false,
            currentNode: null,
            currentTask: ""
        };
        // this.LoadGraph = this.LoadGraph.bind(this);
    }

    // 在工具栏创建可拖拽的图元
    createDragElement = () => {
        const { graph } = this.state;
        const tasksDrag = ReactDOM.findDOMNode(
            this
        ).querySelectorAll(".task");
        Array.prototype.slice.call(tasksDrag).forEach(ele => {
            const value = ele.getAttribute("data-value");
            let ds = mxnspaceobj.mxUtils.makeDraggable(
                ele,
                this.graphF,
                (graph, evt, target, x, y) =>
                    this.funct(graph, evt, target, x, y, value),
                this.dragElt,
                null,
                null,
                graph.autoscroll,
                true
            );
            ds.isGuidesEnabled = function () {
                return graph.graphHandler.guidesEnabled;
            };
            ds.createDragElement = mxnspaceobj.mxDragSource.prototype.createDragElement;
        });
    };

    funct = (graph, evt, target, x, y, value) => {
        var doc = mxnspaceobj.mxUtils.createXmlDocument();
        var obj = doc.createElement("TaskObject");
        obj.setAttribute("label", value);
        obj.setAttribute("text", "");
        obj.setAttribute("desc", "");

        //获取顶层，可以认为是父节点
        var parent = graph.getDefaultParent();
        //parent画板父层，value值，x，y为坐标起点，width宽，height高
        //style样式  stylename;image=imageUrl
        let cell = graph.insertVertex(
            parent,
            target,
            obj,
            x,
            y,
            150,
            60,
            "strokeColor=#000000;strokeWidth=1;fillColor=white"
        );
        this.addOverlays(graph, cell, true);
        graph.setSelectionCell(cell);
        this.selectionChanged(graph, value);
        // if (cells != null && cells.length > 0)
        // {
        // 	graph.scrollCellToVisible(cells[0]);
        // 	graph.setSelectionCells(cells);
        // }
    };

    componentDidMount() {
        const container = document.querySelector("#dragDropContainer")
        var graph = new mxnspaceobj.mxGraph(container);
        this.setState(
            {
                graph: graph,
                // dragElt: this.getEditPreview()
            },
            () => {
                console.log(this);
                // this.loadGlobalSetting();
                // this.setGraphSetting();
                // this.settingConnection();
                this.createDragElement();
                var parent = graph.getDefaultParent();

                // Adds cells to the model in a single step
                graph.getModel().beginUpdate();
                try {
                    var v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30);
                    var v2 = graph.insertVertex(
                        parent,
                        null,
                        "World!",
                        300,
                        250,
                        80,
                        30
                    );
                    var e1 = graph.insertEdge(parent, null, "", v1, v2);
                } finally {
                    // Updates the display
                    graph.getModel().endUpdate();
                }
            }
        );
        // Disables the built-in context menu
        mxnspaceobj.mxEvent.disableContextMenu(container);
        // Trigger event after selection
        graph
            .getSelectionModel()
            .addListener(mxnspaceobj.mxEvent.CHANGE, this.selectionChange);
    }

    render() {
        return (
            <div style={{ width: "800px", borderStyle: "groove" }}>
                <h3>Drag and drop</h3>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign: "top" }}>
                                <ul className="sidebar">
                                    <li className="title" data-title="Task node" data-value="Task node">Task node</li>
                                    <li className="task" data-title="Kafka->HDFS" data-value="Channel task" >rectangle</li>
                                </ul>
                            </td>
                            <td>
                                <div className="container-wrapper">
                                    <div className="container" id="dragDropContainer" style={{ height: "400px", width: "400px" }}></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
// ref: https://stackoverflow.com/questions/59893409/getting-mxgraph-hello-world-example-working-in-react
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React from "react"

var mxnspaceobj = require("mxgraph")({
    mxImageBasePath: "mxgraph/javascript/src/images",
    mxBasePath: "mxgraph/javascript/src"
})
// The manual tells the above factory function returns a "namespace" object 
// that has access to all objects of the mxgraph package. Here I give it a name
// mxnspaceobj, although we can use any valid name. We will use this object,
// including when calling mxGraph constructor.

export default class MxGraphClass extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //let mxClient = mxnspaceobj.mxClient
        let mxRubberband = mxnspaceobj.mxRubberband
        let mxKeyHandler = mxnspaceobj.mxKeyHandler
        let mxUtils = mxnspaceobj.mxUtils
        let mxEvent = mxnspaceobj.mxEvent

        const container = document.querySelector("#mxcontainer")
        container.style.background = "grid.gif";

        // Now, the tricky one, because most examples codes directly use the 
        // following statement :
        // let graph = new mxGraph(container); 
        // which will fail.

        // Instead, we have to call the mxGraph constructor via mxnspaceobj
        // variable as follows :
        let graph = new mxnspaceobj.mxGraph(container);
        graph.setBorder(1);
        graph.background = "grid.gif";

        // -- The rest is the same as usually found in examples -- //

        new mxRubberband(graph);
        let parent = graph.getDefaultParent();

        graph.getModel().beginUpdate();
        try {
            const v1 = graph.insertVertex(parent, null,
                'Hello,', 20, 20, 80, 30);
            const v2 = graph.insertVertex(parent, null,
                'World!', 200, 150, 80, 30);
            const e1 = graph.insertEdge(parent, null, '', v1, v2);
        } finally {
            graph.getModel().endUpdate();
        }
    }

    render() {
        return (
            <div id="mxcontainer" style={{ height: "400px", width: "400px", borderStyle: "groove" }}>
                {/* , borderStyle: "groove"  */}
                <h3>Created using MxGraphClass</h3>
            </div>
        );
    }
}
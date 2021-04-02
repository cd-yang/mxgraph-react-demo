import './App.css';
import 'mxgraph/javascript/src/css/common.css';
import MxGraphClass from './components/MxGraphClass';
import MxGraphFunction from './components/MxGraphFunction';
import DragDrop from './components/DragDrop';
import DragDropOfficial from './components/DragDropOfficial';
import WebSocketConnection from './components/WebSocketConnection';
import LargeDiagramExport from './components/LargeDiagramExport';
import LargeDiagramImport from './components/LargeDiagramImport';
import CustomShape from './components/CustomShape';

function App() {
  return (
    <div className="App">
      <MxGraphClass />
      <MxGraphFunction />
      <DragDrop />
      <DragDropOfficial />
      <WebSocketConnection />
      <LargeDiagramExport />
      <LargeDiagramImport />
      <CustomShape />
    </div>
  );
}

export default App;

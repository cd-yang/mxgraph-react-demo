import './App.css';
import 'mxgraph/javascript/src/css/common.css';
import MxGraphClass from './components/MxGraphClass';
import MxGraphFunction from './components/MxGraphFunction';
import DragDrop from './components/DragDrop';
import DragDropOfficial from './components/DragDropOfficial';
import WebSocketConnection from './components/WebSocketConnection';

function App() {
  return (
    <div className="App">
      <MxGraphClass></MxGraphClass>
      <MxGraphFunction></MxGraphFunction>
      <DragDrop />
      <DragDropOfficial />
      <WebSocketConnection />
    </div>
  );
}

export default App;

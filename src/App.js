import './App.css';
import 'mxgraph/javascript/src/css/common.css';
import MxGraphClass from './components/MxGraphClass';
import MxGraphFunction from './components/MxGraphFunction';
import DragDrop from './components/DragDrop';

function App() {
  return (
    <div className="App">
      <MxGraphClass></MxGraphClass>
      <MxGraphFunction></MxGraphFunction>
      <DragDrop />
    </div>
  );
}

export default App;

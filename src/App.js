import './App.css';
import 'mxgraph/javascript/src/css/common.css';
import MxGraphClass from './components/MxGraphClass';
import MxGraphFunction from './components/MxGraphFunction';
import DragDrop from './components/DragDrop';
import DragDropOfficial from './components/DragDropOfficial';

function App() {
  return (
    <div className="App">
      <MxGraphClass></MxGraphClass>
      <MxGraphFunction></MxGraphFunction>
      <DragDrop />
      <DragDropOfficial />
    </div>
  );
}

export default App;

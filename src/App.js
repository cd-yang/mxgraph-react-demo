import './App.css';
import 'mxgraph/javascript/src/css/common.css';
import MxGraphClass from './components/MxGraphClass';
import MxGraphFunction from './components/MxGraphFunction';

function App() {
  return (
    <div className="App">
      <MxGraphClass></MxGraphClass>
      <MxGraphFunction></MxGraphFunction>
    </div>
  );
}

export default App;

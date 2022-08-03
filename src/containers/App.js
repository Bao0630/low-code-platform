import './App.css';
import Editor from './Editor';

function App() {
  let isEditing = true;
  if (isEditing) return (
    <Editor></Editor>
  );

  return (
    <div className="App" >
      
    </div>
  );
}

export default App;
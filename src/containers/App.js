import './App.css';
import { useState } from 'react';
import data from '../components/data.json';
import Editor from './Editor';

// 暂未按需加载 ant design
import 'antd/dist/antd.min.css';

function App() {
  let isEditing = true;
  const [pageData, setPageData] = useState(data);

  
  if (isEditing) return (
    <div className="App" >
      <Editor page={pageData}></Editor>
    </div>
  );

  return (
    <div className="App" >
      
    </div>
  );
}

export default App;
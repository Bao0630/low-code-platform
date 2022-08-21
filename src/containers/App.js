import './App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";

import Editor from './Editor';

import page from '../cashData/data.json';
import user from '../cashData/user-data.json';

// 暂未按需加载 ant design
import 'antd/dist/antd.min.css';


function App() {
  // const [pageData, setPageData] = useState(page);

  
  // if (isEditing) return (
  //   <Editor page={pageData} editPage={setPageData}/>
  // );

  return (
    <div className="App" >
      <Link to="/editor">Editor</Link>
    </div>
  );
}

export default App;
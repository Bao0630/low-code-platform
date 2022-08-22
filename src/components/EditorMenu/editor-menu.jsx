import './menu.css';
import { Link } from 'react-router-dom';

function EditorMenu(props) {

  // const []

  // const switchEditState = (e) => {
  //   props.changeEditState();
  //   if(props.editState === 'edit') {

  //   }
  // };

  return (
    <div className="editor menu">
      <Link
        to={{
            pathname: '/low-code-platform',
        }}
      >
        <button id="home" className="menu-item" title="主页">
        </button>
      </Link>
      <button id={props.editState} className="menu-item" onClick={props.changeEditState} title="切换编辑状态">
      </button>
      <button id="save" className="menu-item" onClick={props.saveEditorChange} title="保存页面">
      </button>
      <button id="preview" className="menu-item" title="预览页面">
      </button>
      {/* <button id="lunch" className='menu-item'></button> */}
        
    </div>
  );
}

export default EditorMenu;
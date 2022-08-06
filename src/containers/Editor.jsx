import React from 'react';

import './Editor.css';

import EditorBlock from './editor-block';
import {registerConfig as config} from '../components/editor-config'


function Editor(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: {},
  //   };
    
  // };
  console.log(props.page);

  const containerSize = {
    width: `${props.page.container.width}px`,
    height: `${props.page.container.height}px`,
  };
  
  return (
    <div className="editor">
      <div className="editor components-panel"></div>
      <div className="editor property-panel"></div>
      <div className="menu">

      </div>
      <div className="container" >

        <div className="container-canvas" >
          <div className="container-canvas_content" style={containerSize}>
            content
            {(
              props.page.blocks.map(blockContent => 
                (<EditorBlock block={blockContent} config={config}></EditorBlock>)
              )
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Editor;

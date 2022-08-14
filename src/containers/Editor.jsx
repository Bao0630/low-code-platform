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
  //console.log(props.page);
  //console.log(config);

  const containerSize = {
    width: `${props.page.container.width}px`,
    height: `${props.page.container.height}px`,
  };


  const containerRef = React.createRef();
  const dragEnter = (event) => {
    event.dataTransfer.dropEffect = 'move';
    // event.dr

  };
  const dragOver = (event) => {
    event.preventDefault();
  };
  const dragLeave = (event) => {
    event.dataTransfer.dropEffect = 'none';
  };
  const drop = (event) => {

  };

  const dragStart = (event, component) => {
    console.log(containerRef.current)
    containerRef.current.addEventListener('dragEnter', dragEnter);
    containerRef.current.addEventListener('dragOver', dragOver);
    containerRef.current.addEventListener('dragLeave', dragLeave);
    containerRef.current.addEventListener('drop', drop);

    // event.dataTransfer
  };

  
  return (
    <div className="editor">
      <div className="editor components-panel">
        {config.componentsList.map(component => (
          <div 
            className='component-item'
            draggable
            onDragStart={event => dragStart(event, component)}
          >
            <span>{component.label}</span>
            <div>{component.preview()}</div>
          </div>
        ))}
        
        {/* <ComponentList></ComponentList> */}
      </div>
      <div className="editor property-panel">

      </div>
      <div className="menu">

      </div>
      <div className="container" >

        <div className="container-canvas" >
          <div 
            className="container-canvas_content" 
            style={containerSize}
            ref={containerRef}
          >
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

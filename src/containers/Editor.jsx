import React from 'react';
import { useRef, useEffect } from 'react';
import './Editor.css';

import EditorBlock from './editor-block';
import { registerConfig as config } from '../components/editor-config'
import { componentDragger } from '../utils/componentDragger';



function Editor(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: {},
  //   };
    
  // };
  //console.log(props.page);
  //console.log(config);

  useEffect(() => {
    // Update the document title using the browser API
    const title = props.page.title ?? 'page';
    document.title = `Editing ${title}`;
  });

  const containerSize = {
    width: `${props.page.container.width}px`,
    height: `${props.page.container.height}px`,
  };


  const canvasRef = useRef(null);
  
  // drag from components-panel
  const {dragstart, dragend} = componentDragger(canvasRef, props);

  // drag mulitple elements
  const blockMousedown = (event, block) => {
    event.preventDefault();
    event.stopPropagation();
    if (!block.focus) {
      block.focus = true;
    } else {
      block.focus = false;
    }
    
  }

  
  return (
    <div className="editor">
      <div className="editor components-panel">
        {config.componentsList.map(component => (
          <div 
            className='component-item'
            draggable
            onDragStart={(event) => dragstart(event, component)}
            onDragEnd={dragend}
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
            ref={canvasRef}
          >
            content
            {(
              props.page.blocks.map(blockContent => (
                <EditorBlock
                  className={blockContent.focus ? 'editor-block-focus' : 'editor-block'}
                  block={blockContent}
                  config={config}
                  updatePage={props.editPage}
                  onMouseDown={(event) => blockMousedown(event, blockContent)}
                  >
                </EditorBlock>)
              )
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Editor;

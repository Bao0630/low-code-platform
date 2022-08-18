import React from 'react';
import { useRef, useState, useEffect } from 'react';
import './Editor.css';

import EditorBlock from './editor-block';
import { registerConfig as config } from '../components/editor-config'
import { componentDragger } from '../utils/componentDragger';
import { blocksFocus } from '../utils/blocksFocus';
import { useMemo } from 'react';


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

  const [editState, setEditState] = useState('drag');
  const canvasRef = useRef(null);
  const [blocks, setBlocks] = useState(props.page.blocks);

  // drag from components-panel
  const { dragstart, dragend } = componentDragger(canvasRef, blocks, setBlocks);


  // mouseDown Foucus
  const { blockMouseDown, containerMouseDown} = blocksFocus(blocks, setBlocks);

  const {focusedBlocks, unfocusedBlocks} = useMemo(() => {
    let focused = [];
    let unfocused = [];
    blocks.forEach(block => (block.focus ? focused : unfocused).push(block));
    console.log(`focused: ${focused}`);
    return {focused, unfocused};
  }, [blocks]);



  // drag mulitple elements

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
            onMouseDown={(event) => containerMouseDown(event)}
          >
            {(
              blocks.map(block => (
                <EditorBlock
                  block={block}
                  config={config}
                  editState={editState}

                  onMouseDown={blockMouseDown}
                // setBlocks={setBlocks}
                // focusedBlocks={focusedBlocks}
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

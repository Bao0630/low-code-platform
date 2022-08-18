import React from 'react';
import { useRef, useState, useEffect } from 'react';
import './Editor.css';

import EditorBlock from './editor-block';
import ComponentPanel from './componentPanel';
import EditorMenu from './editorMenu';
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
      <ComponentPanel
        dragstart={dragstart}
        dragend={dragend}
        componentsList={config.componentsList}
      >
      </ComponentPanel>
      <div className="editor property-panel">

      </div>
      
      <EditorMenu></EditorMenu>
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

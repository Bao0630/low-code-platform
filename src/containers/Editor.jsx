import React from 'react';
import { useRef, useState, useEffect } from 'react';
import './Editor.css';

import EditorBlock from './editor-block';
import ComponentPanel from './component-panel';
import EditorMenu from './editor-menu';
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

  const changeEditState = function () {
    clearBlocksFocus();
    const curState = editState === 'drag' ? 'edit' : 'drag';
    setEditState(curState);

    alert(`已切换到 ${curState} 模式`)
    // console.log(curState);
  }

  const saveEditorChange = function () {
    const pageData = props.page;
    console.log(pageData, blocks);
    // return pageData;
  }

  // drag from components-panel
  const { dragstart, dragend } = componentDragger(canvasRef, blocks, setBlocks);

  // mouseDown Foucus
  const { blockMouseDown, containerMouseDown, clearBlocksFocus } = blocksFocus(blocks, setBlocks);

  const { focusedBlocks, unfocusedBlocks } = useMemo(() => {

    if (editState === 'drag') return {};
    debugger
    let focused = [];
    let unfocused = [];
    blocks.forEach(block => (block.focus ? focused : unfocused).push(block));
    console.log(`focused: ${focused}`);
    return { focused, unfocused };
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

      <EditorMenu
        editState={editState}
        changeEditState={changeEditState}
        saveEditorChange={saveEditorChange}
      >
      </EditorMenu>
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

import React from 'react';
import { useRef, useState, useEffect } from 'react';
import './Editor.css';

import EditorBlock from './editor-block';
import ComponentPanel from '../components/ComponentPanel/component-panel';
import EditorMenu from '../components/EditorMenu/editor-menu';
import PropertyPanel from '../components/PropertyPanel/property-panel';
import { registerConfig as config } from '../components/ComponentRegister/editor-config'
import { componentDragger } from '../utils/componentDragger';
import { blocksFocus } from '../utils/blocksFocus';
import { useMemo } from 'react';
import deepcopy from 'deepcopy';
// import { pageSaver } from '../utils/pageSaver'


function Editor(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: {},
  //   };

  // };
  //console.log(props.page);
  //console.log(config);

  const initBlockUid = function() {

  };
  const [editState, setEditState] = useState('drag');
  const canvasRef = useRef(null);
  const [page, setPage] = useState(props.page);
  const [blocks, setBlocks] = useState(props.page.blocks);
  const [focusedBlock, setfocusedBlock] = useState(null);

  useEffect(() => {
    const title = page.title ?? 'page';
    document.title = `Editing ${title}`;
  });

  const containerSize = {
    width: `${page.container.width}px`,
    height: `${page.container.height}px`,
  };


  const changeEditState = function () {
    clearBlocksFocus();
    const curState = editState === 'drag' ? 'edit' : 'drag';
    setEditState(curState);

    alert(`已切换到 ${curState} 模式`)
    // console.log(curState);
  }

  const saveEditorChange = function() {
    const pageData = {
      ...page,
      blocks: [...blocks]
    };
    console.log(pageData, blocks);
    // updateJSONFile(pageData)
    // return pageData;
  }

  const updateBlock = function(block, index) {
    const updatedBlocks = deepcopy(blocks);
    updateBlock[index] = block;

    setBlocks(updatedBlocks);
    console.log(blocks)
  }

  // drag from components-panel
  const { dragstart, dragend } = componentDragger(canvasRef, blocks, setBlocks);

  // mouseDown Foucus
  const { blockMouseDown, containerMouseDown, clearBlocksFocus } = blocksFocus(blocks, setBlocks);

  const { focusedBlocks, unfocusedBlocks } = useMemo(() => {

    if (editState === 'drag') return {};
    // debugger
    let focused = [];
    let unfocused = [];
    blocks.forEach((block, idx) => {
      block.index = idx;
      (block.focus ? focused : unfocused).push(block);
    });
    console.log(focused[0]);
    setfocusedBlock(focused[0]);
    return { focused, unfocused };
  }, [blocks]);



  // drag mulitple elements


  // save page
  // const { updateJSONFile } = pageSaver('../components/data.json');

  return (
    <div className="App" >
      <div className="editor">
        <ComponentPanel
          dragstart={dragstart}
          dragend={dragend}
          componentsList={config.componentsList}
        />
        <PropertyPanel
          focused={focusedBlock ? focusedBlock : null}
          updateBlock={updateBlock}
          pageData={page}
          updatePage={setPage}
          curState={editState}

        />
        <EditorMenu
          editState={editState}
          changeEditState={changeEditState}
          saveEditorChange={saveEditorChange}
        />
        <div className="container" >
          <div className="container-canvas" >
            <div
              className="container-canvas_content"
              style={page.container}
              ref={canvasRef}
              onMouseDown={(event) => containerMouseDown(event)}
            >
              {(
                blocks.map((block, idx) => (
                  <EditorBlock
                    key={idx}
                    index={idx}
                    block={block}
                    updateBlock={updateBlock}
                    config={config}
                    editState={editState}
                    onMouseDown={blockMouseDown}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );


};

export default Editor;

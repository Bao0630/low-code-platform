import { useRef, useState, useEffect } from "react";
import Draggable from 'react-draggable';
function EditorBlock(props) {
  
  const [blockTop, setBlockTop] = useState(props.block.top);
  const [blockLeft, setBlockLeft] = useState(props.block.left);
  const [alignCenter, setAlignCenter] = useState(props.block.alignCenter);

  const style = {
    top: `${blockTop}px`,
    left: `${blockLeft}px`
  };

  //console.log(props, props.config.componentsMap[props.block.type]);
  
  const renderComponent = () => {
    const component = props.config.componentsMap[props.block.type];
    return component.render();
  }


  const blockRef = useRef(null);
  
  useEffect(() => {
    // dragged component alignCenter
    if (!alignCenter) return ;

    const { offsetWidth, offsetHeight } = blockRef.current;
    
    setBlockTop(blockTop < offsetHeight/2 ? 0 : blockTop - offsetHeight/2);
    setBlockLeft(blockLeft < offsetWidth/2 ? 0 : blockLeft - offsetWidth/2);
    setAlignCenter(false);
    // console.log(props)
    //console.log(offsetWidth, offsetHeight);
  }, [alignCenter, blockTop, blockLeft]);

  // const [focus, setFocus] = useState(props.block.focus);
  // console.log(props.block.focus)
  

  // drag element
  const [dragState, setDragState] = useState({
    startX: 0,
    startY: 0
  });

  const onDragStart = (e) => {
    setDragState({
      startX: e.clientX,
      startY: e.clientY
    });
  }

  const onDragStop = (e) => {
    
    console.log('delta:', e.clientY - dragState.startY, e.clientX - dragState.startX);
    // console.log(style)

    setBlockTop(blockTop + e.clientY - dragState.startY);
    setBlockLeft(blockLeft + e.clientX - dragState.startX);

    
    const block = props.block;
    block.top = blockTop;
    block.left = blockLeft;

    // console.log("nb:", block, props.index);
    props.updateBlock(block, props.index);
    
  }



  const blockContent = <div
                        className={props.block.focus ? 'editor-block-focus' : 'editor-block'}
                        style={props.editState === 'drag'? "" : style}
                        ref={blockRef}
                        onMouseDown={(e) => props.onMouseDown(e, props.block)}
                      >
                        {renderComponent()}
                      </div>;

  let position={x: blockLeft, y: blockTop}

  if (props.editState === 'drag') 
  return (
    <Draggable
      onStart={(e) => onDragStart(e)}
      onStop={(e) => onDragStop(e)}
      position={position}
    
    >
      {blockContent}
    </Draggable>
  );

  return blockContent;
}

export default EditorBlock;

import { useRef, useEffect } from "react";

function EditorBlock(props) {
  const style = {
    top: `${props.block.top}px`,
    left: `${props.block.left}px`
  };


  //console.log(props, props.config.componentsMap[props.block.type]);
  
  const renderComponent = () => {
    const component = props.config.componentsMap[props.block.type];
    return component.render();
  }

  const blockRef = useRef(null);
  useEffect(() => {
    if (!props.block.alignCenter) return ;

    const { offsetWidth, offsetHeight } = blockRef.current;
    
    props.block.top = props.block.top - offsetHeight/2;
    props.block.left = props.block.left - offsetWidth/2;
    props.block.alignCenter = false;
    console.log(props)
    //console.log(offsetWidth, offsetHeight);

  }, []);


  return (
    <div
      className={props.className}
      style={style}
      ref={blockRef}
      onMouseDown={props.onMouseDown}
    >
      {renderComponent()}
    </div>
  );
}

export default EditorBlock;

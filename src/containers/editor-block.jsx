
function EditorBlock(props) {
  const style = {
    top: `${props.block.top}px`,
    left: `${props.block.left}px`
  };


  //console.log(props, props.config.componentsMap[props.block.type]);
  
  const renderComponent = function(){
    const component = props.config.componentsMap[props.block.type];
    return component.render();
  }

  return (
    <div className="editor-blocks" style={style}>
      {renderComponent()}
    </div>
  );
}

export default EditorBlock;

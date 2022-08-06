
function editorBlock(props) {
  const style = {
    top: `${props.block.top}px`,
    left: `${props.block.left}px`
  };

  // const config = ;

  // return () => {
  //   const component = props.config.componentMap[props.block.type];
  //   const RenderComponent = component.render();

  //   return (
  //     <div className="editor-blocks" style={style}>
  //       {props.block.type}
  //     </div>
  //   )
  // };
  return (
    <div className="editor-blocks" style={style}>
      {props.block.type}
    </div>
  );
}

export default editorBlock;

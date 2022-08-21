
function ComponentPanel(props) {
  return (
    <div className="editor components-panel">
        {props.componentsList.map((component, idx) => (
          <div
            className='component-item'
            draggable
            onDragStart={(event) => props.dragstart(event, component)}
            onDragEnd={props.dragend}
            key={idx}
          >
            <span>{component.label}</span>
            <div>{component.preview()}</div>
          </div>
        ))}

      </div>
  );
}

export default ComponentPanel;
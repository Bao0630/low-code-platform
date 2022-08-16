import deepcopy from 'deepcopy';

export function componentDragger(ref, props) {

  let currentComponent = null;

  const dragenter = (event) => {
    event.dataTransfer.dropEffect = 'move';
  };

  const dragover = (event) => {
    event.preventDefault();
  };

  const dragleave = (event) => {
    event.dataTransfer.dropEffect = 'none';
  };

  const drop = (event) => {
    if (!currentComponent) return;

    const page = props.page;
    let blocks = page.blocks;

    const pageData = {
      ...page, blocks: [
        ...blocks,
        {
          top: event.offsetY,
          left: event.offsetX,
          zIndex: 1,
          type: currentComponent.type,
          alignCenter: true
        }
      ]
    };

    props.editPage(deepcopy(pageData));
    currentComponent = null;
  };

  const dragstart = (event, component) => {
    // console.log(containerRef.current)
    ref.current.addEventListener('dragenter', dragenter);
    ref.current.addEventListener('dragover', dragover);
    ref.current.addEventListener('dragleave', dragleave);
    ref.current.addEventListener('drop', drop);
    currentComponent = component;
    // event.dataTransfer
  };

  const dragend = (event) => {
    ref.current.removeEventListener('dragenter', dragenter);
    ref.current.removeEventListener('dragover', dragover);
    ref.current.removeEventListener('dragleave', dragleave);
    ref.current.removeEventListener('drop', drop);
  }

  return {
    dragstart, dragend
  };
}
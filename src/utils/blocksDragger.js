// unsupported
// issue: 使用自定义 mouse 事件，拥有焦点的组件块在拖动中无法及时更新（拖动显示）
// selution: 暂定使用 redux 解决组件状态变化问题

export function blocksDragger(focusedBlocks, unfocusedBlocks, setBlocks) {
  let dragState = {
    startX: 0,
    startY: 0
  }
  const mouseMove = (e) => {
    if (focusedBlocks.length === 0) return ;
    let { clientX: moveX, clientY: moveY } = e;
    let deltaX = moveX - dragState.startX;
    let deltaY = moveY - dragState.startY;
    // console.log("delta",deltaX,deltaY)
    

    focusedBlocks.forEach((block, idx) => {
      block.top = dragState.startPos[idx].top + deltaY;
      block.left = dragState.startPos[idx].left + deltaX;
      console.log(block.top, block.left);
    });
    setBlocks([...focusedBlocks, ...unfocusedBlocks]);
    // console.log(blocks);

  };

  const mouseUp = (e) => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  const mouseDown = (e) => {
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: focusedBlocks.map(({ top, left }) => ({ top, left }))
    }
    console.log(dragState.startPos);

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };

  return {
    mouseDown
  }
}

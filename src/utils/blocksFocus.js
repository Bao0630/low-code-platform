// import { useMemo } from "react";



export function blocksFocus(blocks, setBlocks) {
  
  // const computeFocused = () => {
  //   let focused = [];
  //   let unfocused = [];
  //   blocks.forEach(block => (block.focus ? focused : unfocused).push(block));
  //   console.log(`focused: ${focused}`);
  //   return [focused, unfocused];
  // };
  
  // let [focusedBlocks, unfocusedBlocks] = computeFocused();

  const blockMouseDown = (event, block) => {
    event.preventDefault();
    event.stopPropagation();

    // debugger
    if (event.shiftKey) {
      block.focus = !block.focus;
    } else if (!block.focus) {
      clearBlocksFocus();
      block.focus = true;
    } else {
      block.focus = false;
    }
    setBlocks([...blocks]);

    console.log(block.type, block.focus);
  }
  
  // const changeBlocksFocus = function() {
  //   setBlocks([...blocks]);
  // }

  const clearBlocksFocus = function() {
    // debugger
    blocks.forEach(block => {
      block.focus = false;
    });
    setBlocks([...blocks]);
  }

  const containerMouseDown = function (event) {
    if (!event.shiftKey) clearBlocksFocus();
  }

  return {
    blockMouseDown, containerMouseDown, clearBlocksFocus
  };
}
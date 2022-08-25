import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
  page: {
      title: "new page",
      container: {
        "width": 500,
        "height": 600
      },
    },
    blocks: []
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    initCurPage(state, action) {
      state.page = action.payload;
    },
    updateBlock(state, action)  {
      // console.log(state.page, state.blocks);
      const { index } = action.payload;
      const blockIndex = state.page.blocks.findIndex(block => block.index === index);
      if (blockIndex !== -1) {
        state.page.blocks[blockIndex] = action.payload;
      }
    },
    addBlock(state, action) {
      state.blocks.push(action.payload);
    },
    deleteBlock(state, action) {
      const { index } = action.payload;
      const blockIndex = state.page.blocks.findIndex(block => block.index === index);
      if (blockIndex !== -1) {
        state.page.blocks.splice(blockIndex, 1);
      }
    },
    updatePageContainer: {
      reducer(state, action) {
        state.page.container = action.payload;
      },
      prepare(width, height) {
        return {
          payload: {
            width: width,
            height: height
          }
        };
      }
    },
    updatePageTitle(state, action) {
      state.page.title = action.payload;
    }
  }
})
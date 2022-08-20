import {createSlice} from '@reduxjs/toolkit';



export const editorSlice = createSlice({
  name: 'page',
  initialState: {
    page: {
      title: "new page",
      container: {
        "width": 500,
        "height": 600
      },
    },
    blocks: []
  },
  reducers: {
    savePage: (state) => {
      // console.log(state.page, state.blocks);
      const page = {
        ...state.page,
        blocks: [...state.blocks]
      }
      console.log(page);
    },
    increaseBlock: (state, action) => {
      state.blocks.push(action.payload);
    }
  }
})
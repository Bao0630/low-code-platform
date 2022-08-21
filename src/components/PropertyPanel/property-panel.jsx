import { Input, InputNumber, Typography } from 'antd';
import { useState } from 'react';
import './panel.css';


function PropertyPanel(props) {

  const [pageWidth, setPageWidth] = useState(props.pageData.container.width);
  const [pageHeight, setPageHeight] = useState(props.pageData.container.height);

  const onChangePageSize = (val, type) => {
    const page = {
      ...props.pageData
    }
    const container = {
      width: pageWidth,
      height: pageHeight
    }
    if (type === 'height') {
      setPageHeight(val);
      container.height = val;
    } else {
      setPageWidth(val);
      container.width = val;
    }
    
    page.container = container;
    props.updatePage(page);
    console.log('changed', container);
  };

  const onTitleChange = (val) => {
    const page = {
      ...props.pageData
    }
    page.title = val;
    props.updatePage(page);
    console.log('changed', page.title);
  };

  const onChangeZIndex = (val) => {
    console.log(val);

  }

  const pagePanel = (
    <div className='page panel'>
      <div className='page-title-editor'>
        <label htmlFor='title'>页面标题：</label>
        <Typography.Text
          id='title'
          editable={{ onChange: onTitleChange }}
          style={{left:"2px", width:"200px"}}
        >
          {props.pageData.title}
        </Typography.Text>
      </div>
      <div className='page-size-editor '>
        <div className='width-editor editor-item'>
          <label htmlFor='width'>width: </label>
          <InputNumber
            id='width'
            min={100} 
            max={10000}
            defaultValue={pageWidth}
            onChange={val => onChangePageSize(val, "width")}
          />
        </div>
        <div className='height-editor editor-item'>
          <label htmlFor='height'>height: </label>
          <InputNumber
            id='height'
            min={100}
            max={10000}
            defaultValue={pageHeight}
            onChange={val => onChangePageSize(val, "height")}
          />
        </div>
      </div>
      <div className='javascript-data'>
        <label htmlFor='js-data'>JSON: </label>
        <Input.TextArea
          id='js-data'
          rows={6}
          defaultValue={JSON.stringify(props.pageData).toString()}
          maxLength={5000}
        />
      </div>
    </div>
  );

  const blockPanel = !props.focused ? (
    <div className='block panel'>
      <Typography.Text>点击组件开始编辑</Typography.Text>
    </div>
  ) : (
    <div className='block panel'>
      <div className='block-type editor-item'>
        <label>block:</label>
        <Typography.Text>{props.focused.type}</Typography.Text>
      </div>
      <div className='zIndex-editor editor-item'>
        <label htmlFor='zIndex'>zIndex: </label>
        <InputNumber
          id='zIndex'
          min={0}
          max={100}
          defaultValue={props.focused.zIndex}
          onChange={onChangeZIndex}
        />
      </div>
      <div className='row-block-data'>
        <label htmlFor='row-data'>block_data: </label>
        <Input.TextArea
          id='row-data'
          rows={5}
          defaultValue={JSON.stringify(props.focused).toString()}
          maxLength={1100}
        />
      </div>

    </div>
  );

  return (
    <div className="editor property-panel">
      {props.curState === 'drag' ? pagePanel : blockPanel}
    </div>
  );
}


export default PropertyPanel;
import { InputNumber, Typography } from 'antd';
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
        <span>页面标题：</span>
        <Typography.Text
          editable={{ onChange: onTitleChange }}
          style={{left:"2px", width:"200px"}}
        >
          {props.pageData.title}
        </Typography.Text>
      </div>
      <div className='page-size-editor '>
        <div className='width-editor editor-item'>
          <label>width: </label>
          <InputNumber
            min={100} 
            max={10000}
            defaultValue={pageWidth}
            onChange={val => onChangePageSize(val, "width")}
          />
        </div>
        <div className='height-editor editor-item'>
          <label>height: </label>
          <InputNumber 
            min={100}
            max={10000}
            defaultValue={pageHeight}
            onChange={val => onChangePageSize(val, "height")}
          />
        </div>
      </div>
    </div>
  );

  const blockPanel = (
    <div className='block panel'>
      <Typography.Text>{("block:" + props.focused)}</Typography.Text>
      <div className='zIndex-editor editor-item'>
        <label>zIndex: </label>
        
        <InputNumber min={0} max={100} defaultValue={props.pageData.zIndex} onChange={onChangeZIndex} />
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
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';
import EditorBlock from '../../containers/editor-block';
import { registerConfig as config } from '../../utils/editor-config';
import './pageViewer.css';


export const PageViewer = (props) => {

  // const page = useSelector(state =>
  //   state.page
  // );
  const page = props.page;

  if (!page) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    );
  };

  return (
    <div className='preview'>
      <section>
        <h2>
          <Link
            to={{
                pathname: '/low-code-platform/editor',
            }}
          >
            <RollbackOutlined id="return-button"/>
          </Link>
        预览页面：{page.title}
        </h2>
      </section>
      <div className='viewer'>
        {(
          page.blocks.map((block, idx) => (
            <EditorBlock
              key={idx}
              block={block}
              config={config}
            />
          ))
        )}
      </div>
    </div>
  );
};
import './App.css';
import { useState } from 'react';
import { Link } from "react-router-dom";

import Editor from './Editor';

import page0 from '../cashData/page-data0.json';
import page1 from '../cashData/page-data1.json';
import user from '../cashData/user-data.json';

// 暂未按需加载 ant design
import 'antd/dist/antd.min.css';
import { UserOutlined, EditOutlined, FileTextOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PageHeader, Menu, Avatar, Image, Card } from 'antd';
import { Content } from 'antd/lib/layout/layout';


function App() {
  // const [pageData, setPageData] = useState(page);
  const pageMap = new Map();
  const pages = [page0, page1];
  user.pages.map((page, idx) => pageMap.set(page, pages[idx]));
  
  // if (isEditing) return (
  //   <Editor page={pageData} editPage={setPageData}/>
  // );
  // function getItem(label, key, icon, children, type) {
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //     type,
  //   };
  // }
  // const items = [
  //   getItem('页面', 'sub1', <EditOutlined />),
  //   getItem('文档', 'sub2', <FileTextOutlined />),
  //   getItem('我的', 'sub4', <UserOutlined />)
  // ];

  const items = [
    { label: '页面', key: 'page' }, // 菜单项务必填写 key
    {
      label: '文档',
      key: 'doc',
      children: [{ label: '文档子菜单项', key: 'doc-item-1' }],
    },
    { label: '我的', key: 'mine' },
  ];

  const switchContent = (e) => {
    console.log('click ', e);
  };

  const addPage = (e) => {
    console.log("add page");
    alert("new page");
  }

  const avatar_src = "file:///D:/青训营/low-code-proj/low-code-platform/src/cashData/img.jpg";

  const avatar = {
    // src: <img src="file:///D:/青训营/low-code-proj/low-code-platform/src/cashData/img.jpg"></img>,
    icon: <UserOutlined />,
    shape: "circle",
    alt: `${user.userName}-avatar`,
    style: {
      position: "absolute",
      height: "40px",
      width: "40px",
      right: "40px",
    }
  }

  // const pages = user.pages;

  let pageContent = user.pages.map((page, idx) => {
    const pageData = pageMap.get(page);
    return (
      <Card
        key={idx}
        className="page-card-item"
        style={{
          width: 300,
          height: 150,
          margin: 20,
        }}
        actions={[
          <Link
            to={"/low-code-platform/editor"}
          >
            <EditOutlined key="edit" />
          </Link>,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Card.Meta
          title={page}
          description={pageData.title}
        />
      </Card>
    );
  });

  let content = <div className="page-cards">
    {pageContent}
    <Card
        key={pages.length}
        className="page-card-item add-page"
        style={{
          width: 300,
          height: 150,
          margin: 20,
          display: "flex",
          "justifyContent": "center",
          "alignItems": "center",
        }}
        onClick={addPage}
      >
        <Card.Meta
          title="Add new Page"
        />
      </Card>
  </div>

  return (
    <div className="home" >
      <PageHeader
        className="site-header"
        title="unplayground"
        subTitle="A Low-Code platform"
        avatar={avatar}
      />
      <Menu
        className="app-menu"
        onClick={switchContent}
        style={{ width: "250px" }}
        defaultSelectedKeys={['page']}
        defaultOpenKeys={['page']}
        mode="inline"
        items={items}
      />
      <div className="app-content">
        
        {content}
      </div>

      {/* <Link to="/editor">Editor</Link> */}
    </div>
  );
}

export default App;
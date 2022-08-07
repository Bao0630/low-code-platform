import { Typography, Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";


function createComponentsConfig() {
  const componentsList = [];
  const componentsMap = {};

  return {
    componentsList,
    componentsMap,
    register: (component) => {
      componentsList.push(component);
      componentsMap[component.type] = component;
    }
  };

}

export let registerConfig = createComponentsConfig();

console.log(registerConfig);

registerConfig.register({
  label: '标题',
  preview: () => 'TextArea prewview',
  render: () => <Typography>Text</Typography>,
  type: 'text'

});
registerConfig.register({
  label: '按钮',
  preview: () => 'Button prewview',
  render: () => <Button type="primary">Button</Button>,
  type: 'button'
});
registerConfig.register({
  label: '输入',
  preview: () => 'Input prewview',
  render: () => <Input placeholder={"text"}></Input>,
  type: 'input'
});
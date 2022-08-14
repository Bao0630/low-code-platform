import { Typography, Button, Input, Checkbox, DatePicker } from "antd";
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
  preview: () => <Button type="primary">Button</Button>,
  render: () => <Button type="primary">Button</Button>,
  type: 'button'
});
registerConfig.register({
  label: '输入',
  preview: () => <Input placeholder={"text"}></Input>,
  render: () => <Input placeholder={"text"}></Input>,
  type: 'input'
});
registerConfig.register({
  label: '选项框',
  preview: () => <Checkbox disabled={true}>Checkbox</Checkbox>,
  render: () => <Checkbox>Checkbox</Checkbox>,
  type: 'checkbox'
});
registerConfig.register({
  label: '日期选择框',
  preview: () => <DatePicker></DatePicker>,
  render: () => <DatePicker></DatePicker>,
  type: 'checkbox'
});
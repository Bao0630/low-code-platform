import { Button } from "antd";
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
  label: '文本',
  preview: () => 'TextArea prewview',
  render: () => <TextArea></TextArea>,
  type: 'text'

});
registerConfig.register({
  label: '按钮',
  preview: () => 'Button prewview',
  render: () => <Button ></Button>,
  type: 'button'

});
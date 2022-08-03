import React from 'react';
import './Editor.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  render() {
    return (
      <div class="editor">
        <div class="editor components-panel"></div>
        <div class="editor property-panel"></div>
        <div class="editor menu"></div>
        <div class="editor container"></div>

          <div class="editor container-canvas">
            <div class="editor container-canvas_content">
              content
            </div>
          </div>

        <p>editor</p>
      </div>
    );
  }
  
}

export default Editor;

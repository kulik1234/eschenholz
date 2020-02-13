import React from 'react';
import Style from './css/FileElementStyles.module.css';

class FileElement extends React.Component {
    render() {
      return (
        <div className={Style.main}>
              <div className={Style.fl1}>{this.props.value}</div>
              <progress value={this.props.sendProgress} max="100"></progress>
              <div className={Style.x} name="close" value={this.props.value}>X</div>
        </div>
      );
    }
  }
  
  export default FileElement;

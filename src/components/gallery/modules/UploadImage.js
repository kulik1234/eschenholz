import React from 'react';
import Dropzone from './Dropzone';
import Style from './css/UploadImageStyles.module.css';

class UploadImage extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
      return (
        <div className={Style.main}>
              <Dropzone onFilesAdded={console.log} />

        </div>
      );
    }
  }
  
  export default UploadImage;

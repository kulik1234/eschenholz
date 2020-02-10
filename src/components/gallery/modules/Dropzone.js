import React from 'react';
import Style from './css/DropzoneStyles.module.css';
import uploadIcon from './css/icons8-upload-64.png';

class Dropzone extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hightlight: false }
        this.fileInputRef = React.createRef();
        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }
    onFilesAdded(evt) {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    }
    fileListToArray(list) {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }
    onDragOver(evt) {
        evt.preventDefault();
      
        if (this.props.disabled) return;
      
        this.setState({ hightlight: true });
      }

      onDragLeave() {
        this.setState({ hightlight: false });
      }
      onDrop(event) {
        event.preventDefault();
      
        if (this.props.disabled) return;
      
        const files = event.dataTransfer.files;
        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files);
        }
        this.setState({ hightlight: false });
        console.log(this.props.disabled);
      }

    render() {
        return (
            <div
                className={this.state.hightlight ? Style.highlight +" "+ Style.main : Style.main}
         onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
            >
                <img
                    alt="upload"
                    className={Style.icon}
                    src={uploadIcon}
                />
                <input
                    ref={this.fileInputRef}
                    className={Style.file_input}
                    type="file"
                    multiple
                    onChange={this.onFilesAdded}
                    accept="image/*"
                />
                <span>Upload Files</span>
            </div>
        );
    }
}

export default Dropzone;

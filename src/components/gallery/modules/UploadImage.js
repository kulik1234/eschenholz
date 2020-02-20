import React from 'react';
import Dropzone from './Dropzone';
import Style from './css/UploadImageStyles.module.css';
import FileElement from './FileElement';
import config from '../../../messages/messages';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      responsePhoto: {}
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.clearFileList = this.clearFileList.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.addPhotoUp = this.props.newphoto.bind(this);
  }
    onFilesAdded(files) {
      this.setState(prevState => ({
        files: prevState.files.concat(files)
      }));
    }

    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    async uploadFiles(){
      this.setState({ uploadProgress: {}, uploading: true });
      const promises = [];
      this.state.files.forEach(file => {
        let p = this.sendRequest(file);
        p.then(p=>p.onloadend=(e)=>{this.addPhotoUp(JSON.parse(e.explicitOriginalTarget.responseText))});
        promises.push(p);
      });
      try {
        for await(const promise of promises){
          Promise.resolve(promise);
          console.log(promise);
        }
        
        this.setState({ successfullUploaded: true, uploading: false });
      } catch (e) {
        // Not Production ready! Do some error handling here instead...
        this.setState({ successfullUploaded: true, uploading: false });
      }
    }

    

    sendRequest(file) {
      return new Promise((resolve, reject) => {
       const req = new XMLHttpRequest();
       req.open("PUT", config.HOST+"/api/photo");
       req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
         const copy = { ...this.state.uploadProgress };
         copy[file.name] = {
          state: "pending",
          percentage: (event.loaded / event.total) * 100
         };
         this.setState({ uploadProgress: copy });
        }
       });
        
       req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req);
       });
        
       req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req);
       });
       
       const formData = new FormData();
       formData.append("file", file, file.name);
       formData.append("nameOrTitle","test");
       formData.append("path","/uploaded");
       formData.append("descritpion","to jest zdjecie testowe");
       formData.append("author","tester");
       formData.append("category",this.props.category);
       formData.append("date","1999-12-24T12:00:00");
       req.send(formData);
      });
      
     }
    clearFileList(){
      this.setState({files: [],successfullUploaded: false});
    }
    removeFile(e){
      const t = e.target;
      const newList = [];
      
      if(t.getAttribute("name")==="close"){
          this.state.files.forEach(el => {
            if(el.name !== t.getAttribute("value"))
            newList.push(el);
          })
          this.setState({files: newList});
          if(newList.length < 1){
            this.setState({files: [],successfullUploaded: false});
          }
      }
    }

    


    render() {
      return (
        <div className={Style.main}>
              <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded} />
          <div className={Style.vertical}>
            <div className={Style.full} onClick={this.removeFile}>
            {this.state.files.map((i,k)=>
            <FileElement 
            value={i.name} 
            modified={i.lastModified}
            sendProgress={this.state.uploadProgress[i.name]?this.state.uploadProgress[i.name].percentage : 0} 
            key={k}
            />)}
              </div>
              <div className={Style.center+" "+Style.main}>
            <button onClick={this.clearFileList}>Wyczysc</button><button onClick={this.uploadFiles}>Wyslij</button>
              </div>
          </div>
        </div>
      );
    }
  }
  
  export default UploadImage;
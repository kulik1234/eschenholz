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
  
    this.clearFileList = this.clearFileList.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.addPhotoUp = this.props.newphoto.bind(this);
  }
    onFilesAdded(files) {
      this.setState(prevState => ({
        files: prevState.files.concat(files)
      }));
    }

    uploadFiles(){
        let f = ` var state;
        var props;
        onmessage = async (message)=>{
            state = message.data[0];
            props = message.data[1];
            url =  message.data[2];
           const promises = [];
           state.files.forEach(file => {
             let p = sendRequest(file,url);
             p.then(p=>p.onloadend=(e)=>{postMessage([JSON.parse(e.explicitOriginalTarget.responseText)])});
             promises.push(p);
           });
           try {
              await Promise.all(promises);
              state.successfullUploaded = true;
              state.uploading = false;
              postMessage([state,props]);
           } catch (e) {
             // Not Production ready! Do some error handling here instead...
             state.successfullUploaded = true;
              state.uploading = false;
              postMessage([state,props]);
           }
         }
       function sendRequest(file,url) {
           return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open("PUT",url);
            req.upload.addEventListener("progress", event => {
             if (event.lengthComputable) {
              const copy = { ...state.uploadProgress };
              copy[file.name] = {
               state: "pending",
               percentage: (event.loaded / event.total) * 100
              };
              state.uploadProgress = copy;
             }
            });
             
            req.upload.addEventListener("load", event => {
             const copy = { ...state.uploadProgress };
             copy[file.name] = { state: "done", percentage: 100 };
             state.uploadProgress = copy;
             resolve(req);
            });
             
            req.upload.addEventListener("error", event => {
             const copy = { ...state.uploadProgress };
             copy[file.name] = { state: "error", percentage: 0 };
             state.uploadProgress = copy;
             reject(req);
            });
            
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("nameOrTitle","test");
            formData.append("path","/uploaded");
            formData.append("descritpion","to jest zdjecie testowe");
            formData.append("author","tester");
            formData.append("category",props.category);
            formData.append("date","1999-12-24T12:00:00");
            req.send(formData);
           });
           
       }`;
       let _blob = new Blob([f], { type: 'text/javascript' });
      let worker = new Worker(window.URL.createObjectURL(_blob));
      let st = {
        files: [],
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false,
        responsePhoto: {}
      };

      st.files = this.state.files;
      st.uploading = this.state.uploadProgress;
      st.responsePhoto = this.state.responsePhoto;
      st.successfullUploaded = this.state.successfullUploaded;
      st.uploadProgress = this.state.uploadProgress;
      let pr = {"category" : this.props.category};
      worker.postMessage([
        st,
        pr,
        config.HOST+"/api/photo"
      ]);
      worker.onmessage = (a)=>{
        console.log(a.data);
      }
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

import { connect } from 'preact-redux';
import { withRouter } from 'react-router'
import {
  GET_FILES,
  CREATE_BUDGET,
  CLIENT_ID,
  SCOPES,
  SCRIPT_ID,
  API_KEY,
  GET_DATA,
  SAVE_DATA
} from './../constants';

import * as actions from './../actions';
import reduce from '../reducers';

const defaultState =  {
  createdBudget: false,
  gettingFiles:false,
  creatingBudget:false,
  gettingFileData:false,
  savingFileData:false
}

@withRouter
@connect(reduce, actions)
export default class GoogleApp{
  constructor(){
    window.isReady = this.isReady;
    this.state = {
      ...defaultState
    }
    this.addScript();
  }

  static getDerivedStateFromProps(props, state) {
    const { googleApp } = props;
    if(googleApp){
      const { action } = googleApp;
      const newState = {
        ...state,
        gettingFiles:defaultState.gettingFiles,
        creatingBudget:defaultState.creatingBudget,
        gettingFileData:defaultState.gettingFileData,
        savingFileData:defaultState.savingFileData
      }
      if(action===GET_FILES && !state.gettingFiles){
        newState.gettingFiles = true;
      }
      if(action===CREATE_BUDGET && !state.creatingBudget){
        newState.creatingBudget = true;
      }
      if(action===GET_DATA && !state.gettingFileData){
        newState.gettingFileData = true;
      }

      if(action===SAVE_DATA && !state.savingFileData){
        newState.savingFileData = true;
      }

      return newState;
    }
    return state;
  }

  addScript = ()=>{
    var newScript = document.createElement("script");
    window.document.head.appendChild(newScript);
    newScript.src = 'https://apis.google.com/js/api.js?onload=isReady';
  }

  render(){
    const { 
      gettingFiles,
      creatingBudget,
      gettingFileData,
      savingFileData
    } = this.state;

    const { googleApp, sheetData } = this.props;

    if(gettingFiles){
      this.getFiles(this.gotFiles);
    }
    if(creatingBudget){
      this.newBudget(this.budgetCreated);
    }
    if(gettingFileData){
      this.getFileData(googleApp.data,this.gotFileData);
    }
    if(savingFileData){
      const id = googleApp.data;
      const data = {
        ...sheetData[id],
        id
      };
      this.saveData(data,this.dataSaved);
    }
    return (null);
  }

  isReady =()=>{
    gapi.load('client:auth2', this.initClient);
  }

  initClient = ()=>{
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(this.didInit);
  }

  didInit = ()=>{
    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  updateSigninStatus = (isSignedIn)=>{
    const GoogleAuth = gapi.auth2.getAuthInstance();
    const isAuthorized = GoogleAuth.currentUser.get().hasGrantedScopes(SCOPES);
    if(!isAuthorized){
      var GoogleUser = GoogleAuth.currentUser.get();
      GoogleUser.grant({'scope': SCOPES});
    }
    
    const { changeLogStatus, auth } = this.props;
    changeLogStatus(isSignedIn);
  }

  saveData = (data,callback)=>{
    this.executeRequest({
        function: 'doPost',
        callback,
        parameters: data
    });
  }

  dataSaved = (req)=>{
    const { savedSheet } = this.props;
    this.getFiles(this.gotFiles);
    savedSheet(req.data.slug);
  }

  newBudget = (callback)=>{
    this.executeRequest({
        function: 'createNewFile',
        callback
    });
  }

  budgetCreated = (req)=>{
    this.getFiles(this.gotFiles);
    this.props.history.push(`/budget/${req.data.id}`);
    this.props.budgetCreated(req);
  }

  getFileData=(data, callback)=>{
    this.executeRequest({
        parameters: data,
        function: 'getData',
        callback
    });
  }

  gotFileData=(req)=>{
    const { googleApp } = this.props;
    const slug = googleApp.data;
    this.props.receivedSheetData(req.data, slug);
    this.getFiles(this.gotFiles);
  }

  getFiles=(callback)=>{
    this.executeRequest({
        function: 'getFiles',
        callback
    });
  }

  gotFiles=(data)=>{
    this.props.receivedFiles(data);
  }

  executeRequest =(request)=>{
    gapi.client.setToken(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse())
      var op = gapi.client.request({
        'root': 'https://script.googleapis.com',
        'path': 'v1/scripts/' + SCRIPT_ID + ':run',
        'method': 'POST',
        'body': request
      });
      op.execute((resp)=>{
        this.handleGetDataResponse(resp, {
          type:request.function,
          callback:request.callback
        });
      });
  }

  handleGetDataResponse =(resp,{type,callback})=> {
    if(resp.error){
      console.error(resp);
    } else if(callback && resp.done){
      const data = resp.response.result;
      callback.call(this, {
        status:resp.done,
        data
      });
    } else {
      console.error(resp);
    }
  }
};

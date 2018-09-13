import { connect } from 'preact-redux';
import { withRouter } from 'react-router'
import {
  GET_FILES,
  CREATE_BUDGET,
  CLIENT_ID,
  SCOPES,
  SCRIPT_ID,
  GET_DATA
} from './../constants';

import * as actions from './../actions';
import reduce from '../reducers';

const defaultState =  {
  createdBudget: false,
  gettingFiles:false,
  creatingBudget:false,
  gettingFileData:false,
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
        gettingFileData:defaultState.gettingFileData
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

      return newState;
    }
    return state;
  }

  addScript = ()=>{
    var newScript = document.createElement("script");
    window.document.head.appendChild(newScript);
    newScript.src = 'https://apis.google.com/js/client.js?onload=isReady';
  }

  render(){
    const { 
      gettingFiles,
      creatingBudget,
      gettingFileData
    } = this.state;

    const { googleApp } = this.props;

    if(gettingFiles){
      this.getFiles(this.gotFiles);
    }
    if(creatingBudget){
      this.newBudget(this.budgetCreated);
    }
    if(gettingFileData){
      this.getFileData(googleApp.data,this.gotFileData);
    }
    return (null);
  }

  isReady =()=>{
    gapi.auth.authorize({
        'client_id': CLIENT_ID,
          'scope': SCOPES,
        'immediate': true
    }, this.needsAuth);
  }

  needsAuth =(authResult)=>{
    const { props: { changeLogStatus } } = this;
    const isAuth = (authResult && !authResult.error);
    if(!isAuth){
      changeLogStatus(false);
      return;
    }
    changeLogStatus(true);
  }

  auth = (event)=> {
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
      },
      this.needsAuth);
  }

  saveData = (data,callback)=>{
    this.executeRequest({
        function: 'doPost',
        callback,
        parameters: data,
        devMode: true // Optional.
    });
  }

  newBudget = (callback)=>{
    this.executeRequest({
        function: 'createNewFile',
        callback
    });
  }

  budgetCreated = (req)=>{
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

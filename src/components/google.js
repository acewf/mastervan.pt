import { connect } from 'preact-redux';

import {
  GET_FILES,
  CREATE_BUDGET,
  CLIENT_ID,
  SCOPES,
  SCRIPT_ID
} from './../constants';

import * as actions from './../actions';
import reduce from '../reducers';

const defaultState =  {
  createdBudget: false,
  gettingFiles:false,
  creatingBudget:false,
  gettingFileData:false,
}

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
        creatingBudget:defaultState.creatingBudget
      }
      if(action===GET_FILES && !state.gettingFiles){
        newState.gettingFiles = true;
      }
      if(action===CREATE_BUDGET && !state.creatingBudget){
        newState.creatingBudget = true;
      }
      if(action===CREATE_BUDGET && !state.creatingBudget){
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

    if(gettingFiles){
      this.getFiles(this.gotFiles);
    }
    if(creatingBudget){
      this.newBudget(this.budgetCreated);
    }
    if(gettingFileData){
      this.newBudget(this.budgetCreated);
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

  budgetCreated = (data)=>{
   this.props.budgetCreated(data);
  }

  getData=(data)=>{
    this.executeRequest({
        parameters: data,
        function: 'getData'
    });
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
    if(callback){
      const data = resp.response.result;
      callback.call(this, {
        status:resp.done,
        data
      });
    } else if( resp.response){
      const data = resp.response.result;
      //  data,
      //  type
    } 
  }
};

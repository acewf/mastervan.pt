import axios from 'axios';


var CLIENT_ID = '931961555766-aot1ba3fk1sikc65qn86qi1aaedvj78q.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets',
    		  'https://www.googleapis.com/auth/documents'];
var SCRIPT_ID = "1iRU19QEE-aksImC375IYJH5BttLKLkSPooEbEEWW6xHXLy_pSq8ILhfJ";

export default class GoogleApp{
    constructor(changeState){
        console.log('google scripts');
        window.isReady = this.isReady;
        this.addScript();
        this.changeState = changeState;
    }

    addScript = ()=>{
        var newScript = document.createElement("script");
        window.document.head.appendChild(newScript);
        newScript.src = 'https://apis.google.com/js/client.js?onload=isReady';
    }

    isReady =()=>{
        gapi.auth.authorize({
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
        }, this.needsAuth);
    }

    needsAuth =(authResult)=>{
        const isAuth = (authResult && !authResult.error);
        if(!isAuth){
            // Ask for Auth
            console.log('Needs Auth');
            return;
        }
        this.changeState('noAuth');
    }

    click = (e)=>{
        console.log(e);
        var request = {
            'function': 'doPost',
            'parameters': {some:'data'},
            'devMode': true // Optional.
        };


        // Make the API request.
        var op = gapi.client.request({
            'root': 'https://script.googleapis.com',
            'path': 'v1/scripts/' + SCRIPT_ID + ':run',
            'method': 'POST',
            'body': request
        });
        op.execute(this.handleGetDataResponse);
    }

    handleGetDataResponse =(resp)=> {
        console.log('Resp',resp);
    }
};

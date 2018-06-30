var CLIENT_ID = '931961555766-aot1ba3fk1sikc65qn86qi1aaedvj78q.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets',
    		  'https://www.googleapis.com/auth/documents'];
var SCRIPT_ID = "1iRU19QEE-aksImC375IYJH5BttLKLkSPooEbEEWW6xHXLy_pSq8ILhfJ";

export default class GoogleApp{
    constructor(changeState){
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
            console.log('Needs Auth');
            return;
        }
        this.changeState({
          auth:true
        });
        this.getData();
    }

    click = (e)=>{
        this.executeRequest({
            'function': 'doPost',
            'parameters': {some:'data'},
            'devMode': true // Optional.
        });
    }

    getData=()=>{
      this.changeState({
        fecthingData:true
      });
      this.executeRequest({
          'function': 'getData'
      });
    }

    executeRequest =(request)=>{
        var op = gapi.client.request({
          'root': 'https://script.googleapis.com',
          'path': 'v1/scripts/' + SCRIPT_ID + ':run',
          'method': 'POST',
          'body': request
        });
        op.execute(this.handleGetDataResponse);
    }

    handleGetDataResponse =(resp)=> {
      if( resp.response){
        const data = resp.response.result;
        this.changeState({
          data
        });
      } else {
        console.log(resp);
      }
    }
};

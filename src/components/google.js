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
        this.changeState({
          auth:false
        });
        return;
      }
      this.changeState({
        auth:true
      });
      this.getFiles();
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
          callback,
          devMode: true
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

    getFiles=()=>{
      this.changeState({
        fecthingData:true
      });
      this.executeRequest({
          'function': 'getFiles'
      });
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
        this.changeState({
          data,
          type
        });
      } 
    }
};

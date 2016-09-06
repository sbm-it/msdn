console.log('oauth2.js');

(function(){
    var getParms=function(){// extract parameters from location search
        var y = {}
        // retrieve existing parms, if any
        if(localStorage.parms){ 
            var moreParms = JSON.parse(localStorage.parms)
            for (var p in moreParms){
                y[p]=moreParms[p]
            }
        }
        // now add those in teh location.search
        location.search.replace(/^\?/,'').split('&').forEach(function(str){
            str=str.split('=')
            y[str[0]]=str[1]
        })
        location.hash.replace(/^\#/,'').split('&').forEach(function(str){
            str=str.split('=')
            y[str[0]]=str[1]
        })
        localStorage.parms=JSON.stringify(y) // update localStorage
        return y
    }
    var parms = getParms()
    console.log('parms:',parms)
    var config = {
        instance: "https://login.microsoftonline.com/",
        tenant: "stonybrookmedicine.edu",
        clientId: "04c089f8-213f-4783-9b5f-cfa7b227d50b",
        redirectUri: location.href.split(/[?#]/)[0]
    };
    var h = '<h3>Playing with <a href="https://oauth.net/2/" target="_blank">OAUTH2</a> for OAUTHing Microsoft Cloud resources <a href="https://github.com/sbm-it/msdn" target="_blank"><i id="gitIcon" class="fa fa-github-alt" aria-hidden="true" style="color:maroon"></i></a> <i id="offIcon" class="fa fa-power-off" aria-hidden="true" style="color:maroon" onclick="localStorage.removeItem(\'parms\');location.href=location.href.split(/[?#]/)[0]"></i></h3>'
    h += ' <a href="https://github.com/jonasalmeida" target="_blank"> Jonas Almeida</a>, September 2016. '
    h +='<hr>'
    h +='<ol>'
    // Step 1 - call for code and state
    h +='<li id="step1">'
    h +='<h4 style="color:green">Public specifications:</h4>'
    h +='<pre>'
    h +='<br>config = {'
    h +='<br>  instance: "https://login.microsoftonline.com/",'
    h +='<br>  tenant: "stonybrookmedicine.edu",'
    h +='<br>  clientId: "04c089f8-213f-4783-9b5f-cfa7b227d50b",'
    h +='<br>  redirectUri: ' + location.href.split(/[?#]/)[0]
    h +='<br>};'
    h +='</pre>'
    h +='Which ammounts to a call to (click on it):'
    var url1 = 'https://login.microsoftonline.com/common/oauth2/authorize?response_type=code&redirect_uri='+config.redirectUri+'&client_id='+config.clientId
    h +='<p><a href="'+url1+'">'+url1+'</a></p>'
    h +='</li>'
    // Step 2

    if(parms.code){
        h += '<li id="step2">'
            h += '<h4 style="color:green">Get UserID:</h4>'
            h += 'We could now do this in the server side by passing the code onwards, as described in <a href="https://graph.microsoft.io/en-us/docs/authorization/app_authorization" target="_blank">this documentation</a>, or we can get the bearer token already using session_state to provide MS with the annoying <a href="https://en.wikipedia.org/wiki/Cryptographic_nonce" target="_blank">nonce</a> parameter (not common in other OAUTH2 services). We will now continue, as described in the <a href="https://azure.microsoft.com/en-us/documentation/articles/active-directory-authentication-scenarios/#single-page-application-spa" target="_blank">"single page application" documentation</a>, by proceedting to:'
            var url2 = 'https://login.windows.net/'+config.tenant+'/oauth2/authorize?response_type=id_token&client_id='+config.clientId+'&redirect_uri='+config.redirectUri+'&state='+parms.session_state+'&nonce='+parms.session_state
            h += '<p><a href="'+url2+'">'+url2+'</a></p>'

        h += '</li>'
    }

    // Step 3

    if(parms.id_token){
        h += '<li id="step3">'
            h += '<h4 style="color:green">Bingo! you have a bearer token with user ID embedded:</h4>'
            h += 'Now you can call for user info from anywhere (could you pass it to the server? give it a thought). MS tokens embedd user ids as <a href="https://jwt.io" target="_blank">JWT</a>.' 
            h += 'Note also that since the last bit came through the hash we can <button onclick="location.hash=\'\';">clean it from the URL</button> without thriggering reload.'
            h += ' Ready to <button id="jwtDecodeButton">decode the jwt token</button> being used as the id_token? (we\'ll use the <a href="https://github.com/auth0/jwt-decode" target="_blank">jwt-decode</a> cryptographic library):' 
        h += '</li>'
    }
    h +='</ol>'
    h +='<hr> Parameters acquired so far:'
    h +='<pre id="parmsPre" style="color:blue">'+JSON.stringify(JSON.parse(localStorage.parms),null,3)+'</pre>'
    oauth2Div.innerHTML=h
    // Event driven actions:
    offIcon.onmouseover=gitIcon.onmouseover=function(){
        this.style.color='red'
    }
    offIcon.onmouseleave=gitIcon.onmouseleave=function(){
        this.style.color='maroon'
    }
    if(document.getElementById('jwtDecodeButton')){
        jwtDecodeButton.onclick=function(){
            var decodeFun = function(){
                if(!document.getElementById('decodedTokenPre')){
                    var decodedToken = jwt_decode(parms.id_token)
                    var pre = document.createElement('pre')
                    pre.id="decodedTokenPre"
                    pre.innerHTML=JSON.stringify(decodedToken,null,3)
                    pre.style.color="green"
                    step3.appendChild(pre)
                }  
            }
            if(typeof(jwt_decode)=='undefined'){
                $.getScript('jwt-decode.min.js')
                 .then(function(){
                     decodeFun()
                 })
            }else{decodeFun()}            
        }
    }
})()




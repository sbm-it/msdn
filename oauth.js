console.log('oauth.js loaded');

OAUTH = function(x){
    x= x || {}
    // defaults
    this.url = x.url || 'https://login.microsoftonline.com/common/oauth2/authorize?response_type=code&'
    this.clientId= x.clientId || '04c089f8-213f-4783-9b5f-cfa7b227d50b'
    this.redirect_uri= x.redirect_uri || location.href.replace(/\?$/,'')
    this.login = function(){
        localStorage.setItem('msdnOauthConfig',JSON.stringify(this))
        location.href=this.url+'redirect_uri='+this.redirect_uri+'&client_id='+this.clientId
    }
    this.getId=function(){
        4
    }
}

// in case this is being run for show in the oauth sandbox

if(document.getElementById('oauthDiv')){
    var h = '<h3>Experimenting with <a href="https://oauth.net/2/" target="_blank">OAUTH2</a> for Microsoft Cloud resources <a href="https://github.com/sbm-it/msdn" target="_blank"><i id="gitIcon"" class="fa fa-github-alt" aria-hidden="true" style="color:maroon"></i></a></h3>'
    h += ' <a href="https://github.com/jonasalmeida" target="_blank"> Jonas Almeida</a>, September 2016. '
    h +='<hr>'
    h +='<ol>'
    var docUrl='https://azure.microsoft.com/en-us/documentation/articles/active-directory-authentication-scenarios'
    h +='<li> Read documentation: <a href="'+docUrl+'" target="_blank">'+docUrl+'</a>.</li>'
    h +='<li> Registered application with Azure active directory ...<span style="color:red">(Wade did it)</span>:</li>'
    h +='<li> Application ID: 04c089f8-213f-4783-9b5f-cfa7b227d50b</li>'
    h +='<li> Redirect URIs: "http://localhost:3000/*", ("https://sbm-it.github.io/*")</li>'
    h +='<li> OAUTH service: "https://login.microsoftonline.com/common/oauth2/authorize"</li>'
    h +='<li> ...</li>'
    h +='</ol>'
    h +='<hr>'
    h +='<div id="oauthFun">...</div>'
    // embelish github icon
    oauthDiv.innerHTML=h
    gitIcon.onmouseover=function(){
        this.style.color='red'
    }
    gitIcon.onmouseleave=function(){
        this.style.color='maroon'
    }
    // oauth fun now
    var h = '<h4>OAUTH2 fun</h4>'
    if((location.search.length==0)&(!localStorage.msdnOauth)){ // not logged in
        h += 'You are not logged in <button id="loginBt" class="btn btn-primary">Log In</button>'
        oauthFun.innerHTML=h
        loginBt.onclick=function(){
            (new OAUTH).login()
        }
    }else{
        h += 'You are logged in, <button id="logoutBt" class="btn btn-success">Log Out</button>'
        if(location.search.length>0){ // collect login credentials
            var str = location.search.slice(1)
            var oth={}
            str.split('&').forEach(function(av){
                av = av.split('=')
                oth[av[0]]=av[1]
            })
            localStorage.msdnOauth=JSON.stringify(oth)
        }
        oth=JSON.parse(localStorage.msdnOauth)
        if(localStorage.msdnOauthConfig){ // there is more
            var moreOth = JSON.parse(localStorage.msdnOauthConfig)
            for( var a in moreOth){
                oth[a]=moreOth[a]
            }
            localStorage.removeItem('msdnOauthConfig')
            localStorage.setItem('msdnOauth',JSON.stringify(oth))
            localStorage.setItem('msdnOauthLast',JSON.stringify(oth))
        }
        h += '<h5 style="color:blue">Login info found at localStorage.msdnOauth:</h5>'
        h += '<pre>'+JSON.stringify(oth,null,3)+'</pre><span style="color:navy">If you are developing a proxy service, you can now send the <span style="color:green">code value</span> above to your service from where you can get user identity as described in <a href="https://graph.microsoft.io/en-us/docs/authorization/app_authorization" target="_blank">this documentation</a>. That apporach will have your service POST the code value, the application id, application secret and redirect uri to <span style="color:green">https://login.microsoftonline.com/common/oauth2/token HTTP/1.1</span>. If you are instead developing a real Web App (what MS calls a "single page Application"), then we have to take a <a href="https://azure.microsoft.com/en-us/documentation/articles/active-directory-authentication-scenarios/#single-page-application-spa" target="_blank">different route</a>:</span><div id="getId" style="color:red">getting identification ... (not coded yet)</div>'   
        oauthFun.innerHTML=h
        logoutBt.onclick=function(){
            localStorage.removeItem('msdnOauth')
            location.search=''
        }
        // getId
        /*
        var payload='grant_type=authorization_code'
        payload +='&redirect_uri='+oth.redirect_uri.replace('?','')
        payload +='&client_id='+oth.clientId
        payload +='&client_secret='+oth.clientSc
        payload +='&code='+oth.code
        payload +='&resource=https%3A%2F%2Fgraph.microsoft.com%2F'
        getId.innerHTML = getId.textContent + ' from '+ payload
        if(false){
            $.post('https://login.microsoftonline.com/common/oauth2/token HTTP/1.1',payload)
             .then(function(x){
                 4
             })
        }
        */
    }
}
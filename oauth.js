console.log('oauth.js loaded');

OAUTH = function(x){
    x= x || {}
    // defaults
    this.url = x.url || 'https://login.microsoftonline.com/common/oauth2/authorize?response_type=code&'
    this.clientId= x.clientId || '04c089f8-213f-4783-9b5f-cfa7b227d50b'
    this.redirect_uri= x.redirect_uri || location.href
    this.login = function(){
        location.href=this.url+'redirect_uri='+this.redirect_uri+'&client_id='+this.clientId
    }
}

// in case this is being run for show in the oauth sandbox

if(document.getElementById('oauthDiv')){
    var h = '<h3>Experimenting with <a href="https://oauth.net/2/" target="_blank">OAUTH2</a> for Microsoft Cloud resources <a href="https://github.com/sbm-it/msdn" target="_blank"><i id="gitIcon"" class="fa fa-github-alt" aria-hidden="true" style="color:maroon"></i></a></h3>'
    h += ' <a href="https://github.com/jonasalmeida" target="_blank"> Jonas Almeida</a>, September 2016. '
    h +='<hr>'
    h +='<ol>'
    var docUrl='https://graph.microsoft.io/en-us/docs/authorization/app_authorization'
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
        h += '<h5 style="color:blue">Login info found at localStorage.msdnOauth:</h5>'
        h += '<pre>'+JSON.stringify(oth,null,3)+'</pre>'   
        oauthFun.innerHTML=h
        logoutBt.onclick=function(){
            localStorage.removeItem('msdnOauth')
            location.search=''
        }
    }
}
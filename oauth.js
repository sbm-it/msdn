console.log('oauth.js loaded');

OAUTH = function(){

}


// in case this is being run for show in the oauth sandbox

if(document.getElementById('oauthDiv')){
    var h = '<h3>Experimenting with <a href="https://oauth.net/2/" target="_blank">OAUTH2</a> for Microsoft Cloud resources</h3>'
    h += '<a href="https://github.com/sbm-it/msdn" target="_blank"><i id="gitIcon"" class="fa fa-github-alt" aria-hidden="true" style="color:maroon;font-size:x-large"></i></a>' 
    h += ' <a href="https://github.com/jonasalmeida" target="_blank"> Jonas Almeida</a>, '+Date()
    h +='<hr>'
    h +='<ol>'
    var docUrl='https://azure.microsoft.com/en-us/documentation/articles/active-directory-protocols-oauth-code'
    h +='<li>Read documentation: <a href="'+docUrl+'" target="_blank">'+docUrl+'</a>.</li>'
    h +='<li>Registered application with Azure active directory ...<span style="color:red">(Wade, tried to login Azure and was told I\'m not a registered developer, will stop by to ask for help registering App)</span>:</li>'
    h +='<li> Application ID: xxx</li>'
    h +='<li> Redirect URIs: xxx, xxx, xxx</li>'
    h +='<li> ...</li>'
    h +='</ol>'
    h +='<hr>'
    h +='<div id="oauthFun">...</div>'
    oauthDiv.innerHTML=h
    gitIcon.onmouseover=function(){
        this.style.color='red'
    }
    gitIcon.onmouseleave=function(){
        this.style.color='maroon'
    }

}
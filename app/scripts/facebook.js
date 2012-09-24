window.fbAsyncInit = function() {
    FB.init({
      appId      : '414447185270616', // App ID
      channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.Event.subscribe('auth.statusChange', handleStatusChange);
  };

function handleStatusChange(response) {
     document.body.className = response.authResponse ? 'connected' : 'not_connected';

     if (response.authResponse) { // user is logged in
       console.log(response);
       //updateUserInfo(response);
       //publishStory();
     }
   }

function loginUser() {    
     FB.login(function(response) { }, {scope:'email'});     
     }

function updateUserInfo(response) {
     FB.api('/me', function(response) {
       document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
     });
   }

function publishStory() {
  FB.ui({
    method: 'feed',
    name: 'I\'m building a social mobile web app!',
    caption: 'This web app is going to be awesome.',
    description: 'Check out Facebook\'s developer site to start building.',
    link: 'https://developers.facebook.com/mobile',
    picture: 'http://www.facebookmobileweb.com/getting-started/img/facebook_icon_large.png'
  }, 
  function(response) {
    console.log('publishStory response: ', response);
  });
  return false;
}

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));

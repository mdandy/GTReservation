window.fbAsyncInit = function() {
    FB.init({
      appId      : '414447185270616', // App ID
      channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
  };

function loginUser() {    
     FB.login(function(response) { }, {scope:'email'});     
     }

function publishStory() {
  FB.ui({
    method: 'feed'
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

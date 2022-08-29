const firebaseConfig = {
    apiKey: "AIzaSyBZeaDvaFOLZGMrtoRADlYaz6-ZIBV6TwI",
    authDomain: "rede-tifi.firebaseapp.com",
    databaseURL: "https://rede-tifi-default-rtdb.firebaseio.com",
    projectId: "rede-tifi",
    storageBucket: "rede-tifi.appspot.com",
    messagingSenderId: "597769609686",
    appId: "1:597769609686:web:bb5e7365856e2fb6b04477"
  };
  
  firebase.initializeApp(firebaseConfig);

  var nomeSala = localStorage.getItem("nomeSala");
  var username = localStorage.getItem("userName")

  function getData(){
    firebase.database().ref("/"+nomeSala).on('value', function(snapshot){
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot){
            childKey  = childSnapshot.key; childData = childSnapshot.val();
            if(childKey != "purpose"){
                firebaseMessageId = childKey;
                messageData = childData;
                console.log(firebaseMessageId)
                console.log(messageData)
                name = messageData['name'];
                message = messageData['mensage'];
                like = messageData['like'];
                nameWithTag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
                messageWithTag = "<h4 class='message_h4'>" + message +"</h4>";
                like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
                spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
       

                row = nameWithTag + messageWithTag + like_button + spanWithTag;
                document.getElementById("output").innerHTML += row
            }
        });
    });
}
getData();

function enviar(){
    msg = document.getElementById("txtMensagem").value;
    firebase.database().ref(nomeSala).push({
        name: username, 
        mensage: msg, 
        like: 0
    })
    document.getElementById("txtMensagem").value = " ";
}

function updateLike(messageId){
    console.log("entrou1")
    button_id = messageId;
    likes = document.getElementById(button_id).value
    updateLikes = Number(likes) + 1;

    firebase.database().ref(nomeSala).child(messageId).update({
        like: updateLikes
    });
    console.log("entrou")
}

function logout(){
    localStorage.removeItem("user")
    localStorage.removeItem("nomeSala")
    window.location = "index.html";
  }
var Config = {
    apiKey: "AIzaSyCW1T_39gRCtFnvvespraWM22s7Mlz4PIE",
    authDomain: "trains-263ab.firebaseapp.com",
    databaseURL: "https://trains-263ab.firebaseio.com",
    // projectId: "trains-263ab",
    storageBucket: "trains-263ab.appspot.com",
    // messagingSenderId: "813486538049",
    // appId: "1:813486538049:web:f07814f2e380638dc2f5c0",
    // measurementId: "G-23M38PBQCT"
  };
  // Initialize Firebase
  firebase.initializeApp(Config);

var database= firebase.database();

$("#submit").on("click", function(event){
    event.preventDefault();

    var tName= $("#trainName").val().trim();
    var destination= $("#destination").val().trim();
    var time= moment($("#time").val().trim()).startOf('hour').fromNow();
    var frequency= $("#frequency").val().trim();

    var newTrain= {
        name: tName,
        destin: destination,
        startTime: time,
        freq: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destin);
    console.log(newTrain.startTime);
    console.log(newTrain.freq);


    $("#trainName").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
});
database.ref().on("child_added",function(childSnapshot){
    console.log(childSnapshot.val());

    var tName= childeSnapshot.val().name;
    var destination=childSnapshot.val().destin;
    var time= childSnapshot.val().startTime;
    var frequency= childSnapshot.val().freq;

    console.log(tName);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    var trainTime= moment.unix(time).format('LT');

    console.log(trainTime);

    var newRow= $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(destination),
        $("<td>").text(time),
        $("<td>").text(frequency)
    );
    $("#trainTable > tbody").append(newRow);
});

//   firebase.analytics();
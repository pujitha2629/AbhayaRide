//  Firebase Configuration (replace with your keys)
const firebaseConfig = {
  apiKey: "AIzaSyCkRtlt8CWzIWvvKDnyit9rt5_A-ut6jU8",
  authDomain: "abhayaride.firebaseapp.com",
  projectId: "abhayaride",
  storageBucket: "abhayaride.firebasestorage.app",
  messagingSenderId: "822241211572",
  appId: "1:822241211572:web:701bf0ffd56a55846153e1",
  measurementId: "G-TYMCV05EET"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//  QR Scanner
//  QR Scanner (FIXED)
function onScanSuccess(qrText) {
  const driverId = qrText.trim();

  db.collection("Drivers").doc(driverId).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();

      document.getElementById("dname").innerText = data.Name;
      document.getElementById("vehicle").innerText = data.Vechile;

      // Load driver photo
       document.getElementById("driverPhoto").src = data.photo;
      document.getElementById("driverPhoto").style.display = "block";

      document.getElementById("driverCard").classList.remove("hidden");
    } else {
      alert("❌ Driver Not Verified!");
    }
  });
}



new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 })
  .render(onScanSuccess);

//  Start Ride
function startRide() {
  document.getElementById("ridePanel").classList.remove("hidden");
}

//  SOS Function
function sendSOS() {
  db.collection("sos_alerts").add({
    time: new Date(),
    message: "Emergency triggered!"
  });
  alert(" SOS Sent to Authorities!");
}
// Store GPS watcher ID
let locationWatcherId = null;

// Store last known location (used for SOS)
let lastLat = null;
let lastLng = null;

// Start Ride & Start Live Tracking
function startRide() {
  document.getElementById("ridePanel").classList.remove("hidden");

  if (!currentDriverId) {
    alert("Scan driver QR first!");
    return;
  }

  if (navigator.geolocation) {
    locationWatcherId = navigator.geolocation.watchPosition(
      (position) => {
        lastLat = position.coords.latitude;
        lastLng = position.coords.longitude;

        const locationData = {
          lat: lastLat,
          lng: lastLng,
          lastUpdated: new Date()
        };

        //   Update live location in Firestore
        db.collection("live_locations")
          .doc(currentDriverId)
          .set(locationData);

        console.log(" Live location updated:", locationData);
      },
      (error) => {
        console.error("GPS Error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );
  } else {
    alert("Geolocation not supported by this browser");
  }
}

//  Stop Live Tracking
function stopTracking() {
  if (locationWatcherId !== null) {
    navigator.geolocation.clearWatch(locationWatcherId);
    locationWatcherId = null;
    console.log("GPS tracking stopped");
  }
}

//  STEP 5: SOS with LIVE LOCATION
// Voice SOS Feature
let recognition;
let isListening = false;

function startVoiceSOS() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
        console.log( "Voice listening started");
        isListening = true;
    };

    recognition.onresult = (event) => {
        const transcript =
            event.results[event.results.length - 1][0].transcript
                .toLowerCase();

        console.log("Heard:", transcript);

        if (
            transcript.includes("help") ||
            transcript.includes("sos") ||
            transcript.includes("danger")
        ) {
            console.log("Voice SOS detected!");
            sendSOS(); // EXISTING SOS FUNCTION
            recognition.stop();
        }
    };

    recognition.onerror = (event) => {
        console.error("Voice error:", event.error);
    };

    recognition.start();
}
function startRide() {
    document.getElementById("ridePanel").classList.remove("hidden");
    startVoiceSOS(); //  Start voice monitoring
}
function sendSOS() {
  if (!currentDriverId) {
    alert("Scan driver QR first");
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    db.collection("sos_alerts").add({
      driverId: currentDriverId,
      driverName: currentDriverName,
      vehicle: currentVehicleNumber,
      location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      time: new Date(),
      trigger: "VOICE"
    });

    alert("SOS SENT!");
  });
}

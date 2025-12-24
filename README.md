🚍 Real-Time Driver Verification & Women Safety System
📌 Problem Statement

Women using public transport often lack an immediate and dependable way to verify auto or cab driver identities. The absence of real-time driver traceability increases vulnerability and reduces overall safety during travel.

💡 Solution Overview

This project provides a real-time driver verification and safety system that helps passengers, especially women, verify driver details before or during a ride and send emergency alerts when needed.

The system ensures:

Transparency of driver identity

Improved passenger trust

Quick emergency response through SOS

✨ Key Features

🔍 Driver Identity Verification (via QR code / stored driver data)

🖼️ Driver Photo Display for visual confirmation

📍 Live GPS Location Tracking

🚨 SOS Emergency Button

☁️ Firebase Realtime Database Integration

📱 Web-based Interface (HTML, CSS, JavaScript)

🛠️ Technologies Used

Frontend: HTML, CSS, JavaScript

Backend / Database: Firebase Realtime Database

Storage: Firebase Cloud Storage (for driver photos)

APIs: Geolocation API

Tools: Git, GitHub

🧩 System Architecture

Driver details are stored securely in Firebase.

Passenger scans a QR code / selects a ride.

Driver information (name, vehicle number, photo) is displayed.

GPS tracks the ride location in real time.

SOS button sends alert data (location + ride details).

🚀 How to Run the Project

Clone the repository:

git clone https://github.com/your-username/project-name.git


Open the project folder.

Configure Firebase:

Create a Firebase project

Enable Realtime Database & Storage

Add your Firebase config in config.js

Open index.html in a browser.

Allow location access when prompted.

📂 Project Structure
/project-root
│── index.html
│── style.css
│── script.js
│── firebase-config.js
│── assets/
│── README.md

🔒 Security & Privacy

Driver data is stored securely in Firebase.

Location access is used only during the ride.

SOS feature is triggered only with user consent.

🎯 Future Enhancements

Face recognition for driver verification

Voice-activated SOS

SMS/WhatsApp alert integration

AI-based route deviation detection

👩‍💻 Contributors

Pujitha Annepu

Team Members (if any)

📜 License

This project is for academic and educational purposes.

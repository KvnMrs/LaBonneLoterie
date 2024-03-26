// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// See a full list of supported triggers at https://firebase.google.com/docs/functions
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

exports.checkAnnounceEndAt = onDocumentUpdated(
  "/Announces/{documentId}",
  (event) => {
    if (event.data.after.data()["winner"]) return null;
    const ticketsBuyed = event.data.after.data()["ticketsBuyed"];
    const randomIndex = Math.floor(Math.random() * ticketsBuyed.length);
    const winnerTicket = ticketsBuyed[randomIndex];

    return event.data.after.ref.update(
      { winner: winnerTicket },
      { merge: true }
    );
  }
);

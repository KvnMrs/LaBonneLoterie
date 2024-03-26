const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { FieldValue } = require("firebase-admin/firestore");

initializeApp();

exports.checkAnnounceEndAt = onDocumentUpdated(
  "/Announces/{documentId}",
  (event) => {
    if (event.data.after.data()["winner"]) return null;
    console.log("11111111111", event);
    const ticketsBuyed = event.data.after.data()["ticketsBuyed"];
    const randomIndex = Math.floor(Math.random() * ticketsBuyed.length);
    const winnerTicket = ticketsBuyed[randomIndex];
    return event.data.after.ref.update(
      {
        winner: winnerTicket,
        ticketsBuyed: FieldValue.delete(),
      },
      { merge: true }
    );
  }
);

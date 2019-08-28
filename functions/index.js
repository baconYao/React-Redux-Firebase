const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// 建立一個https.request的trigger，當有收到request時，就會trigger此cloud function
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello baconYao");
});

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
})

// 建立一個firestore.document的trigger，當有新的project被建立時，就會trigger這個cloud function
exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {
    
    const project = doc.data();
    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
})
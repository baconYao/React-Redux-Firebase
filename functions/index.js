const functions = require('firebase-functions');
const admin = require('firebase-admin');
// 初始化，使得cloud functions有能力去存取firebase上面的services
admin.initializeApp(functions.config().firebase);

// 建立一個https.request的trigger，當有收到request時，就會trigger此cloud functions
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello baconYao");
});

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
});

// 建立一個firestore.document的trigger，當有新的project被建立時，就會trigger這個cloud functions
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
});

// 建立一個auth的trigger，當有新的user加入時，就會trigger此cloud functions
exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});
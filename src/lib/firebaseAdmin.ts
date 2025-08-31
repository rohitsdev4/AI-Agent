import admin from 'firebase-admin';

// This is a server-side only file.

// Check if the app is already initialized to prevent re-initialization
if (!admin.apps.length) {
  try {
    // The service account key is expected to be in an environment variable
    // as a JSON string. This is a secure way to handle credentials.
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountJson) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
    }

    const serviceAccount = JSON.parse(serviceAccountJson);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    // In a production environment, you might want to handle this more gracefully,
    // for example, by preventing the application from starting or by having
    // a fallback mechanism.
  }
}

// Export the firestore instance
const firestore = admin.firestore();

export { firestore };

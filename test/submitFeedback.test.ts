import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, signInAnonymously } from 'firebase/auth';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

// Replace with your actual project ID
const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'localhost',
  projectId: 'defield-data',
};

async function runTest() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  connectAuthEmulator(auth, 'http://localhost:9099'); // Connect to the Auth emulator
  const functions = getFunctions(app);
  connectFunctionsEmulator(functions, 'localhost', 5001);

  try {
    await signInAnonymously(auth);
    const submitFeedback = httpsCallable(functions, 'submitFeedback');
    const result = await submitFeedback({ feedback: 'Test feedback from automated test' });
    console.log('Function result:', result.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

runTest();

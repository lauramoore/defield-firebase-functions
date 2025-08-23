"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const functions_1 = require("firebase/functions");
// Replace with your actual project ID
const firebaseConfig = {
    apiKey: 'fake-api-key',
    authDomain: 'localhost',
    projectId: 'defield-firebase',
};
async function runTest() {
    const app = (0, app_1.initializeApp)(firebaseConfig);
    const auth = (0, auth_1.getAuth)(app);
    (0, auth_1.connectAuthEmulator)(auth, 'http://localhost:9099'); // Connect to the Auth emulator
    const functions = (0, functions_1.getFunctions)(app);
    (0, functions_1.connectFunctionsEmulator)(functions, 'localhost', 5001);
    try {
        await (0, auth_1.signInAnonymously)(auth);
        const submitFeedback = (0, functions_1.httpsCallable)(functions, 'submitFeedback');
        const result = await submitFeedback({ feedback: 'Test feedback from automated test' });
        console.log('Function result:', result.data);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
runTest();
//# sourceMappingURL=submitFeedback.test.js.map
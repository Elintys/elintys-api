import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

/**
 * Pour obtenir cette clé :
 * 1. Va sur Firebase Console > Paramètres du projet > Comptes de service
 * 2. Clique sur "Générer une nouvelle clé privée"
 * 3. Copie le JSON dans ton .env sous FIREBASE_SERVICE_ACCOUNT_KEY
 */
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;

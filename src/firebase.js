import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDFN-73p8zKVZbA0i5DtO215XzAb-xuGSE",
  authDomain: "ammart-8885e.firebaseapp.com",
  projectId: "ammart-8885e",
  storageBucket: "ammart-8885e.appspot.com",
  messagingSenderId: "1000163153346",
  appId: "1:1000163153346:web:4f702a4b5adbd5c906b25b",
  measurementId: "G-L1GNL2YV61",
};
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }

    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
        "BOafs51MmDIomDbBlXrEdpFXJQ_-fzWggglK9OEro9gj1cbMfZOIRpHKIiNErt54B3w6zXeru3Ls45fILn2y5Ko",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );

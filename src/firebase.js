import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCc9xWmBq8bx7pJbulmyOSXcUNI7xDlRUI",
  authDomain: "voubedelivery.firebaseapp.com",
  projectId: "voubedelivery",
  storageBucket: "voubedelivery.appspot.com",
  messagingSenderId: "528852790709",
  appId: "1:528852790709:web:130f60a3248d7d69bc3dfc",
  measurementId: "G-F6BQL92T9M"
};
const firebaseApp = initializeApp(firebaseConfig);
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

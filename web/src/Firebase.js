// import app from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyA54itehR1_xpTBWW9ES4-vFhGeGz8Iet0",
//   authDomain: "tkbbachkhoa.firebaseapp.com",
//   databaseURL: "https://tkbbachkhoa.firebaseio.com",
//   projectId: "tkbbachkhoa",
//   storageBucket: "tkbbachkhoa.appspot.com",
//   messagingSenderId: "716822316909",
//   appId: "1:716822316909:web:b5e831ac31ff3a8005bc64",
// };

// class firebase {
//   constructor() {
//     app.initializeApp(firebaseConfig);
//     this.auth = app.auth();
//     this.db = app.firestore();
//   }

//   login = async (email, password) => {
//     let error = null;
//     try {
//       await this.auth.signInWithEmailAndPassword(email, password);
//     } catch (err1) {
//       try {
//         await this.auth.createUserWithEmailAndPassword(email, password);
//       } catch (err2) {
//         error = err2;
//       }
//     }
//     if (error) {
//       const err = { message: "Login failed! Try again." };
//       throw err;
//     }
//   };
// }

// export default new firebase();

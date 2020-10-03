// import app from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyA54itehR1_xpTBWW9ES4-vFhGeGz8Iet0',
//   authDomain: 'tkbbachkhoa.firebaseapp.com',
//   databaseURL: 'https://tkbbachkhoa.firebaseio.com',
//   projectId: 'tkbbachkhoa',
//   storageBucket: 'tkbbachkhoa.appspot.com',
//   messagingSenderId: '716822316909',
//   appId: '1:716822316909:web:b5e831ac31ff3a8005bc64',
// };

// app.initializeApp(firebaseConfig);
// export const auth = app.auth();
// export const db = app.firestore();

export const initState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyCS401C9EKyYuLF4sazjBeXueomOHlv308',
    authDomain: 'ironsync-4b902.firebaseapp.com',
    databaseURL: 'https://ironsync-4b902.firebaseio.com',
    projectId: 'ironsync-4b902',
    storageBucket: 'ironsync-4b902.appspot.com',
    messagingSenderId: '332427066953',
    appId: '1:332427066953:web:02cca1ed890b95cb944998'
  }
  firebase.initializeApp(config)
}
const fireDb = firebase.firestore()
export { fireDb }

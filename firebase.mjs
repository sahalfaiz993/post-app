// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore ,addDoc ,collection , getDocs} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCwPnLn6P7k2oqDMz4E0_bS1n7CVH2yzO8",
    authDomain: "class-d6528.firebaseapp.com",
    projectId: "class-d6528",
    storageBucket: "class-d6528.appspot.com",
    messagingSenderId: "402388636783",
    appId: "1:402388636783:web:1d111d78539c405fdda99a"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var btn = document.getElementById('add')

btn.addEventListener('click', async () => {
 let  pic = document.getElementById("picture").files[0]
        const storage = getStorage();
const storageRef = ref(storage, "hello");
const uploadTask = uploadBytesResumable(storageRef, pic);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      var data = document.getElementById("text").value
      var pic = document.getElementById("picture").files[0]
  
      try {
          const docRef = await addDoc(collection(db, "users"), {
              data: data,
             picture:downloadURL
          })}

          catch (e) {
            console.error("Error adding document: ", e);
        }
      
    });
  }
);

        console.log("Document written with ID: ", docRef.id);
        location.reload()
    } 
)
var contai =document.querySelector(".post")
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
   contai.innerHTML+=`
   <h1 id="title">Title: ${doc.data().data}</h1>
   <img src="${doc.data().picture}" alt="">

   `
});
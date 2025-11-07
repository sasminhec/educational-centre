import { auth, db } from './firebase-init.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

const form = document.getElementById('regForm');
form.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value.trim();

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    await setDoc(doc(db, "registrationRequests", uid), {
      email, name, uid, createdAt: new Date().toISOString()
    });

    alert("Registered! Pending admin approval.");
    window.location = "login.html";
  } catch (err) {
    alert("Error: " + err.message);
  }
};
import { auth, db } from './firebase-init.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    const approvedDoc = await getDoc(doc(db, "approvedUsers", uid));
    if (!approvedDoc.exists()) {
      msg.textContent = "Your account is not yet approved by admin.";
      auth.signOut();
      return;
    }
    localStorage.setItem('studentUID', uid);
    window.location = "dashboard.html";
  } catch (err) {
    msg.textContent = "Login failed: " + err.message;
  }
};
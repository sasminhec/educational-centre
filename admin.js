import { auth, db } from './firebase-init.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

const adminForm = document.getElementById('adminLoginForm');
const requestsArea = document.getElementById('requestsArea');
const requestsList = document.getElementById('requestsList');
const adminActions = document.getElementById('adminActions');

const ADMIN_EMAIL = "sasminhec@gmail.com";

adminForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert("Admin sign-in error: " + err.message);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  if (user.email !== ADMIN_EMAIL) {
    alert("Not admin account.");
    return;
  }

  requestsArea.style.display = 'block';
  adminActions.style.display = 'block';
  requestsList.innerHTML = '';
  const snaps = await getDocs(collection(db, "registrationRequests"));
  snaps.forEach(ds => {
    const d = ds.data();
    const li = document.createElement('li');
    li.innerHTML = <strong>${d.name}</strong> — ${d.email} <button data-uid="${d.uid}">Approve</button>;
    requestsList.appendChild(li);
    li.querySelector('button').onclick = async () => {
      await setDoc(doc(db, "approvedUsers", d.uid), {
        email: d.email, name: d.name, approvedAt: new Date().toISOString()
      });
      await deleteDoc(doc(db, "registrationRequests", d.uid));
      li.remove();
      alert("Approved: " + d.email);
    };
  });
});

document.getElementById('addContent').onclick = async () => {
  const type = document.getElementById('contentType').value;
  const title = document.getElementById('contentTitle').value.trim();
  const url = document.getElementById('contentUrl').value.trim();
  if (!title) return alert("Enter title");
  await addDoc(collection(db, "content"), { type, title, url, createdAt: new Date().toISOString()});
  alert("Content added");
  document.getElementById('contentTitle').value='';
  document.getElementById('contentUrl').value='';
};
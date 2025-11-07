import { auth, db } from './firebase-init.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

const welcome = document.getElementById('welcome');
const liveList = document.getElementById('liveList');
const videoList = document.getElementById('videoList');
const tuteList = document.getElementById('tuteList');
const logoutBtn = document.getElementById('logout');

onAuthStateChanged(auth, async (user) => {
  if (!user) return window.location = "login.html";
  const uid = user.uid;
  const approved = await getDoc(doc(db, "approvedUsers", uid));
  if (!approved.exists()) {
    alert("Not approved yet.");
    await signOut(auth);
    window.location = "login.html";
    return;
  }

  welcome.textContent = Welcome, ${user.email};

  const q = await getDocs(collection(db, "content"));
  q.forEach(docSnap => {
    const data = docSnap.data();
    const li = document.createElement('li');
    li.innerHTML = <strong>${data.title}</strong> — <a href="${data.url}" target="_blank">Open</a>;
    if (data.type === 'live') liveList.appendChild(li);
    if (data.type === 'video') videoList.appendChild(li);
    if (data.type === 'tute') tuteList.appendChild(li);
  });
});

logoutBtn.onclick = async () => {
  await signOut(auth);
  window.location = "login.html";
};
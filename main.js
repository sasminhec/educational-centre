const root = document.getElementById("root");
let lang = "en";

function render() {
  root.innerHTML = 
  <header>
    <h1>${lang === "en" ? "Sasmin Higher Educational Centre" : "සස්මින් උසස් අධ්‍යාපන මධ්‍යස්ථානය"}</h1>
    <button onclick="toggleLang()">${lang === "en" ? "සිංහල" : "English"}</button>
  </header>

  <section>
    <h2>${lang === "en" ? "About Us" : "අප ගැන"}</h2>
    <p>${lang === "en"
      ? "We provide online Maths & Science classes with live lessons, recordings, and papers."
      : "අපි සජීවී පන්ති, පටිගත වීඩියෝ සහ ප්‍රශ්න පත්‍ර සමඟ ගණිත හා විද්‍යා පාඩම් ලබා දෙයි."}</p>
  </section>

  <section>
    <h2>${lang === "en" ? "Contact Us" : "අප අමතන්න"}</h2>
    <p>WhatsApp: 070 283 7494<br>Email: sasminhec@gmail.com<br>
    <a href="https://www.facebook.com/share/1aXEZb8JW4/" target="_blank">Facebook</a></p>
  </section>

  <footer>
    © ${new Date().getFullYear()} Sasmin Higher Educational Centre. ${lang === "en" ? "All rights reserved." : "සියලු හිමිකම් ඇවිරිණි."}
  </footer>;
}

function toggleLang() {
  lang = lang === "en" ? "si" : "en";
  render();
}

render();
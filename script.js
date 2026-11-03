// script.js - Hamo Offline 87 Songs
const songs = [
  "1.mp3", "3Am.mp3", "71.mp3", "A_alam.mp3", "AbbiL.mp3", "Abyad.mp3", "Afel babak.mp3", "Ahlam.mp3", "AKH.mp3", "AMANA.mp3", "Amar.mp3", "Amen.mp3", "Ayam-w-khalas.mp3", "Bye.mp3", "Bzns.mp3", "DA SHIT.mp3", "Dayra.mp3", "Dede.mp3", "Denya.mp3", "El saraha.mp3", "El ser.mp3", "El-LEILA.mp3", "Eldawama.mp3", "ENTA MALAK.mp3", "Ermy kash.mp3", "Ersh.mp3", "ESME.mp3", "Film.mp3", "Freestyle.mp3", "Ga3Ga3.mp3", "Garee2.mp3", "Garima.mp3", "Garima-live.mp3", "Gazar.mp3", "Gezira.mp3", "God_s Plan.mp3", "Habibi.mp3", "HAKEEM.mp3", "Hay.mp3", "Hekaya.mp3", "HELW.mp3", "Heya-de-eldonya.mp3", "HFK.mp3", "Hor.mp3", "ID.mp3", "Ilmond.mp3", "INSAN.mp3", "INTIFADA.mp3", "Kacholowh.mp3", "KAF.mp3", "Kart.mp3", "Kitkat.mp3", "Leily.mp3", "Lyh.mp3", "MA-LAB.mp3", "Ma-vie.mp3", "Maa-elsalama.mp3", "Maa-elsalama-III.mp3", "Malek.mp3", "Msr.mp3", "MVP.mp3", "Nas.mp3", "Ne3id Malawel.mp3", "No Problema.mp3", "OK.mp3", "Radio.mp3", "Ragel.mp3", "Rap.mp3", "Rehla.mp3", "Rez2y.mp3", "Rooh.mp3", "Saffah.mp3", "Safi.mp3", "Salam.mp3", "Sawwah.mp3", "Sedo.mp3", "SEEB-NAFSAK.mp3", "Shoghla.mp3", "Sodfa.mp3", "Soura.mp3", "Warda.mp3", "Wesh.mp3", "Ya Kahera.mp3", "Ya-donya-ana-bare.mp3", "Ya-moslmeen.mp3", "Yazmeely.mp3", "Zeina.mp3"
];

let currentIndex = 0;
const list = document.getElementById('list');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const downloadBtn = document.getElementById('downloadBtn');
const search = document.getElementById('search');
const timeEl = document.getElementById('time');

function render(filter = "") {
  list.innerHTML = "";
  songs.filter(s => s.toLowerCase().includes(filter.toLowerCase())).forEach((song) => {
    const realIndex = songs.indexOf(song);
    const div = document.createElement('div');
    if (realIndex === currentIndex) div.classList.add('active');
    // اسم بس
    div.innerHTML = `<span style="flex:1">${song.replace('.mp3','')}</span><span>▶</span>`;
    div.onclick = () => playSong(realIndex);
    list.appendChild(div);
  });
}

function playSong(index) {
  currentIndex = index;
  audio.src = `songs/${songs[currentIndex]}`;
  title.textContent = songs[currentIndex].replace('.mp3','');
  audio.play();
  playBtn.textContent = "⏸";
  render(search.value);
}

playBtn.onclick = () => {
  if (audio.paused) { audio.play(); playBtn.textContent = "⏸"; }
  else { audio.pause(); playBtn.textContent = "▶"; }
};

nextBtn.onclick = () => playSong((currentIndex + 1) % songs.length);
prevBtn.onclick = () => playSong((currentIndex - 1 + songs.length) % songs.length);

downloadBtn.onclick = () => {
  const a = document.createElement('a');
  a.href = `songs/${songs[currentIndex]}`;
  a.download = songs[currentIndex];
  a.click();
};

audio.ontimeupdate = () => {
  if(audio.duration) {
    timeEl.textContent = `${Math.floor(audio.currentTime/60)}:${String(Math.floor(audio.currentTime%60)).padStart(2,'0')} / ${Math.floor(audio.duration/60)}:${String(Math.floor(audio.duration%60)).padStart(2,'0')}`;
  }
};

audio.addEventListener('ended', () => nextBtn.click());
search.oninput = () => render(search.value);

render();
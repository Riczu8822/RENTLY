// Datos ficticios de ejemplo
const PROPERTIES = [
  { id:1, name:"Finca Los Guayacanes", city:"Girardot, Cundinamarca", type:"Finca", guests:16, rooms:5, price:980000, rating:4.8, tags:["Piscina","BBQ","Pet friendly"], colors:["#3d6b4f","#8fb996"] },
  { id:2, name:"Cabaña El Frailejón", city:"Villa de Leyva, Boyacá", type:"Cabaña", guests:6, rooms:2, price:340000, rating:4.9, tags:["Chimenea","Fogata"], colors:["#0f4c5c","#5fa8b8"] },
  { id:3, name:"Domo Cielo Abierto", city:"Guatavita, Cundinamarca", type:"Glamping", guests:2, rooms:1, price:420000, rating:4.7, tags:["Jacuzzi","Vista al lago"], colors:["#6b4f8f","#b8a1d9"] },
  { id:4, name:"Villa Palma Real", city:"Melgar, Tolima", type:"Villa", guests:24, rooms:8, price:1750000, rating:4.6, tags:["Piscina","Jacuzzi","BBQ"], colors:["#b5651d","#f2a900"] },
  { id:5, name:"Casa Quinta La Ceiba", city:"Anapoima, Cundinamarca", type:"Finca", guests:12, rooms:4, price:760000, rating:4.5, tags:["Piscina","Pet friendly"], colors:["#2f6f62","#7cc4b0"] },
  { id:6, name:"Cabaña Río Claro", city:"San Gil, Santander", type:"Cabaña", guests:8, rooms:3, price:480000, rating:4.8, tags:["Río","Fogata","Pet friendly"], colors:["#1d5c3a","#6fbf8a"] },
  { id:7, name:"Glamping Estrella Verde", city:"Salento, Quindío", type:"Glamping", guests:4, rooms:2, price:560000, rating:4.9, tags:["Jacuzzi","Desayuno"], colors:["#7a3b5e","#d98cb3"] },
  { id:8, name:"Villa Mirador del Sol", city:"Tocaima, Cundinamarca", type:"Villa", guests:20, rooms:7, price:1320000, rating:4.4, tags:["Piscina","BBQ"], colors:["#c2571a","#f4a261"] }
];
const TYPES = ["Todos","Finca","Cabaña","Glamping","Villa"];

const $ = id => document.getElementById(id);
const fmt = n => "$" + n.toLocaleString("es-CO");
const state = { type:"Todos", favsOnly:false, favs:new Set(), current:null };

// Favoritos (se guardan en el navegador)
try { state.favs = new Set(JSON.parse(localStorage.getItem("cl-favs") || "[]")); } catch { /* sin almacenamiento */ }
const saveFavs = () => { try { localStorage.setItem("cl-favs", JSON.stringify([...state.favs])); } catch {} };

function renderChips(){
  $("chips").innerHTML = TYPES.map(t =>
    `<button class="${t===state.type?"on":""}" data-type="${t}">${t}</button>`).join("");
}

function filtered(){
  const q = $("q").value.trim().toLowerCase();
  const g = parseInt($("guests").value) || 0;
  const max = parseInt($("maxPrice").value) || 0;
  let list = PROPERTIES.filter(p =>
    (state.type==="Todos" || p.type===state.type) &&
    (!q || (p.name+" "+p.city).toLowerCase().includes(q)) &&
    p.guests >= g &&
    (!max || p.price <= max) &&
    (!state.favsOnly || state.favs.has(p.id)));
  const sorts = {
    rating:(a,b)=>b.rating-a.rating,
    priceAsc:(a,b)=>a.price-b.price,
    priceDesc:(a,b)=>b.price-a.price,
    capacity:(a,b)=>b.guests-a.guests
  };
  return list.sort(sorts[$("sort").value]);
}

function render(){
  const list = filtered();
  $("count").textContent = `${list.length} alojamiento${list.length===1?"":"s"} disponible${list.length===1?"":"s"}`;
  $("empty").hidden = list.length > 0;
  $("favCount").textContent = state.favs.size;
  $("grid").innerHTML = list.map(p => `
    <article class="card">
      <div class="pic" style="background:linear-gradient(135deg,${p.colors[0]},${p.colors[1]})">
        <strong>${p.type}</strong>
        <button class="heart" data-fav="${p.id}" aria-label="Guardar ${p.name}">${state.favs.has(p.id)?"♥":"♡"}</button>
      </div>
      <div class="body">
        <h3>${p.name}</h3>
        <p class="muted">${p.city}</p>
        <p class="muted">${p.guests} huéspedes, ${p.rooms} habitaciones, ★ ${p.rating}</p>
        <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
        <div class="row">
          <span class="price">${fmt(p.price)} <small>/ noche</small></span>
          <button data-book="${p.id}">Reservar</button>
        </div>
      </div>
    </article>`).join("");
}

// Eventos
$("chips").addEventListener("click", e => {
  const b = e.target.closest("[data-type]"); if(!b) return;
  state.type = b.dataset.type; renderChips(); render();
});
["q","guests","maxPrice","sort"].forEach(id => $(id).addEventListener("input", render));

$("favToggle").addEventListener("click", e => {
  state.favsOnly = !state.favsOnly;
  e.currentTarget.setAttribute("aria-pressed", state.favsOnly);
  render();
});

$("grid").addEventListener("click", e => {
  const f = e.target.closest("[data-fav]");
  if (f){
    const id = +f.dataset.fav;
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    saveFavs(); render(); return;
  }
  const b = e.target.closest("[data-book]");
  if (b) openBooking(PROPERTIES.find(p => p.id === +b.dataset.book));
});

// Reserva
function nights(){
  const a = new Date($("in").value), b = new Date($("out").value);
  const n = Math.round((b - a) / 86400000);
  return isNaN(n) ? 0 : n;
}
function updateTotal(){
  const n = nights(), p = state.current;
  $("total").textContent = n > 0
    ? `${n} noche${n>1?"s":""} × ${fmt(p.price)} = ${fmt(n*p.price)}`
    : "La salida debe ser después de la llegada.";
}
function openBooking(p){
  state.current = p;
  $("dTitle").textContent = p.name;
  $("dMeta").textContent = `${p.city} · hasta ${p.guests} huéspedes`;
  const today = new Date().toISOString().slice(0,10);
  $("in").min = $("out").min = today;
  $("in").value = $("out").value = "";
  $("dGuests").max = p.guests;
  $("dGuests").value = Math.min(parseInt($("guests").value) || 2, p.guests);
  $("total").textContent = "Elige las fechas para ver el total.";
  $("dlg").showModal();
}
["in","out"].forEach(id => $(id).addEventListener("input", updateTotal));
$("cancel").addEventListener("click", () => $("dlg").close());
$("bookForm").addEventListener("submit", e => {
  if (nights() <= 0){ e.preventDefault(); updateTotal(); return; }
  toast(`Solicitud enviada para ${state.current.name} (demo, sin pago real).`);
});

function toast(msg){
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3200);
}

renderChips(); render();

// ===== EDIT THIS: Popo's WhatsApp number, with country code (e.g. "6281234567890") =====
const WHATSAPP_NUMBER = "6281226630599";
// ======================================================================================

(function () {
  const raw = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  const base = raw ? "https://wa.me/" + raw : "";
  const linkFor = (msg) => (base ? base + "?text=" + encodeURIComponent(msg) : "#contact");

  // WhatsApp links + number labels
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = linkFor("Hi Popo! I found your website and I’d like to book a driver in Bali.");
    if (base) { a.target = "_blank"; a.rel = "noopener"; }
  });
  document.querySelectorAll("[data-number]").forEach((s) => {
    s.textContent = raw ? "+" + raw : "[NUMBER]";
  });

  // Business card flip
  const card = document.getElementById("card");
  const front = document.getElementById("card-front");
  const back = document.getElementById("card-back");
  let flipped = false;
  document.querySelectorAll("[data-flip]").forEach((btn) =>
    btn.addEventListener("click", () => {
      flipped = !flipped;
      card.style.transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
      front.style.pointerEvents = flipped ? "none" : "auto";
      back.style.pointerEvents = flipped ? "auto" : "none";
      front.setAttribute("aria-hidden", flipped ? "true" : "false");
      back.setAttribute("aria-hidden", flipped ? "false" : "true");
    })
  );
  back.setAttribute("aria-hidden", "true");

  // Tours
  const tours = [
    { id: "south", name: "Southern Sunsets", duration: "Half day", price: "[PRICE] IDR",
      blurb: "Clifftop temples, white-sand beaches and the best sunsets on the island.",
      stops: ["Uluwatu Temple", "Balangan or Geger Beach", "Sunset at Jimbaran Bay or Tanah Lot", "Seafood dinner on the sand (optional)"],
      tip: "Arrive at Uluwatu around 5pm to catch the sunset and the Kecak dance." },
    { id: "central", name: "Ubud & Kintamani", duration: "Full day", price: "[PRICE] IDR",
      blurb: "Rice terraces, jungle waterfalls, local Bali coffee and the view over Mount Batur.",
      stops: ["Rice terraces", "Jungle waterfall", "Local Bali coffee stop", "Kintamani and Mount Batur"],
      tip: "Bring a light jacket. The mountains are much cooler than the coast." },
    { id: "east", name: "East Bali: Amed & Candidasa", duration: "Full day", price: "[PRICE] IDR",
      blurb: "Quiet beaches and slow village life on the east coast, far from the crowds.",
      stops: ["Candidasa", "Coastal village roads", "Amed beach", "Snorkelling or lunch by the sea"],
      tip: "Start early. Mornings in Amed are calm and beautiful." },
    { id: "north", name: "North Bali: Lovina", duration: "Full day", price: "[PRICE] IDR",
      blurb: "Over the mountains to the calm north coast and its black-sand beaches.",
      stops: ["Mountain roads and lake views", "Lovina black-sand beach", "Dolphin trip at sunrise (optional)"],
      tip: "It is a long, scenic drive. Popo can suggest stops on the way." },
    { id: "airport", name: "Airport & Shuttle", duration: "Any time", price: "[PRICE] IDR",
      blurb: "A friendly face at arrivals, help with bags and a cool car to your hotel. Hotel-to-hotel shuttles too.",
      stops: ["Meet at Ngurah Rai arrivals with a name sign", "Help with luggage", "Drop-off at your hotel or villa", "Shuttles between any areas of Bali"],
      tip: "Send your flight number on WhatsApp when you book." }
  ];
  const tabs = document.getElementById("tour-tabs");
  const stopsEl = document.getElementById("tour-stops");
  const tourLink = document.getElementById("tour-link");
  let selected = "south";

  function renderTours() {
    tabs.innerHTML = "";
    tours.forEach((t) => {
      const on = t.id === selected;
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = t.name;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.style.cssText = "min-height:46px;padding:0 1.2rem;border-radius:999px;font:inherit;font-weight:700;font-size:0.95rem;cursor:pointer;" +
        "background:" + (on ? "#14231F" : "#FFFFFF") + ";color:" + (on ? "#FFFFFF" : "#14231F") + ";border:1.5px solid " + (on ? "#14231F" : "#C9CFC9");
      b.addEventListener("click", () => { selected = t.id; renderTours(); });
      tabs.appendChild(b);
    });
    const cur = tours.find((t) => t.id === selected) || tours[0];
    document.querySelectorAll("[data-tour]").forEach((el) => { el.textContent = cur[el.dataset.tour]; });
    stopsEl.innerHTML = "";
    cur.stops.forEach((s) => {
      const li = document.createElement("li");
      li.style.cssText = "display:flex;align-items:center;gap:0.75rem;font-weight:500";
      const dot = document.createElement("span");
      dot.style.cssText = "width:10px;height:10px;border-radius:50%;background:#F2B33D;flex:0 0 auto";
      li.appendChild(dot);
      li.appendChild(document.createTextNode(s));
      stopsEl.appendChild(li);
    });
    tourLink.href = linkFor("Hi Popo! I found your website and I’d like to ask about the " + cur.name + " tour.");
    if (base) { tourLink.target = "_blank"; tourLink.rel = "noopener"; }
  }
  renderTours();

  // FAQ
  const faqs = [
    { q: "How does airport pickup work?", a: "Send your flight number and arrival time on WhatsApp. Popo will be waiting at arrivals at Ngurah Rai Airport with a sign with your name, and will help with your bags." },
    { q: "Is the price per person or per car?", a: "Prices are per car, for your whole group. [CONFIRM WHAT IS INCLUDED: FUEL, PARKING, WATER.] Entry tickets and meals are paid separately." },
    { q: "What should I wear to temples?", a: "Cover your shoulders and knees. Most temples need a sarong, and many lend or rent them at the entrance." },
    { q: "When is the best time for sunsets?", a: "For Uluwatu, arrive around 5pm to see the sunset and the Kecak dance. Tanah Lot and Jimbaran Bay are also beautiful at sunset." },
    { q: "What about traffic?", a: "Bali roads can be slow, especially in the south in the afternoon. Popo will plan your route to avoid the busiest times." },
    { q: "Should I tip my driver?", a: "Tipping is not required, but it is always appreciated if you had a great day." }
  ];
  const faqList = document.getElementById("faq-list");
  let openFaq = 0;

  function renderFaqs() {
    faqList.innerHTML = "";
    faqs.forEach((f, i) => {
      const open = openFaq === i;
      const wrap = document.createElement("div");
      wrap.style.cssText = "background:#FFFFFF;border-radius:16px;overflow:hidden";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.style.cssText = "width:100%;min-height:56px;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;border:none;background:transparent;color:#14231F;font:inherit;font-weight:700;font-size:1.05rem;text-align:left;cursor:pointer";
      const label = document.createElement("span");
      label.textContent = f.q;
      btn.appendChild(label);
      btn.insertAdjacentHTML("beforeend",
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true" style="flex:0 0 auto;transition:transform 0.25s;transform:' +
        (open ? "rotate(45deg)" : "rotate(0deg)") + '"><path d="M12 5v14M5 12h14"></path></svg>');
      btn.addEventListener("click", () => { openFaq = open ? -1 : i; renderFaqs(); });
      wrap.appendChild(btn);
      if (open) {
        const p = document.createElement("p");
        p.style.cssText = "margin:0;padding:0 1.25rem 1.25rem;line-height:1.6;color:#3E4C47";
        p.textContent = f.a;
        wrap.appendChild(p);
      }
      faqList.appendChild(wrap);
    });
  }
  renderFaqs();
})();

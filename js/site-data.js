// Data cadangan (dipakai kalau Firebase belum di-setup atau gagal diakses)
const DEFAULT_LINKS = [
  {
    category: "Discord",
    type: "card",
    icon: "bi-discord",
    label: "Join Discord Aether Store",
    url: "https://discord.gg/pPPgHdVt45",
    color: "#0dcaf0",
    description: "Server Discord Aether Store dibuat untuk memudahkan kalian melakukan Top Up dengan cepat dan praktis. Cek langsung berbagai pricelist game yang tersedia di dalam server tanpa perlu chat Admin terlebih dahulu.",
    image: "img/discord1.jpg",
    order: 1
  },
  {
    category: "WhatsApp Admin",
    type: "button",
    icon: "bi-whatsapp",
    label: "Admin 1",
    url: "https://wa.me/6283185954151",
    color: "#0d6efd",
    order: 2
  },
  {
    category: "Info Aether Store",
    type: "button",
    icon: "bi-whatsapp",
    label: "Channel WhatsApp",
    url: "https://whatsapp.com/channel/0029VaEwTaWGOj9wqBCiwC2v",
    color: "#0d6efd",
    order: 3
  },
  {
    category: "Info Aether Store",
    type: "button",
    icon: "bi-telegram",
    label: "Testimoni Top Up",
    url: "https://t.me/aetherstoreeeeeee",
    color: "#0d6efd",
    order: 4
  },
  {
    category: "Media Sosial",
    type: "button",
    icon: "bi-instagram",
    label: "Instagram",
    url: "https://www.instagram.com/aethertopup?igsh=bTdqOTg2N3djcGpo",
    color: "#f0ad4e",
    order: 5
  }
];

const DEFAULT_PROFILE = {
  welcomeText: 'WELCOME TO LINK BIO <span style="color:#3bb2f6">AETHER STORE</span>',
  bannerImage: "img/banner.jpg"
};

function renderCard(link) {
  const color = link.color || "#0d6efd";
  return `
  <div class="card" style="width: 90%; margin: 0 auto 15px auto; background-color: #393a3f; color: #F8F5F0; border: 1px solid #EEEDED; border-radius: 25px;">
    ${link.image ? `<img src="${link.image}" class="card-img-top" alt="${link.label}" style="border-radius: 25px">` : ""}
    <div>
      <span class="badge rounded-pill" style="margin-left: 12px; margin-top: 10px; background-color:${color}; color:#fff;">
        <i class="bi ${link.icon || ""}"></i> ${link.label}
      </span>
    </div>
    <div class="card-body">
      <h5 class="card-title welcome">${link.label}</h5>
      ${link.description ? `<p class="card-text">${link.description}</p>` : ""}
      <a href="${link.url}" target="_blank" rel="noopener" class="btn" style="border-radius: 20px; background-color:${color}; border-color:${color}; color:#fff;">Buka Sekarang</a>
    </div>
  </div>`;
}

function renderButton(link) {
  const color = link.color || "#0d6efd";
  return `
  <a class="btn" type="button" href="${link.url}" target="_blank" rel="noopener"
     style="margin-right: 10px; margin-left: 10px; border-radius: 10px; margin-bottom: 8px; display:inline-block; background-color:${color}; border-color:${color}; color:#fff;">
    <i class="bi ${link.icon || ""}" style="margin-right:5px;"></i>${link.label}
  </a>`;
}

async function loadSiteContent() {
  const container = document.getElementById("linksRoot");
  const welcomeEl = document.getElementById("welcomeText");
  const bannerEl = document.getElementById("bannerImg");

  let profile = DEFAULT_PROFILE;
  let links = DEFAULT_LINKS;

  try {
    const profileDoc = await db.collection("site").doc("profile").get();
    if (profileDoc.exists) profile = profileDoc.data();

    const linksSnap = await db.collection("links").orderBy("order", "asc").get();
    if (!linksSnap.empty) {
      links = linksSnap.docs.map((d) => d.data());
    }
  } catch (err) {
    console.warn("Gagal mengambil data dari Firebase, menampilkan data default.", err);
  }

  if (welcomeEl) welcomeEl.innerHTML = profile.welcomeText || DEFAULT_PROFILE.welcomeText;
  if (bannerEl) bannerEl.src = profile.bannerImage || DEFAULT_PROFILE.bannerImage;

  // Kelompokkan link per kategori, urutan sesuai kemunculan pertama
  const categoryOrder = [];
  const grouped = {};
  links.forEach((link) => {
    if (!grouped[link.category]) {
      grouped[link.category] = [];
      categoryOrder.push(link.category);
    }
    grouped[link.category].push(link);
  });

  let html = "";
  categoryOrder.forEach((cat) => {
    const items = grouped[cat];
    const cardItems = items.filter((i) => i.type === "card");
    const buttonItems = items.filter((i) => i.type !== "card");

    if (cardItems.length) {
      html += `<hr>` + cardItems.map(renderCard).join("") + `<br>`;
    }
    if (buttonItems.length) {
      html += `<div class="title text-center">${cat.toUpperCase()}</div>`;
      html += `<div class="isi d-grid gap-2" style="margin-bottom:10px;">${buttonItems.map(renderButton).join("")}</div><br>`;
    }
  });

  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", loadSiteContent);

// Dipakai oleh privacypolicy.html dan termsconditions.html
async function loadLegalPage(pageId, defaults) {
  const iconEl = document.getElementById("pageIcon");
  const titleEl = document.getElementById("pageTitle");
  const contentEl = document.getElementById("pageContent");
  const navbarLogo = document.getElementById("navbarLogo");
  const footerLogo = document.getElementById("footerLogo");

  let data = defaults;

  try {
    const doc = await db.collection("legalPages").doc(pageId).get();
    if (doc.exists) data = { ...defaults, ...doc.data() };

    const profileDoc = await db.collection("site").doc("profile").get();
    if (profileDoc.exists) {
      const logoUrl = profileDoc.data().logoUrl;
      if (logoUrl) {
        if (navbarLogo) navbarLogo.src = logoUrl;
        if (footerLogo) footerLogo.src = logoUrl;
      }
    }
  } catch (err) {
    console.warn("Gagal mengambil data halaman legal, menampilkan data default.", err);
  }

  if (iconEl) iconEl.className = "bi " + (data.icon || defaults.icon);
  if (titleEl) titleEl.textContent = data.title || defaults.title;
  if (contentEl) contentEl.innerHTML = data.contentHtml || defaults.contentHtml;
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. 渲染顶部头条（Featured Story）
  const hero = ARTICLES[0];
  if (hero) {
    const heroTitle = document.getElementById("heroTitle");
    const heroSummary = document.getElementById("heroSummary");
    const heroImage = document.querySelector(".hero-image");
    
    if (heroTitle) {
      heroTitle.textContent = hero.title;
      heroTitle.href = hero.url;
    }
    if (heroSummary) heroSummary.textContent = hero.summary;
    if (heroImage) {
      heroImage.href = hero.url;
      heroImage.style.background = `url('${hero.image}') center/cover no-repeat`;
    }
  }

  // 辅助函数：创建卡片 HTML
  function createCard(article) {
    return `
      <article class="article-card">
        <a href="${article.url}" class="image-placeholder card-image" style="background: url('${article.image}') center/cover no-repeat;">
          <span>${article.category.toUpperCase()}</span>
        </a>
        <h3 class="card-title"><a href="${article.url}">${article.title}</a></h3>
        <div class="card-meta">${article.date} · ${article.category}</div>
      </article>
    `;
  }

  // 2. 渲染 Editor's Picks
  const editorsGrid = document.getElementById("editorsGrid");
  if (editorsGrid) {
    const editors = ARTICLES.filter(a => a.editor).slice(0, 4);
    editorsGrid.innerHTML = editors.map(createCard).join("");
  }

  // 3. 渲染 Trending Reads
  const trendingList = document.getElementById("trendingList");
  if (trendingList) {
    const trendings = ARTICLES.filter(a => a.trending).slice(0, 3);
    trendingList.innerHTML = trendings.map(a => `
      <div class="trending-item">
        <a href="${a.url}" class="image-placeholder trending-thumb" style="background: url('${a.image}') center/cover no-repeat;"></a>
        <div>
          <h3><a href="${a.url}">${a.title}</a></h3>
          <small>${a.date}</small>
        </div>
      </div>
    `).join("");
  }

  // 4. 渲染 Latest Articles
  const latestGrid = document.getElementById("latestGrid");
  if (latestGrid) {
    latestGrid.innerHTML = ARTICLES.map(createCard).join("");
  }

  // 5. 分类模块渲染
  const renderRow = (id, cat) => {
    const el = document.getElementById(id);
    if (el) {
      const items = ARTICLES.filter(a => a.category.toLowerCase().includes(cat.toLowerCase())).slice(0, 3);
      el.innerHTML = items.map(createCard).join("");
    }
  };
  renderRow("makeMoneyGrid", "Make Money");
  renderRow("saveMoneyGrid", "Save Money");
  renderRow("guidesGrid", "Budgeting");
});

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

  // 4. 分类模块渲染
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

  // 5. 核心分页逻辑：默认只展示前 8 篇，点击按钮才加载美妆和宠物粮！
  const latestGrid = document.getElementById("latestGrid");
  const loadMoreBtn = document.getElementById("loadMore");
  let currentShown = 8; // 默认展示篇数

  function renderLatest() {
    if (!latestGrid) return;
    const toShow = ARTICLES.slice(0, currentShown);
    latestGrid.innerHTML = toShow.map(createCard).join("");

    if (loadMoreBtn) {
      if (currentShown >= ARTICLES.length) {
        loadMoreBtn.textContent = "ALL ARTICLES LOADED";
        loadMoreBtn.style.opacity = "0.5";
        loadMoreBtn.style.cursor = "default";
      } else {
        loadMoreBtn.textContent = "LOAD MORE ARTICLES";
      }
    }
  }

  renderLatest();

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      if (currentShown < ARTICLES.length) {
        currentShown += 4; // 每次点击多加载 4 篇
        renderLatest();
      }
    });
  }
});
{
    id: 13,
    title: "The High-Priced Kibble Trap: How to Feed Your Dog Like Royalty on a Budget",
    category: "Pet Care",
    date: "Nutrition Guide",
    summary: "Boutique raw pet food subscriptions charge $250 a month. Veterinary nutritionists reveal the smart fresh-topper method that saves 70%.",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
    url: "post-13.html",
    editor: false,
    trending: false
  },
  {
    id: 14,
    title: "French Pharmacy Secrets: 4 Cult Skincare Staples Under $20 Dermatologists Actually Use",
    category: "Beauty",
    date: "Cult Favorite",
    summary: "Paris pharmacy classics like multi-purpose barrier repair creams and soothing mists outperform $120 department store luxury products.",
    image: "https://images.unsplash.com/photo-1608248597359-00966f7f2590?auto=format&fit=crop&w=800&q=80",
    url: "post-14.html",
    editor: false,
    trending: false
  }

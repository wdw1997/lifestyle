const $ = (selector) => document.querySelector(selector);
const latestGrid = $("#latestGrid");
let visibleCount = 8;
let currentArticles = [...ARTICLES];

function imageBlock(article, extraClass="") {
  return `<div class="image-placeholder card-image ${article.imageClass || "img-home"} ${extraClass}" aria-hidden="true"><span>${escapeHTML(article.category || "MONEY TIPS")}</span></div>`;
}
function escapeHTML(value="") {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function articleCard(article, className="article-card") {
  return `<article class="${className}">${imageBlock(article)}<h3 class="card-title"><a href="#article-${article.id}" onclick="showArticleNotice(event, ${article.id})">${escapeHTML(article.title)}</a></h3><div class="card-meta">${escapeHTML(article.date || "COMING SOON")} · ${escapeHTML(article.category)}</div></article>`;
}
function render() {
  const editors = currentArticles.filter(a=>a.editor).slice(0,4);
  $("#editorsGrid").innerHTML = editors.map(a=>articleCard(a)).join("");
  $("#trendingList").innerHTML = currentArticles.filter(a=>a.trending).slice(0,4).map(a=>`<article class="trending-item"><div class="image-placeholder trending-thumb ${a.imageClass || "img-home"}"></div><div><h3><a href="#article-${a.id}" onclick="showArticleNotice(event, ${a.id})">${escapeHTML(a.title)}</a></h3><small>${escapeHTML(a.date || "COMING SOON")}</small></div></article>`).join("");
  $("#makeMoneyGrid").innerHTML = currentArticles.filter(a=>a.category==="Make Money").slice(0,3).map(a=>articleCard(a,"article-card category-card")).join("");
  $("#saveMoneyGrid").innerHTML = currentArticles.filter(a=>a.category==="Save Money").slice(0,3).map(a=>articleCard(a,"article-card category-card")).join("");
  $("#guidesGrid").innerHTML = currentArticles.filter(a=>["Budgeting","Guides","Credit"].includes(a.category)).slice(0,3).map(a=>articleCard(a,"article-card category-card")).join("");
  renderLatest();
}
function renderLatest() {
  const list = currentArticles.slice(0,visibleCount);
  latestGrid.innerHTML = list.map(a=>articleCard(a,"article-card latest-card")).join("");
  $("#emptyState").hidden = currentArticles.length !== 0;
  $("#loadMore").hidden = currentArticles.length <= visibleCount;
}
function showArticleNotice(event, id) {
  event.preventDefault();
  const article = ARTICLES.find(a=>a.id===id);
  if (!article) return;
  alert(`"${article.title}" is a sample article card. Replace this link with your published article URL when your content is ready.`);
}
$("#loadMore").addEventListener("click",()=>{visibleCount += 4;renderLatest();});
$("#searchForm").addEventListener("submit",event=>{
  event.preventDefault();
  const query = $("#searchInput").value.trim().toLowerCase();
  currentArticles = ARTICLES.filter(a=>`${a.title} ${a.category} ${a.summary}`.toLowerCase().includes(query));
  visibleCount = 8;
  $("#all-articles").scrollIntoView({behavior:"smooth"});
  render();
});
$("#searchInput").addEventListener("input",event=>{
  if (!event.target.value.trim()) { currentArticles=[...ARTICLES]; visibleCount=8; render(); }
});
$("#mobileMenu").addEventListener("click",()=>{
  const nav=$("#navItems");
  const isOpen=nav.classList.toggle("open");
  $("#mobileMenu").setAttribute("aria-expanded",String(isOpen));
});
$("#newsletterForm").addEventListener("submit",event=>{
  event.preventDefault();
  $("#formMessage").textContent="Thanks! This demo form is not connected to an email service yet.";
  $("#formMessage").style.color="#4b3c78";
});
render();

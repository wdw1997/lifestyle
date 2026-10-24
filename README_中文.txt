Everyday Penny 博客模板（静态网站）

一、怎么预览
1. 解压 money_blog_template.zip。
2. 双击 index.html，用浏览器打开。
3. 网站是响应式的，电脑和手机都能浏览。

二、怎么换成你自己的品牌
- 打开 index.html，搜索 “Everyday Penny”，替换成你自己的英文网站名称。
- styles.css 控制颜色、字体、间距和手机端样式。
- 目前的图片是纯 CSS 色块占位，不是实际文章图片。你有图片后，可以上传图片并把 articles.js 里的 imageClass 改为图片路径；同时需要在 script.js 的 imageBlock() 中把图片路径渲染成 <img>。
- 网站没有使用参考截图中的品牌 Logo、文章图片或原文内容。

三、怎么添加文章（目前用示例卡片演示）
打开 articles.js，在 ARTICLES 数组里复制一条对象并修改：
{
  id: 11,
  title: "Your New Article Title",
  category: "Make Money",
  date: "October 25, 2026",
  summary: "A short description of your article.",
  imageClass: "img-work",
  editor: true,
  trending: false
}
注意：id 要唯一。category 建议使用 Make Money、Save Money、Budgeting、Credit 或 Guides。
当前卡片只是首页展示示例，点击会提示它是示例卡片；真正发布文章时，需要为每篇文章创建独立页面，或把网站接入内容管理系统。

四、上线到 Cloudflare Pages
这是纯 HTML/CSS/JS 静态模板，不需要购买服务器。
1. 解压 ZIP。
2. 将整个文件夹里的文件上传到 Cloudflare Pages 的静态资源部署流程（确保 index.html 位于网站根目录）。
3. 绑定你的域名或子域名。
4. 部署后再通过浏览器检查手机端和桌面端。

五、当前模板的限制
- 搜索只搜索示例数据。
- Load More 可用。
- Newsletter 表单目前只是演示，不会保存邮箱或发送邮件；需要连接邮件服务后才能正式收集订阅。
- 文章卡片目前没有真实文章详情页。
- 如要做长期内容网站、SEO、分类页、文章详情、后台上传图片/编辑文章，建议下一步接入 WordPress 或带 CMS 的静态站点方案。

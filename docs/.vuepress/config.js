module.exports = {
  base: '/blog-demo/',
  title: '低调di孩子博客',
  description: '弄个博客玩玩',
  head: [
    ['link', { rel: 'icon', href: '/vue-logo.png' }]
  ],
  themeConfig: {
  	// 你的GitHub仓库
    repo: 'https://github.com/olewaHHH/blog-demo',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
  	nav: [
  	],
  	sidebar: [
      ['/blog/FirstBlog.md', 'vue预渲染实战踩坑'],
      ['/blog/ValueOf.md', 'new Date(aTIme) - new Date(bTime)引发的思考']
    ]
  }
}
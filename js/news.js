document.addEventListener('DOMContentLoaded', function() {
    // 新闻源配置
    const sources = {
        'zhihu': { name: '知乎', color: 'zhihu', home: 'https://www.zhihu.com' },
        'weibo': { name: '微博', color: 'weibo', home: 'https://s.weibo.com' },
        'baidu': { name: '百度', color: 'baidu', home: 'https://www.baidu.com' },
        'bilibili': { name: '哔哩哔哩', color: 'bilibili', home: 'https://www.bilibili.com' },
        'github': { name: 'GitHub', color: 'github', home: 'https://github.com' },
        'v2ex': { name: 'V2EX', color: 'v2ex', home: 'https://www.v2ex.com' },
        '36kr': { name: '36氪', color: '36kr', home: 'https://36kr.com' },
        'juejin': { name: '掘金', color: 'juejin', home: 'https://juejin.cn' },
        'tieba': { name: '贴吧', color: 'tieba', home: 'https://tieba.baidu.com' },
        'douyin': { name: '抖音', color: 'douyin', home: 'https://www.douyin.com' },
        'toutiao': { name: '今日头条', color: 'toutiao', home: 'https://www.toutiao.com' }
    };

    // 新闻分类配置
    const categories = {
        'hottest': ['zhihu', 'weibo', 'baidu', 'bilibili', 'tieba', 'douyin', 'toutiao'],
        'tech': ['github', 'v2ex', '36kr', 'juejin'],
        'finance': ['36kr', 'weibo-finance', 'toutiao-finance']
    };

    // 初始化页面
    initPage();

    // 刷新按钮事件
    document.getElementById('refresh-btn').addEventListener('click', function() {
        fetchAllNews();
    });

    // 初始化页面
    function initPage() {
        updateTime();
        showLoadingSpinners();
        fetchAllNews();
    }

    // 更新时间
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        document.getElementById('update-time').textContent = timeString;
    }

    // 显示加载动画
    function showLoadingSpinners() {
        const categories = ['hottest', 'tech', 'finance'];
        categories.forEach(category => {
            const container = document.getElementById(`${category}-news`);
            container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
        });
    }

    // 获取所有分类的新闻
    function fetchAllNews() {
        updateTime();
        showLoadingSpinners();
        
        // 获取热门新闻
        fetchCategoryNews('hottest');
        
        // 获取科技新闻
        fetchCategoryNews('tech');
        
        // 获取财经新闻
        fetchCategoryNews('finance');
    }

    // 获取指定分类的新闻
    function fetchCategoryNews(category) {
        const sourceIds = categories[category];
        const container = document.getElementById(`${category}-news`);
        
        // 模拟API请求延迟
        setTimeout(() => {
            // 这里应该是实际的API请求，现在使用模拟数据
            const newsItems = generateMockNewsData(sourceIds);
            renderNewsItems(container, newsItems);
        }, 1000);
    }

    // 生成模拟新闻数据
    function generateMockNewsData(sourceIds) {
        const newsItems = [];
        const topics = {
            'zhihu': ['如何看待最新的科技发展趋势？', '有哪些被低估的旅游景点？', '程序员必备的技能有哪些？', '如何提高英语口语水平？', '有哪些高性价比的电子产品推荐？'],
            'weibo': ['#热搜话题1#', '#明星动态#', '#社会热点#', '#体育赛事#', '#娱乐新闻#'],
            'baidu': ['百度热搜第一名', '最新疫情数据公布', '国内重大新闻', '国际局势最新动态', '科技创新最新成果'],
            'bilibili': ['UP主最新视频', '二次元新番推荐', '游戏实况直播', '知识区优质内容', '音乐区热门歌曲'],
            'github': ['开源项目trending', '最受欢迎的JavaScript框架', 'Python机器学习库更新', '移动应用开发工具', '前端开发新技术'],
            'v2ex': ['程序员职场讨论', '技术问题求解', '硬件设备推荐', '创业经验分享', '自由职业者交流'],
            '36kr': ['创业公司融资新闻', '科技巨头最新动态', '行业分析报告', '投资人观点', '商业模式创新'],
            'juejin': ['前端框架对比', 'React vs Vue最新讨论', 'TypeScript使用技巧', '后端架构设计', '算法学习路径'],
            'tieba': ['游戏讨论热帖', '动漫交流', '体育赛事讨论', '情感话题', '学习交流'],
            'douyin': ['抖音热门挑战', '网红最新动态', '创意短视频推荐', '生活技巧分享', '美食制作教程'],
            'toutiao': ['国内时政要闻', '国际重大事件', '财经市场分析', '体育赛事报道', '科技创新动态'],
            'weibo-finance': ['股市最新动态', '经济政策解读', '企业财报分析', '投资理财建议', '金融市场趋势'],
            'toutiao-finance': ['宏观经济分析', '股票市场预测', '理财产品点评', '经济学家观点', '财经人物专访']
        };
        
        sourceIds.forEach(sourceId => {
            const source = sources[sourceId] || { name: sourceId, color: 'default', home: '#' };
            const sourceName = source.name;
            const sourceColor = source.color;
            const sourceHome = source.home;
            
            // 为每个源生成1-3条新闻
            const count = Math.floor(Math.random() * 3) + 1;
            const sourceTopics = topics[sourceId] || topics['toutiao']; // 默认使用头条的主题
            
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * sourceTopics.length);
                const title = sourceTopics[randomIndex];
                
                newsItems.push({
                    id: `${sourceId}-${i}`,
                    title: title,
                    url: `${sourceHome}`,
                    source: {
                        id: sourceId,
                        name: sourceName,
                        color: sourceColor
                    }
                });
            }
        });
        
        // 随机排序
        return newsItems.sort(() => Math.random() - 0.5);
    }

    // 渲染新闻列表
    function renderNewsItems(container, newsItems) {
        container.innerHTML = '';
        
        if (newsItems.length === 0) {
            container.innerHTML = '<div class="center-align" style="padding: 20px; color: #999;">暂无数据</div>';
            return;
        }
        
        newsItems.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            
            const sourceColor = item.source.color || 'default';
            
            newsItem.innerHTML = `
                <div class="news-item-title">
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
                </div>
                <div class="news-item-source">
                    <span class="news-item-source-icon color-${sourceColor}"></span>
                    <span>${item.source.name}</span>
                </div>
            `;
            
            container.appendChild(newsItem);
        });
    }
});

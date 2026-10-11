const zhHans = {
  common: {
    home: '主页',
    mainNavigation: '主导航',
    profileLinks: '个人资料链接',
    workDetails: '作品详情',
    projectLinks: '项目链接',
    areasAndTechnologies: '领域与技术',
    email: '邮箱',
    previewUnavailable: '预览暂不可用',
    unavailableWithAlt: '{alt}，资源暂不可用。',
    workNotFound: '未找到作品',
    unavailableEntry: '此作品暂不可用。',
    returnToPortfolio: '返回个人主页',
    pageDescription: '学术、研究与软件作品集演示。',
  },
  nav: {
    work: '作品',
    academic: '学业',
    honors: '荣誉与奖项',
    contact: '联系',
  },
  section: {
    work: '精选作品',
    academic: '学业',
    coursework: '精选课程与成绩',
    honors: '荣誉与奖项',
    contact: '联系',
  },
  academic: {
    gpa: 'GPA',
    rank: '排名',
    focus: '研究方向',
    empty: '尚未添加精选课程。',
    gradeAccessible: '成绩 {grade}',
    category: {
      computer_science: '计算机科学',
      mathematics: '数学',
      ai: '人工智能',
    },
  },
  work: {
    type: {
      research: '研究',
      project: '项目',
      editorial: '校订贡献',
    },
    section: {
      overview: '概述',
      contribution: '贡献',
      approach: '思路',
      method: '方法',
      results: '结果',
      architecture: '架构',
      resources: '资源',
      screens: '界面',
    },
    metadata: {
      role: '职责',
      venue: '出处',
      researchVenue: '发表',
      status: '状态',
      technologies: '核心技术',
    },
    action: {
      back: '返回精选作品',
      viewProject: '查看项目',
      paper: '论文',
      code: '代码',
      website: '网站',
    },
  },
  honor: {
    type: {
      scholarship: '奖学金',
      competition: '竞赛',
      honor: '荣誉',
    },
  },
  theme: {
    preference: {
      system: '跟随系统',
      light: '浅色',
      dark: '深色',
    },
    toggle: '配色主题：{preference}（当前为{resolved}）。点击切换为{next}。',
  },
  language: {
    switchToEnglish: '切换界面语言为英语',
    switchToChinese: '切换界面语言为简体中文',
  },
  document: {
    homeTitle: '个人主页',
  },
} as const

export default zhHans

'use strict';
const { useState, useEffect, useRef } = React;
const { BrowserRouter, Route, Switch, Link } = ReactRouterDOM;
const h = React.createElement;

// Translations
const translations = {
  EN: {
    title: "FIND YOUR PERFECT PROPERTY",
    brand: "AWINLY",
    about: "About",
    search_city: "Select City",
    buy: "Buy",
    rent: "Rent",
    Apartment: "Apartment",
    House: "House",
    Land: "Land",
    offer_button: "Search",
    language: "Language",
    currency: "Currency",
    USD: "USD",
    CNY: "CNY",
    no_results: "No properties found.",
    footer_about: "About AWINLY",
    footer_support: "Support",
    footer_support_email: "awinly@awinly.com",
    footer_contacts: "Contacts",
    footer_disclaimer: "This is a test project; listings are sourced from open sources. For accurate information, contact the realtor directly.",
    area: "Area",
    floor: "Floor",
    rooms: "Rooms",
    yearBuilt: "Year Built",
    realtor_contacts: "Realtor Contacts",
    realtor_email: "Realtor Email",
    realtor_name: "Realtor Name",
    realtor_phone: "Realtor Phone",
    about_title: "About AWINLY",
    about_project_idea: "Project Idea",
    about_project_idea_text: "AWINLY is a test project aimed at creating a multifunctional international platform for renting, buying, and selling real estate worldwide. We sourced listings from open sources to gauge interest in such a service. If the response is positive, we plan to develop a comprehensive platform for residential and commercial real estate transactions, covering long-term and short-term rentals, as well as purchases and sales. Starting with the Chinese market, we aim to quickly scale to Asia, Europe, and the USA.",
    about_key_objective: "Key Objective",
    about_key_objective_text: "To create a user-friendly, locally adaptable platform that:",
    about_key_objective_list: [
      "Connects users and agencies",
      "Ensures high conversion rates",
      "Becomes the #1 online real estate transaction platform"
    ],
    about_project_concept: "Project Concept",
    about_localization: "Localization and Adaptation",
    about_localization_text: "The platform will feature interfaces in local languages, support for local currencies and measurement units, and relevant categories and filters tailored to specific locations and property features.",
    about_extended_functionality: "Extended Functionality",
    about_extended_functionality_list: [
      "Detailed filters and smart search",
      "Ratings, reviews, and seller/landlord rankings",
      "Convenient built-in chats between buyers and sellers",
      "Infrastructure and location details on maps",
      "Recommendation system and 'similar listings' feature"
    ],
    about_for_all_segments: "For All Segments",
    about_for_all_segments_list: [
      "B2C: Individual users",
      "B2B: Agencies, realtors, developers",
      "Short-term rentals (Airbnb alternative), long-term rentals, and buying/selling"
    ],
    Anqing: "Anqing",
    Baoding: "Baoding",
    Beijing: "Beijing",
    Bengbu: "Bengbu",
    Binzhou: "Binzhou",
    Cangzhou: "Cangzhou",
    Changchun: "Changchun",
    Changsha: "Changsha",
    Changzhou: "Changzhou",
    Chengde: "Chengde",
    Chengdu: "Chengdu",
    Chizhou: "Chizhou",
    Chongqing: "Chongqing",
    Chuzhou: "Chuzhou",
    Dalian: "Dalian",
    Dezhou: "Dezhou",
    Dongying: "Dongying",
    Fuyang: "Fuyang",
    Fuzhou: "Fuzhou",
    Guangzhou: "Guangzhou",
    Guiyang: "Guiyang",
    Haikou: "Haikou",
    Handan: "Handan",
    Hangzhou: "Hangzhou",
    Harbin: "Harbin",
    Hefei: "Hefei",
    Hengshui: "Hengshui",
    Heze: "Heze",
    Hohhot: "Hohhot",
    HuaiAn: "Huai'an",
    Huaibei: "Huaibei",
    Huainan: "Huainan",
    Huangshan: "Huangshan",
    Huzhou: "Huzhou",
    Jiaxing: "Jiaxing",
    Jinan: "Jinan",
    Jinhua: "Jinhua",
    Kunming: "Kunming",
    Laiwu: "Laiwu",
    Langfang: "Langfang",
    Lanzhou: "Lanzhou",
    Lhasa: "Lhasa",
    Lianyungang: "Lianyungang",
    Liaocheng: "Liaocheng",
    Linyi: "Linyi",
    Lishui: "Lishui",
    LuAn: "Lu'an",
    MaAnshan: "Ma'anshan",
    Nanchang: "Nanchang",
    Nanjing: "Nanjing",
    Nanning: "Nanning",
    Ningbo: "Ningbo",
    Qingdao: "Qingdao",
    Qinhuangdao: "Qinhuangdao",
    Quzhou: "Quzhou",
    Rizhao: "Rizhao",
    Shanghai: "Shanghai",
    Shaoxing: "Shaoxing",
    Shenyang: "Shenyang",
    Shenzhen: "Shenzhen",
    Shijiazhuang: "Shijiazhuang",
    Suqian: "Suqian",
    Suzhou: "Suzhou",
    Taiyuan: "Taiyuan",
    Taizhou: "Taizhou",
    Tangshan: "Tangshan",
    Tianjin: "Tianjin",
    Tongling: "Tongling",
    Urumqi: "Urumqi",
    Weifang: "Weifang",
    Weihai: "Weihai",
    Wenzhou: "Wenzhou",
    Wuhan: "Wuhan",
    Wuxi: "Wuxi",
    XiAn: "Xi'an",
    Xiamen: "Xiamen",
    Xingtai: "Xingtai",
    Xining: "Xining",
    Xuancheng: "Xuancheng",
    Yancheng: "Yancheng",
    Yangzhou: "Yangzhou",
    Yantai: "Yantai",
    Yinchuan: "Yinchuan",
    Zaozhuang: "Zaozhuang",
    Zhangjiakou: "Zhangjiakou",
    Zhengding: "Zhengding",
    Zhengzhou: "Zhengzhou",
    Zhenjiang: "Zhenjiang",
    Zhoushan: "Zhoushan",
    Zibo: "Zibo"
  },
  zh: {
    title: "寻找您的理想物业",
    brand: "AWINLY",
    about: "关于",
    search_city: "选择城市",
    buy: "购买",
    rent: "租赁",
    Apartment: "公寓",
    House: "别墅",
    Land: "土地",
    offer_button: "搜索",
    language: "语言",
    currency: "货币",
    USD: "美元",
    CNY: "人民币",
    no_results: "未找到物业。",
    footer_about: "关于 AWINLY",
    footer_support: "支持",
    footer_support_email: "awinly@awinly.com",
    footer_contacts: "联系方式",
    footer_disclaimer: "这是一个测试项目，房源信息来自公开来源。欲了解准确信息，请直接联系房地产经纪人。",
    area: "面积",
    floor: "楼层",
    rooms: "房间",
    yearBuilt: "建造年份",
    realtor_contacts: "经纪人联系方式",
    realtor_email: "经纪人邮箱",
    realtor_name: "经纪人姓名",
    realtor_phone: "经纪人电话",
    about_title: "关于 AWINLY",
    about_project_idea: "项目理念",
    about_project_idea_text: "AWINLY 是一个测试项目，旨在创建一个多功能的国际平台，用于全球范围内的房地产租赁、购买和销售。我们从公开来源获取房源信息，以评估对此类服务的兴趣。如果反响良好，我们计划开发一个全面的平台，涵盖住宅和商业房地产交易，包括长期和短期租赁以及买卖。我们从中国市场开始，目标是迅速扩展到亚洲、欧洲和美国。",
    about_key_objective: "主要目标",
    about_key_objective_text: "创建一个用户友好、适应本地化的平台，做到：",
    about_key_objective_list: [
      "连接用户和代理机构",
      "确保高转化率",
      "成为排名第一的在线房地产交易平台"
    ],
    about_project_concept: "项目概念",
    about_localization: "本地化与适应",
    about_localization_text: "该平台将提供本地语言界面，支持本地货币和计量单位，以及针对特定地点和物业特征量身定制的相关类别和过滤器。",
    about_extended_functionality: "扩展功能",
    about_extended_functionality_list: [
      "详细过滤器和智能搜索",
      "评分、评论和卖家/房东排名",
      "买家与卖家之间的便捷内置聊天",
      "地图上的基础设施和位置详情",
      "推荐系统和“相似房源”功能"
    ],
    about_for_all_segments: "面向所有细分市场",
    about_for_all_segments_list: [
      "B2C：个人用户",
      "B2B：代理机构、房地产经纪人、开发商",
      "短期租赁（Airbnb替代品）、长期租赁和买卖"
    ],
    Anqing: "安庆",
    Baoding: "保定",
    Beijing: "北京",
    Bengbu: "蚌埠",
    Binzhou: "滨州",
    Cangzhou: "沧州",
    Changchun: "长春",
    Changsha: "长沙",
    Changzhou: "常州",
    Chengde: "承德",
    Chengdu: "成都",
    Chizhou: "池州",
    Chongqing: "重庆",
    Chuzhou: "滁州",
    Dalian: "大连",
    Dezhou: "德州",
    Dongying: "东营",
    Fuyang: "阜阳",
    Fuzhou: "福州",
    Guangzhou: "广州",
    Guiyang: "贵阳",
    Haikou: "海口",
    Handan: "邯郸",
    Hangzhou: "杭州",
    Harbin: "哈尔滨",
    Hefei: "合肥",
    Hengshui: "衡水",
    Heze: "菏泽",
    Hohhot: "呼和浩特",
    HuaiAn: "淮安",
    Huaibei: "淮北",
    Huainan: "淮南",
    Huangshan: "黄山",
    Huzhou: "湖州",
    Jiaxing: "嘉兴",
    Jinan: "济南",
    Jinhua: "金华",
    Kunming: "昆明",
    Laiwu: "莱芜",
    Langfang: "廊坊",
    Lanzhou: "兰州",
    Lhasa: "拉萨",
    Lianyungang: "连云港",
    Liaocheng: "聊城",
    Linyi: "临沂",
    Lishui: "丽水",
    LuAn: "六安",
    MaAnshan: "马鞍山",
    Nanchang: "南昌",
    Nanjing: "南京",
    Nanning: "南宁",
    Ningbo: "宁波",
    Qingdao: "青岛",
    Qinhuangdao: "秦皇岛",
    Quzhou: "衢州",
    Rizhao: "日照",
    Shanghai: "上海",
    Shaoxing: "绍兴",
    Shenyang: "沈阳",
    Shenzhen: "深圳",
    Shijiazhuang: "石家庄",
    Suqian: "宿迁",
    Suzhou: "苏州",
    Taiyuan: "太原",
    Taizhou: "台州",
    Tangshan: "唐山",
    Tianjin: "天津",
    Tongling: "铜陵",
    Urumqi: "乌鲁木齐",
    Weifang: "潍坊",
    Weihai: "威海",
    Wenzhou: "温州",
    Wuhan: "武汉",
    Wuxi: "无锡",
    XiAn: "西安",
    Xiamen: "厦门",
    Xingtai: "邢台",
    Xining: "西宁",
    Xuancheng: "宣城",
    Yancheng: "盐城",
    Yangzhou: "扬州",
    Yantai: "烟台",
    Yinchuan: "银川",
    Zaozhuang: "枣庄",
    Zhangjiakou: "张家口",
    Zhengding: "正定",
    Zhengzhou: "郑州",
    Zhenjiang: "镇江",
    Zhoushan: "舟山",
    Zibo: "淄博"
  }
};
// Cities
const cities = [
  'Anqing', 'Baoding', 'Beijing', 'Bengbu', 'Binzhou', 'Cangzhou', 'Changchun', 'Changsha',
  'Changzhou', 'Chengde', 'Chengdu', 'Chizhou', 'Chongqing', 'Chuzhou', 'Dalian', 'Dezhou',
  'Dongying', 'Fuyang', 'Fuzhou', 'Guangzhou', 'Guiyang', 'Haikou', 'Handan', 'Hangzhou',
  'Harbin', 'Hefei', 'Hengshui', 'Heze', 'Hohhot', 'HuaiAn', 'Huaibei', 'Huainan', 'Huangshan',
  'Huzhou', 'Jiaxing', 'Jinan', 'Jinhua', 'Kunming', 'Laiwu', 'Langfang', 'Lanzhou', 'Lhasa',
  'Lianyungang', 'Liaocheng', 'Linyi', 'Lishui', 'LuAn', 'MaAnshan', 'Nanchang', 'Nanjing',
  'Nanning', 'Ningbo', 'Qingdao', 'Qinhuangdao', 'Quzhou', 'Rizhao', 'Shanghai', 'Shaoxing',
  'Shenyang', 'Shenzhen', 'Shijiazhuang', 'Suqian', 'Suzhou', 'Taiyuan', 'Taizhou', 'Tangshan',
  'Tianjin', 'Tongling', 'Urumqi', 'Weifang', 'Weihai', 'Wenzhou', 'Wuhan', 'Wuxi', 'XiAn',
  'Xiamen', 'Xingtai', 'Xining', 'Xuancheng', 'Yancheng', 'Yangzhou', 'Yantai', 'Yinchuan',
  'Zaozhuang', 'Zhangjiakou', 'Zhengding', 'Zhengzhou', 'Zhenjiang', 'Zhoushan', 'Zibo'
];
const dealTypes = [
  { value: 'buy', label: 'buy' },
  { value: 'rent', label: 'rent' }
];
const propertyTypes = [
  { value: 'Apartment', label: 'Apartment' },
  { value: 'House', label: 'House' },
  { value: 'Land', label: 'Land' }
];
const currencies = [
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'USD', name: 'US Dollar', symbol: '$' }
];
const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

// Function to fetch properties from DB
const fetchPropertiesFromDB = async () => {
  try {
    const response = await fetch('/.netlify/functions/properties', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch from DB: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    if (!text) {
      console.warn('Empty response from server');
      return [];
    }
    const data = JSON.parse(text);
    const processedData = data.map(item => ({
      id: item.id,
      city: item.city || null,
      dealType: item.dealType || null,
      propertyType: item.propertyType || null,
      priceCNY: Number(item.priceCNY) || 0,
      priceUSD: Number(item.priceUSD) || 0,
      titleEN: item.titleEN || null,
      titleZH: item.titleZH || null,
      descriptionEN: item.descriptionEN || null,
      descriptionZH: item.descriptionZH || null,
      area: Number(item.area) || null,
      floor: Number(item.floor) || null,
      rooms: Number(item.rooms) || null,
      yearBuilt: Number(item.yearBuilt) || null,
      realtor: item.realtor || null,
      images: item.images?.length ? item.images : ['https://picsum.photos/474/316?random=1'],
      country: item.country || 'China'
    }));
    return processedData;
  } catch (error) {
    console.error('Error fetching from DB:', error);
    return [];
  }
};

// Components
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return h('button', { className: `scroll-to-top-btn ${isVisible ? 'visible' : ''}`, onClick: scrollToTop }, '↑');
}

function Filter({ onFilter, getTranslation, lang, currency }) {
  const [searchCity, setSearchCity] = useState('');
  const [tempCity, setTempCity] = useState('');
  const [dealType, setDealType] = useState('buy');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [isDealTypeDropdownOpen, setIsDealTypeDropdownOpen] = useState(false);
  const [isPropertyTypeDropdownOpen, setIsPropertyTypeDropdownOpen] = useState(false);
  const [locationSelectorWidth, setLocationSelectorWidth] = useState('150px');
  const [dealTypeSelectorWidth, setDealTypeSelectorWidth] = useState('100px');
  const [propertyTypeSelectorWidth, setPropertyTypeSelectorWidth] = useState('120px');
  const locationSelectorRef = useRef(null);
  const dealTypeSelectorRef = useRef(null);
  const propertyTypeSelectorRef = useRef(null);
  const dealTypeTimeoutRef = useRef(null);
  const propertyTypeTimeoutRef = useRef(null);

  const handleDealTypeChange = (type) => {
    setDealType(type);
    setIsDealTypeDropdownOpen(false);
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    setIsPropertyTypeDropdownOpen(false);
  };

  const handleCitySelect = (city) => {
    setTempCity(city);
    setSearchCity(city);
    setIsCityModalOpen(false);
    setCitySearch('');
  };

  const handleClearCity = () => {
    setTempCity('');
    setSearchCity('');
    setIsCityModalOpen(false);
    setCitySearch('');
  };

  const handleLocationClick = () => {
    setIsCityModalOpen(true);
  };

  const handleDealTypeMouseEnter = () => {
    clearTimeout(dealTypeTimeoutRef.current);
    dealTypeTimeoutRef.current = setTimeout(() => {
      setIsDealTypeDropdownOpen(true);
      setIsPropertyTypeDropdownOpen(false);
    }, 100);
  };

  const handleDealTypeMouseLeave = () => {
    clearTimeout(dealTypeTimeoutRef.current);
    dealTypeTimeoutRef.current = setTimeout(() => {
      setIsDealTypeDropdownOpen(false);
    }, 200);
  };

  const handlePropertyTypeMouseEnter = () => {
    clearTimeout(propertyTypeTimeoutRef.current);
    propertyTypeTimeoutRef.current = setTimeout(() => {
      setIsPropertyTypeDropdownOpen(true);
      setIsDealTypeDropdownOpen(false);
    }, 100);
  };

  const handlePropertyTypeMouseLeave = () => {
    clearTimeout(propertyTypeTimeoutRef.current);
    propertyTypeTimeoutRef.current = setTimeout(() => {
      setIsPropertyTypeDropdownOpen(false);
    }, 200);
  };

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCityModalOpen(false);
      setCitySearch('');
      setTempCity(searchCity);
    }
  };

  const handleSearch = () => {
    const filterParams = { country: 'China', city: searchCity, dealType, propertyType };
    onFilter(filterParams);
  };

  useEffect(() => {
    const updateWidths = () => {
      if (locationSelectorRef.current) setLocationSelectorWidth(`${Math.max(150, locationSelectorRef.current.scrollWidth)}px`);
      if (dealTypeSelectorRef.current) setDealTypeSelectorWidth(`${Math.max(100, dealTypeSelectorRef.current.scrollWidth)}px`);
      if (propertyTypeSelectorRef.current) setPropertyTypeSelectorWidth(`${Math.max(120, propertyTypeSelectorRef.current.scrollWidth)}px`);
    };
    updateWidths();
  }, [searchCity, dealType, propertyType]);

  useEffect(() => {
    if (isCityModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isCityModalOpen]);

  const filteredCities = cities.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()) || getTranslation(c, lang).toLowerCase().includes(citySearch.toLowerCase())).sort((a, b) => getTranslation(a, lang).localeCompare(getTranslation(b, lang)));

  return h('section', { className: 'search-bar offer' }, [
    h('div', { className: 'offer-title centered' }, [
      h('h1', null, getTranslation('title', lang))
    ]),
    h('div', { className: 'search-bar-container' }, [
      h('div', { className: 'filter-wrapper' }, [
        h('div', { className: 'filter-container' }, [
          h('div', { className: 'location-selector', style: { width: locationSelectorWidth }, ref: locationSelectorRef, onClick: handleLocationClick }, [
            h('div', { className: 'location-part city' }, [
              h('div', { className: 'location-text' }, '🇨🇳 ' + (searchCity ? getTranslation(searchCity, lang) : getTranslation('search_city', lang)))
            ])
          ]),
          h('div', { className: 'deal-type-selector', style: { width: dealTypeSelectorWidth }, ref: dealTypeSelectorRef, onMouseEnter: handleDealTypeMouseEnter, onMouseLeave: handleDealTypeMouseLeave }, [
            h('div', { className: 'deal-type-part deal' }, [
              h('div', { className: 'deal-type-text' }, getTranslation(dealType, lang)),
              h('div', { className: `deal-type-dropdown ${isDealTypeDropdownOpen ? 'open' : ''}` }, dealTypes.map(type => h('div', { key: type.value, className: 'deal-type-option', onClick: () => handleDealTypeChange(type.value) }, getTranslation(type.label, lang))))
            ])
          ]),
          h('div', { className: 'property-type-selector', style: { width: propertyTypeSelectorWidth }, ref: propertyTypeSelectorRef, onMouseEnter: handlePropertyTypeMouseEnter, onMouseLeave: handlePropertyTypeMouseLeave }, [
            h('div', { className: 'property-type-part' }, [
              h('div', { className: 'property-type-text' }, getTranslation(propertyType, lang)),
              h('div', { className: `property-type-dropdown ${isPropertyTypeDropdownOpen ? 'open' : ''}` }, propertyTypes.map(type => h('div', { key: type.value, className: 'property-type-option', onClick: () => handlePropertyTypeChange(type.value) }, getTranslation(type.label, lang))))
            ])
          ]),
          h('button', { className: 'search-btn', onClick: handleSearch }, [
            h('span', { className: 'search-btn-text' }, getTranslation('offer_button', lang))
          ])
        ])
      ])
    ]),
    isCityModalOpen && h('div', { className: 'modal-overlay', onClick: handleModalOverlayClick }, [
      h('div', { className: 'modal modal-cities' }, [
        h('div', { className: 'modal-header' }, [
          h('h3', null, getTranslation('search_city', lang)),
          h('button', { className: 'modal-close', onClick: () => setIsCityModalOpen(false) }, '×')
        ]),
        h('div', { className: 'modal-search-container' }, [
          h('input', { className: 'modal-search', placeholder: getTranslation('search_city', lang), value: citySearch, onChange: (e) => setCitySearch(e.target.value) }),
          h('span', { className: 'modal-search-icon' }, '🔍')
        ]),
        h('div', { className: 'modal-content' }, [
          h('div', { className: 'cities-grid modal-list' }, [
            filteredCities.map(city => h('div', { key: city, className: `modal-item city-item ${searchCity === city ? 'selected' : ''}`, onClick: () => handleCitySelect(city) }, getTranslation(city, lang)))
          ])
        ]),
        h('div', { className: 'modal-footer' }, [
          h('button', { className: 'modal-btn clear', onClick: handleClearCity }, getTranslation('clear', lang) || 'Clear')
        ])
      ])
    ])
  ]);
}
function PropertyCard({ property, currency, getTranslation, lang }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images?.length > 0 ? property.images : [`https://picsum.photos/474/316?random=${property.id}`];
  const handlePrevImage = () => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNextImage = () => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  const handleDotClick = index => setCurrentImageIndex(index);
  const price = currency === 'CNY' ? property.priceCNY : property.priceUSD;
  const currencySymbol = currencies.find(c => c.code === currency)?.symbol || '¥';
  const title = lang === 'zh' ? (property.titleZH || property.titleEN) : property.titleEN;
  const description = lang === 'zh' ? (property.descriptionZH || property.descriptionEN) : property.descriptionEN;
  const floorText = property.floor !== null ? (property.floor === 1 ? '1st' : property.floor === 2 ? '2nd' : property.floor === 3 ? '3rd' : `${property.floor}th`) : '';

  return h('div', { className: 'listing-card' }, [
    h('div', { className: 'listing-image-wrapper' }, [
      h('div', { className: 'listing-image-container' }, [
        h('img', { src: images[currentImageIndex], alt: title, className: 'listing-image', onError: e => { e.target.src = `https://picsum.photos/474/316?random=${property.id}`; } }),
        images.length > 1 && [
          h('button', { className: 'image-nav-button image-nav-left', onClick: handlePrevImage }, '←'),
          h('button', { className: 'image-nav-button image-nav-right', onClick: handleNextImage }, '→'),
          h('div', { className: 'image-dots' }, images.map((_, index) => h('span', { key: index, className: `image-dot ${currentImageIndex === index ? 'active' : ''}`, onClick: () => handleDotClick(index) })))
        ]
      ]),
      images.length > 1 && h('div', { className: 'listing-thumbnails' }, images.map((image, index) => h('img', { key: index, src: image, alt: `${title} thumbnail ${index + 1}`, className: `thumbnail-image ${currentImageIndex === index ? 'active' : ''}`, onClick: () => handleDotClick(index) })))
    ]),
    h('div', { className: 'listing-details' }, [
      h('div', { className: 'listing-details-header' }, [
        h('h3', { className: 'listing-title' }, title),
        h('p', { className: 'price' }, `${currencySymbol}${price.toLocaleString()}`),
        h('p', { className: 'location' }, `${getTranslation(property.city, lang)}, ${getTranslation('China', lang) || 'China'}`),
        h('div', { className: 'listing-specs' }, [
          h('span', { className: 'spec-property-type' }, getTranslation(property.propertyType, lang)),
          h('span', { className: 'spec-deal-type' }, getTranslation(property.dealType, lang)),
          property.area && h('span', null, [
            h('div', { className: 'spec-value' }, `${property.area} m²`),
            h('div', { className: 'spec-label' }, getTranslation('area', lang))
          ]),
          property.floor && h('span', null, [
            h('div', { className: 'spec-value' }, floorText),
            h('div', { className: 'spec-label' }, getTranslation('floor', lang))
          ]),
          property.rooms && h('span', null, [
            h('div', { className: 'spec-value' }, property.rooms),
            h('div', { className: 'spec-label' }, getTranslation('rooms', lang))
          ]),
          property.yearBuilt && h('span', null, [
            h('div', { className: 'spec-value' }, property.yearBuilt),
            h('div', { className: 'spec-label' }, getTranslation('yearBuilt', lang))
          ])
        ])
      ]),
      h('div', { className: 'listing-details-content' }, [
        description && h('p', { className: 'description' }, description),
        h('div', { className: 'realtor-contacts' }, [
          h('p', { className: 'realtor-title' }, getTranslation('realtor_contacts', lang)),
          property.realtor?.name && h('p', { className: 'realtor-name' }, property.realtor.name),
          property.realtor?.email && h('p', { className: 'realtor-email' }, property.realtor.email),
          property.realtor?.phone && h('p', { className: 'realtor-phone' }, property.realtor.phone)
        ])
      ])
    ])
  ]);
}

function About({ lang, getTranslation }) {
  return h('div', { className: 'about-page' }, [
    h('h1', null, getTranslation('about_title', lang)),
    h('section', { className: 'about-section' }, [
      h('h2', null, getTranslation('about_project_idea', lang)),
      h('p', null, getTranslation('about_project_idea_text', lang))
    ]),
    h('section', { className: 'about-section' }, [
      h('h2', null, getTranslation('about_key_objective', lang)),
      h('p', null, getTranslation('about_key_objective_text', lang)),
      h('ul', null, getTranslation('about_key_objective_list', lang).map(item => h('li', { key: item }, item)))
    ]),
    h('section', { className: 'about-section' }, [
      h('h2', null, getTranslation('about_project_concept', lang)),
      h('h3', null, getTranslation('about_localization', lang)),
      h('p', null, getTranslation('about_localization_text', lang)),
      h('h3', null, getTranslation('about_extended_functionality', lang)),
      h('ul', null, getTranslation('about_extended_functionality_list', lang).map(item => h('li', { key: item }, item))),
      h('h3', null, getTranslation('about_for_all_segments', lang)),
      h('ul', null, getTranslation('about_for_all_segments_list', lang).map(item => h('li', { key: item }, item)))
    ])
  ]);
}

function App() {
  const [lang, setLang] = useState('zh');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [currency, setCurrency] = useState('CNY');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const languageTimeoutRef = useRef(null);
  const currencyTimeoutRef = useRef(null);
  const listingsPerPage = 5;

  const getTranslation = (key, lng = lang) => {
    if (Array.isArray(translations[lng]?.[key])) {
      return translations[lng][key];
    }
    return translations[lng]?.[key] || translations.EN[key] || key;
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchPropertiesFromDB();
        setFilteredProperties(data);
        setDisplayedProperties(data.slice(0, listingsPerPage));
        console.log('Loaded properties:', data);
      } catch (error) {
        console.error('Error loading properties:', error);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        const nextPage = Math.floor(displayedProperties.length / listingsPerPage) + 1;
        const newProperties = filteredProperties.slice(0, nextPage * listingsPerPage);
        if (newProperties.length > displayedProperties.length) {
          setDisplayedProperties(newProperties);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredProperties, displayedProperties]);

  const handleFilter = async (filters) => {
    try {
      console.log('Filtering properties with:', filters);
      const propertiesData = await fetchPropertiesFromDB();
      const filtered = propertiesData.filter(property => {
        const matchesCountry = property.country === 'China';
        const matchesCity = !filters.city || property.city === filters.city;
        const matchesDealType = !filters.dealType || property.dealType === filters.dealType;
        const matchesPropertyType = !filters.propertyType || property.propertyType === filters.propertyType;
        return matchesCountry && matchesCity && matchesDealType && matchesPropertyType;
      });
      setFilteredProperties(filtered);
      setDisplayedProperties(filtered.slice(0, listingsPerPage));
      console.log('Filtered properties:', filtered);
    } catch (error) {
      console.error('Filter error:', error);
    }
  };

  const handleLanguageChange = langCode => {
    setLang(langCode);
    setIsLanguageDropdownOpen(false);
    console.log('Language changed to:', langCode);
  };

  const handleCurrencyChange = curr => {
    setCurrency(curr);
    setIsCurrencyDropdownOpen(false);
  };

  const handleLanguageMouseEnter = () => {
    clearTimeout(languageTimeoutRef.current);
    languageTimeoutRef.current = setTimeout(() => {
      setIsLanguageDropdownOpen(true);
      setIsCurrencyDropdownOpen(false);
    }, 100);
  };

  const handleLanguageMouseLeave = () => {
    clearTimeout(languageTimeoutRef.current);
    languageTimeoutRef.current = setTimeout(() => {
      setIsLanguageDropdownOpen(false);
    }, 200);
  };

  const handleCurrencyMouseEnter = () => {
    clearTimeout(currencyTimeoutRef.current);
    currencyTimeoutRef.current = setTimeout(() => {
      setIsCurrencyDropdownOpen(true);
      setIsLanguageDropdownOpen(false);
    }, 100);
  };

  const handleCurrencyMouseLeave = () => {
    clearTimeout(currencyTimeoutRef.current);
    currencyTimeoutRef.current = setTimeout(() => {
      setIsCurrencyDropdownOpen(false);
    }, 200);
  };

  const Footer = () => h('footer', { className: 'footer' }, [
    h('div', { className: 'footer-container' }, [
      h('div', null, [
        h('h3', null, getTranslation('footer_about', lang)),
        h(Link, { to: '/about', className: 'footer-about-link' }, getTranslation('about', lang))
      ]),
      h('div', null, [
        h('h3', null, getTranslation('footer_support', lang)),
        h('p', null, getTranslation('footer_support_email', lang))
      ]),
      h('div', null, [
        h('h3', null, getTranslation('footer_contacts', lang)),
        h('p', { className: 'footer-disclaimer' }, [
          getTranslation('footer_disclaimer', lang),
          ' ',
          h(Link, { to: '/about', className: 'footer-disclaimer-link' }, getTranslation('about', lang))
        ])
      ])
    ])
  ]);

  return h(BrowserRouter, null, [
    h('div', { className: 'listings' }, [
      h('header', { className: 'listings-header' }, [
        h('div', { className: 'listings-header-container' }, [
          h('div', { className: 'listings-header-left' }, [
            h('div', { className: 'listings-header-title' }, [
              h('h3', null, getTranslation('brand', lang))
            ]),
            h(Link, { to: '/about', className: 'listings-header-about' }, getTranslation('about', lang))
          ]),
          h('div', { className: 'listings-header-actions' }, [
            h('div', { className: 'listings-dropdown', onMouseEnter: handleLanguageMouseEnter, onMouseLeave: handleLanguageMouseLeave }, [
              h('button', { className: 'listings-dropdown-btn' }, [
                languages.find(l => l.code === lang)?.flag || '🌐',
                ' ',
                languages.find(l => l.code === lang)?.name || getTranslation('language', lang)
              ]),
              h('div', { className: `listings-dropdown-content ${isLanguageDropdownOpen ? 'open' : ''}` }, languages.map(langOption => h('div', { key: langOption.code, className: 'listings-dropdown-item', onClick: () => handleLanguageChange(langOption.code) }, [ langOption.flag, ' ', langOption.name ])))
            ]),
            h('div', { className: 'listings-dropdown', onMouseEnter: handleCurrencyMouseEnter, onMouseLeave: handleCurrencyMouseLeave }, [
              h('button', { className: 'listings-dropdown-btn' }, [
                currencies.find(c => c.code === currency)?.symbol || '¥',
                ' ',
                currencies.find(c => c.code === currency)?.code || getTranslation('currency', lang)
              ]),
              h('div', { className: `listings-dropdown-content ${isCurrencyDropdownOpen ? 'open' : ''}` }, currencies.map(curr => h('div', { key: curr.code, className: 'listings-dropdown-item', onClick: () => handleCurrencyChange(curr.code) }, [ curr.symbol, ' ', curr.code ])))
            ])
          ])
        ])
      ]),
      h(Switch, null, [
        h(Route, { path: '/about', exact: true }, h(About, { lang, getTranslation })),
        h(Route, { path: '/', exact: true }, [
          h('div', { className: 'filter-section' }, [
            h(Filter, { onFilter: handleFilter, getTranslation, lang, currency })
          ]),
          h('div', { className: 'listings-container' }, [
            displayedProperties.length > 0 ? h('div', { className: 'listings-list' }, displayedProperties.map(property => h(PropertyCard, { key: property.id, property, currency, getTranslation, lang }))) : h('div', { className: 'no-results' }, getTranslation('no_results', lang))
          ])
        ])
      ]),
      h(ScrollToTopButton),
      h(Footer)
    ])
  ]);
}

ReactDOM.render(h(App), document.getElementById('root'));
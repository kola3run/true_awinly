'use strict';

const { useState, useEffect, useRef } = React;
const h = React.createElement;

// Cloudinary configuration
const CLOUD_NAME = 'dkjakynhh';
const API_KEY = '724711754654635';
const API_SECRET = 'v4vizym6WCttYT-13k5XXw7yps8';

// Password for admin access
const ADMIN_PASSWORD = 'Awinly-Awinly228';

// Translations
const translations = {
  EN: {
    admin_title: "AWINLY Admin Panel",
    add_property: "Add Property",
    update_property: "Update Property",
    existing_properties: "Existing Properties",
    no_properties: "No properties found.",
    edit: "Edit",
    delete: "Delete",
    title_en: "Title (English)",
    title_zh: "Title (Chinese)",
    city: "City",
    select_city: "Select City",
    deal_type: "Deal Type",
    property_type: "Property Type",
    price_cny: "Price CNY",
    price_usd: "Price USD",
    area: "Area (m²)",
    floor: "Floor",
    rooms: "Rooms",
    year_built: "Year Built",
    realtor_name: "Realtor Name",
    realtor_email: "Realtor Email",
    realtor_phone: "Realtor Phone",
    description_en: "Description (English)",
    description_zh: "Description (Chinese)",
    upload_images: "Upload Images",
    required_fields: "Please fill in all required fields (Title, City, Price CNY, Price USD).",
    invalid_email: "Please enter a valid realtor email.",
    confirm_delete: "Are you sure you want to delete this property?",
    property_added: "Property added successfully!",
    property_updated: "Property updated successfully!",
    property_deleted: "Property deleted successfully!",
    upload_error: "Image upload failed",
    cloudinary_error: "Cloudinary upload failed. Check console for details.",
    language: "Language",
    cancel: "Cancel",
    buy: "Buy",
    rent: "Rent",
    Apartment: "Apartment",
    House: "House",
    Land: "Land",
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
    admin_title: "AWINLY 管理面板",
    add_property: "添加物业",
    update_property: "更新物业",
    existing_properties: "现有物业",
    no_properties: "未找到物业。",
    edit: "编辑",
    delete: "删除",
    title_en: "标题 (英文)",
    title_zh: "标题 (中文)",
    city: "城市",
    select_city: "选择城市",
    deal_type: "交易类型",
    property_type: "物业类型",
    price_cny: "人民币价格",
    price_usd: "美元价格",
    area: "面积（平方米）",
    floor: "楼层",
    rooms: "房间",
    year_built: "建造年份",
    realtor_name: "经纪人姓名",
    realtor_email: "经纪人邮箱",
    realtor_phone: "经纪人电话",
    description_en: "描述（英文)",
    description_zh: "描述（中文)",
    upload_images: "上传图片",
    required_fields: "请填写所有必填字段（标题、城市、人民币价格、美元价格）。",
    invalid_email: "请输入有效的经纪人邮箱。",
    confirm_delete: "您确定要删除此物业吗？",
    property_added: "物业添加成功！",
    property_updated: "物业更新成功！",
    property_deleted: "物业删除成功！",
    upload_error: "图片上传失败",
    cloudinary_error: "Cloudinary 上传失败。请检查控制台详情。",
    language: "语言",
    cancel: "取消",
    buy: "购买",
    rent: "租赁",
    Apartment: "公寓",
    House: "别墅",
    Land: "土地",
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

// Languages
const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

// Cities
const adminCities = [
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

const dealTypes = ['buy', 'rent'];
const propertyTypes = ['Apartment', 'House', 'Land'];

// Generate Cloudinary signature
function generateSignature(paramsToSign) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const params = { ...paramsToSign, timestamp };
    const sortedKeys = Object.keys(params).sort();
    const stringToSign = sortedKeys.map(key => `${key}=${params[key]}`).join('&') + API_SECRET;
    const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);
    console.log('String to sign:', stringToSign);
    console.log('Generated signature:', signature);
    return { signature, timestamp };
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error);
    return { signature: null, timestamp: null };
  }
}

// Password check
(function() {
  try {
    const storedPassword = localStorage.getItem('adminPassword');
    if (!storedPassword) {
      const enteredPassword = prompt('Введите пароль админки:');
      if (enteredPassword !== ADMIN_PASSWORD) {
        alert('Неверный пароль. Доступ запрещен.');
        window.location.href = '/';
        return;
      }
      localStorage.setItem('adminPassword', enteredPassword);
    } else if (storedPassword !== ADMIN_PASSWORD) {
      const enteredPassword = prompt('Введите пароль админки:');
      if (enteredPassword !== ADMIN_PASSWORD) {
        alert('Неверный пароль. Доступ запрещен.');
        window.location.href = '/';
        return;
      }
      localStorage.setItem('adminPassword', enteredPassword);
    }
  } catch (error) {
    console.error('Error in password check:', error);
    alert('Ошибка проверки пароля. Попробуйте снова.');
    window.location.href = '/';
  }
})();

function AdminPanel() {
  const [lang, setLang] = useState('EN');
  const [formData, setFormData] = useState({
    id: null,
    titleEN: '',
    titleZH: '',
    city: '',
    dealType: 'buy',
    propertyType: 'Apartment',
    priceCNY: '',
    priceUSD: '',
    area: '',
    floor: '',
    rooms: '',
    yearBuilt: '',
    realtor: { name: '', email: '', phone: '' },
    descriptionEN: '',
    descriptionZH: '',
    images: []
  });
  const [error, setError] = useState('');
  const [properties, setProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const languageTimeoutRef = useRef(null);

  const getTranslation = (key) => translations[lang][key] || translations.EN[key] || key;

  // Load properties from data.json via Netlify Function
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log('Fetching properties from /api/properties');
        const response = await fetch('/api/properties');
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data.properties)) {
          throw new Error('Invalid properties data format');
        }
        setProperties(data.properties);
        console.log('Loaded properties:', data.properties);
      } catch (error) {
        console.error('Error loading properties:', error);
        setError(getTranslation('cloudinary_error') + ': ' + error.message);
      }
    };
    fetchProperties();
  }, []);

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      if (name.startsWith('realtor.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({ ...prev, realtor: { ...prev.realtor, [field]: value } }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } catch (error) {
      console.error('Error in handleInputChange:', error);
      setError('Ошибка ввода данных');
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    await uploadFiles(files);
  };

  const handleUploadClick = () => {
    try {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      } else {
        console.error('fileInputRef is not defined');
        setError('Ошибка загрузки: поле ввода недоступно');
      }
    } catch (error) {
      console.error('Error in handleUploadClick:', error);
      setError('Ошибка загрузки');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Отправка формы:', formData);
    try {
      if (!formData.titleEN || !formData.titleZH || !formData.city || !formData.priceCNY || !formData.priceUSD) {
        setError(getTranslation('required_fields'));
        console.error('Отсутствуют обязательные поля:', {
          titleEN: formData.titleEN,
          titleZH: formData.titleZH,
          city: formData.city,
          priceCNY: formData.priceCNY,
          priceUSD: formData.priceUSD
        });
        return;
      }
      if (!formData.realtor.email.includes('@')) {
        setError(getTranslation('invalid_email'));
        console.error('Недействительный email брокера:', formData.realtor.email);
        return;
      }
      const newProperty = {
        id: formData.id || Date.now().toString(),
        country: 'China',
        titleEN: formData.titleEN.trim(),
        titleZH: formData.titleZH.trim(),
        city: formData.city,
        dealType: formData.dealType,
        propertyType: formData.propertyType,
        priceCNY: parseFloat(formData.priceCNY) || 0,
        priceUSD: parseFloat(formData.priceUSD) || 0,
        area: parseInt(formData.area) || null,
        floor: parseInt(formData.floor) || null,
        rooms: parseInt(formData.rooms) || null,
        yearBuilt: parseInt(formData.yearBuilt) || null,
        realtor: {
          name: formData.realtor.name.trim(),
          email: formData.realtor.email.trim(),
          phone: formData.realtor.phone.trim()
        },
        descriptionEN: formData.descriptionEN.trim(),
        descriptionZH: formData.descriptionZH.trim(),
        images: formData.images
      };
      console.log('Новое свойство:', newProperty);
      if (isEditing && formData.id) {
        const response = await fetch('/api/properties', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: formData.id, ...newProperty })
        });
        if (!response.ok) {
          throw new Error(`Failed to update property: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        alert(getTranslation('property_updated'));
        setProperties(prev => prev.map(p => p.id === formData.id ? { id: formData.id, ...newProperty } : p));
        resetForm();
      } else {
        const response = await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProperty)
        });
        if (!response.ok) {
          throw new Error(`Failed to add property: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        alert(getTranslation('property_added'));
        setProperties(prev => [...prev, { id: data.property.id, ...newProperty }]);
        resetForm();
      }
    } catch (error) {
      console.error(isEditing ? 'Ошибка обновления:' : 'Ошибка добавления:', error);
      setError(isEditing ? 'Не удалось обновить свойство: ' + error.message : 'Не удалось добавить свойство: ' + error.message);
    }
  };

  const handleEdit = (property) => {
    try {
      if (!property) {
        console.error('Invalid property for editing');
        setError('Ошибка редактирования: объект не найден');
        return;
      }
      setFormData({
        id: property.id || null,
        titleEN: property.titleEN || '',
        titleZH: property.titleZH || '',
        city: property.city || '',
        dealType: property.dealType || 'buy',
        propertyType: property.propertyType || 'Apartment',
        priceCNY: property.priceCNY?.toString() || '',
        priceUSD: property.priceUSD?.toString() || '',
        area: property.area?.toString() || '',
        floor: property.floor?.toString() || '',
        rooms: property.rooms?.toString() || '',
        yearBuilt: property.yearBuilt?.toString() || '',
        realtor: property.realtor || { name: '', email: '', phone: '' },
        descriptionEN: property.descriptionEN || '',
        descriptionZH: property.descriptionZH || '',
        images: Array.isArray(property.images) ? property.images : []
      });
      setIsEditing(true);
      setError('');
      console.log('Editing property:', property);
    } catch (error) {
      console.error('Error in handleEdit:', error);
      setError('Ошибка редактирования');
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) {
        setError('Недействительный ID свойства');
        console.error('Недействительный ID для удаления');
        return;
      }
      if (window.confirm(getTranslation('confirm_delete'))) {
        const response = await fetch('/api/properties', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        if (!response.ok) {
          throw new Error(`Failed to delete property: ${response.status} ${response.statusText}`);
        }
        alert(getTranslation('property_deleted'));
        console.log('Свойство удалено, id:', id);
        setProperties(prev => prev.filter(prop => prop.id !== id));
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
      setError('Не удалось удалить свойство: ' + error.message);
    }
  };

  const resetForm = () => {
    try {
      setFormData({
        id: null,
        titleEN: '',
        titleZH: '',
        city: '',
        dealType: 'buy',
        propertyType: 'Apartment',
        priceCNY: '',
        priceUSD: '',
        area: '',
        floor: '',
        rooms: '',
        yearBuilt: '',
        realtor: { name: '', email: '', phone: '' },
        descriptionEN: '',
        descriptionZH: '',
        images: []
      });
      setIsEditing(false);
      setError('');
      console.log('Form reset');
    } catch (error) {
      console.error('Error in resetForm:', error);
      setError('Ошибка сброса формы');
    }
  };

  const handleLanguageChange = (langCode) => {
    try {
      setLang(langCode);
      setIsLanguageDropdownOpen(false);
      console.log('Language changed to:', langCode);
    } catch (error) {
      console.error('Error in handleLanguageChange:', error);
      setError('Ошибка смены языка');
    }
  };

  const handleLanguageMouseEnter = () => {
    try {
      clearTimeout(languageTimeoutRef.current);
      languageTimeoutRef.current = setTimeout(() => {
        setIsLanguageDropdownOpen(true);
      }, 100);
    } catch (error) {
      console.error('Error in handleLanguageMouseEnter:', error);
    }
  };

  const handleLanguageMouseLeave = () => {
    try {
      clearTimeout(languageTimeoutRef.current);
      languageTimeoutRef.current = setTimeout(() => {
        setIsLanguageDropdownOpen(false);
      }, 200);
    } catch (error) {
      console.error('Error in handleLanguageMouseLeave:', error);
    }
  };

  return h('div', { className: 'admin-container' }, [
    h('div', { className: 'language-selector' }, [
      h('div', { className: 'listings-dropdown', onMouseEnter: handleLanguageMouseEnter, onMouseLeave: handleLanguageMouseLeave }, [
        h('button', { className: 'listings-dropdown-btn' }, [
          languages.find(l => l.code === lang)?.flag || '🌐',
          ' ',
          languages.find(l => l.code === lang)?.name || getTranslation('language')
        ]),
        h('div', { className: `listings-dropdown-content ${isLanguageDropdownOpen ? 'open' : ''}` }, languages.map(langOption => h('div', { key: langOption.code, className: 'listings-dropdown-item', onClick: () => handleLanguageChange(langOption.code) }, [ langOption.flag, ' ', langOption.name ])))
      ])
    ]),
    h('h1', null, getTranslation('admin_title')),
    h('form', { onSubmit: handleSubmit }, [
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'titleEN' }, getTranslation('title_en') + ' *'),
        h('input', { type: 'text', id: 'titleEN', name: 'titleEN', value: formData.titleEN, onChange: handleInputChange, required: true })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'titleZH' }, getTranslation('title_zh') + ' *'),
        h('input', { type: 'text', id: 'titleZH', name: 'titleZH', value: formData.titleZH, onChange: handleInputChange, required: true })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'city' }, getTranslation('city') + ' *'),
        h('select', { id: 'city', name: 'city', value: formData.city, onChange: handleInputChange, required: true }, [
          h('option', { value: '' }, getTranslation('select_city')),
          ...adminCities.map(city => h('option', { key: city, value: city }, getTranslation(city)))
        ])
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'dealType' }, getTranslation('deal_type')),
        h('select', { id: 'dealType', name: 'dealType', value: formData.dealType, onChange: handleInputChange }, dealTypes.map(type => h('option', { key: type, value: type }, getTranslation(type))))
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'propertyType' }, getTranslation('property_type')),
        h('select', { id: 'propertyType', name: 'propertyType', value: formData.propertyType, onChange: handleInputChange }, propertyTypes.map(type => h('option', { key: type, value: type }, getTranslation(type))))
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'priceCNY' }, getTranslation('price_cny') + ' *'),
        h('input', { type: 'number', id: 'priceCNY', name: 'priceCNY', value: formData.priceCNY, onChange: handleInputChange, required: true })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'priceUSD' }, getTranslation('price_usd') + ' *'),
        h('input', { type: 'number', id: 'priceUSD', name: 'priceUSD', value: formData.priceUSD, onChange: handleInputChange, required: true })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'area' }, getTranslation('area')),
        h('input', { type: 'number', id: 'area', name: 'area', value: formData.area, onChange: handleInputChange })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'floor' }, getTranslation('floor')),
        h('input', { type: 'number', id: 'floor', name: 'floor', value: formData.floor, onChange: handleInputChange })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'rooms' }, getTranslation('rooms')),
        h('input', { type: 'number', id: 'rooms', name: 'rooms', value: formData.rooms, onChange: handleInputChange })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'yearBuilt' }, getTranslation('year_built')),
        h('input', { type: 'number', id: 'yearBuilt', name: 'yearBuilt', value: formData.yearBuilt, onChange: handleInputChange })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'realtor.name' }, getTranslation('realtor_name')),
        h('input', { type: 'text', id: 'realtor.name', name: 'realtor.name', value: formData.realtor.name, onChange: handleInputChange })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'realtor.email' }, getTranslation('realtor_email')),
        h('input', { type: 'email', id: 'realtor.email', name: 'realtor.email', value: formData.realtor.email, onChange: handleInputChange })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'realtor.phone' }, getTranslation('realtor_phone')),
        h('input', { type: 'tel', id: 'realtor.phone', name: 'realtor.phone', value: formData.realtor.phone, onChange: handleInputChange, placeholder: '+86 123 456 7890' })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'descriptionEN' }, getTranslation('description_en')),
        h('textarea', { id: 'descriptionEN', name: 'descriptionEN', value: formData.descriptionEN, onChange: handleInputChange })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'descriptionZH' }, getTranslation('description_zh')),
        h('textarea', { id: 'descriptionZH', name: 'descriptionZH', value: formData.descriptionZH, onChange: handleInputChange })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', null, getTranslation('upload_images')),
        h('input', { type: 'file', id: 'file-input', ref: fileInputRef, multiple: true, style: { display: 'none' }, onChange: handleFileChange }),
        h('button', { type: 'button', onClick: handleUploadClick }, getTranslation('upload_images')),
        formData.images.length > 0 && h('div', { className: 'image-preview' }, formData.images.map((url, index) => h('img', { key: index, src: url, alt: `Превью ${index + 1}` })))
      ]),
      error && h('div', { className: 'error' }, error),
      h('div', { className: 'form-group' }, [
        h('button', { type: 'submit' }, getTranslation(isEditing ? 'update_property' : 'add_property')),
        isEditing && h('button', { type: 'button', className: 'secondary', onClick: resetForm, style: { marginLeft: '10px' } }, getTranslation('cancel'))
      ])
    ]),
    h('h2', null, getTranslation('existing_properties')),
    properties.length > 0 ? h('div', { className: 'properties-list' }, properties.map(property => {
      try {
        return h('div', { key: property.id, className: 'property-item' }, [
          h('p', null, `${getTranslation('title_en')}: ${property.titleEN || ''}`),
          h('p', null, `${getTranslation('title_zh')}: ${property.titleZH || ''}`),
          h('p', null, `${getTranslation('city')}: ${getTranslation(property.city) || ''}`),
          h('p', null, `${getTranslation('deal_type')}: ${getTranslation(property.dealType) || ''}`),
          h('p', null, `${getTranslation('property_type')}: ${getTranslation(property.propertyType) || ''}`),
          h('p', null, `${getTranslation('price_cny')}: ¥${(property.priceCNY || 0).toLocaleString()}`),
          h('p', null, `${getTranslation('price_usd')}: $${(property.priceUSD || 0).toLocaleString()}`),
          property.area && h('p', null, `${getTranslation('area')}: ${property.area} m²`),
          property.floor && h('p', null, `${getTranslation('floor')}: ${property.floor}`),
          property.rooms && h('p', null, `${getTranslation('rooms')}: ${property.rooms}`),
          property.yearBuilt && h('p', null, `${getTranslation('year_built')}: ${property.yearBuilt}`),
          property.realtor?.name && h('p', null, `${getTranslation('realtor_name')}: ${property.realtor.name}`),
          property.realtor?.email && h('p', null, `${getTranslation('realtor_email')}: ${property.realtor.email}`),
          property.realtor?.phone && h('p', null, `${getTranslation('realtor_phone')}: ${property.realtor.phone}`),
          property.descriptionEN && h('p', null, `${getTranslation('description_en')}: ${property.descriptionEN}`),
          property.descriptionZH && h('p', null, `${getTranslation('description_zh')}: ${property.descriptionZH}`),
          property.images?.length > 0 && h('div', { className: 'property-images' }, property.images.map((url, index) => h('img', { key: index, src: url, alt: `Изображение свойства ${index + 1}` }))),
          h('div', { className: 'property-actions' }, [
            h('button', { onClick: () => handleEdit(property) }, getTranslation('edit')),
            h('button', { className: 'secondary', onClick: () => handleDelete(property.id) }, getTranslation('delete'))
          ])
        ]);
      } catch (error) {
        console.error('Error rendering property:', property, error);
        return null;
      }
    }).filter(item => item !== null)) : h('p', null, getTranslation('no_properties'))
  ]);
}

try {
  ReactDOM.render(h(AdminPanel), document.getElementById('root'));
  console.log('AdminPanel rendered successfully at', new Date().toISOString());
} catch (error) {
  console.error('Error rendering AdminPanel:', error);
}
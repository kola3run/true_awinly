'use strict';
console.log('admin.js starting at', new Date().toISOString());

// Проверка загрузки зависимостей
if (typeof React === 'undefined' || typeof ReactDOM === 'undefined' || typeof ReactDnD === 'undefined' || typeof ReactDnDHTML5Backend === 'undefined' || typeof CryptoJS === 'undefined') {
  console.error('Не загружены необходимые зависимости:', {
    React: !!React,
    ReactDOM: !!ReactDOM,
    ReactDnD: !!ReactDnD,
    ReactDnDHTML5Backend: !!ReactDnDHTML5Backend,
    CryptoJS: !!CryptoJS
  });
  alert('Ошибка загрузки зависимостей. Проверьте консоль для деталей.');
  throw new Error('Не загружены необходимые зависимости');
} else {
  console.log('Зависимости загружены:', {
    React: React.version,
    ReactDOM: true,
    ReactDnD: true,
    ReactDnDHTML5Backend: true,
    CryptoJS: true
  });
}

const { useState, useEffect, useRef } = React;
const { DndProvider, useDrag, useDrop } = ReactDnD;
const { HTML5Backend } = ReactDnDHTML5Backend;
const h = React.createElement;

// Конфигурация Cloudinary
const CLOUD_NAME = 'dkjakynhh';
const API_KEY = '724711754654635';
const API_SECRET = 'v4vizym6WCttYT-13k5XXw7yps8';

// Переводы
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
    remove_image: "Remove Image",
    required_fields: "Please fill in all required fields (Title, City, Price CNY, Price USD).",
    invalid_email: "Please enter a valid realtor email or 'N/A'.",
    confirm_delete: "Are you sure you want to delete this property?",
    property_added: "Property added successfully!",
    property_updated: "Property updated successfully!",
    property_deleted: "Property deleted successfully!",
    upload_error: "Image upload failed",
    cloudinary_error: "Cloudinary upload failed. Check console for details.",
    language: "Language",
    buy: "Buy",
    rent: "Rent",
    Apartment: "Apartment",
    House: "House",
    Land: "Land",
    cancel: "Cancel",
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
    remove_image: "删除图片",
    required_fields: "请填写所有必填字段（标题、城市、人民币价格、美元价格）。",
    invalid_email: "请输入有效的经纪人邮箱或 'N/A'。",
    confirm_delete: "您确定要删除此物业吗？",
    property_added: "物业添加成功！",
    property_updated: "物业更新成功！",
    property_deleted: "物业删除成功！",
    upload_error: "图片上传失败",
    cloudinary_error: "Cloudinary 上传失败。请检查控制台详情。",
    language: "语言",
    buy: "购买",
    rent: "租赁",
    Apartment: "公寓",
    House: "别墅",
    Land: "土地",
    cancel: "取消",
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
const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

// Генерация подписи Cloudinary
function generateSignature(paramsToSign) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { ...paramsToSign, timestamp };
  const sortedKeys = Object.keys(params).sort();
  const stringToSign = sortedKeys.map(key => `${key}=${params[key]}`).join('&') + API_SECRET;
  return { signature: CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex), timestamp };
}

// Компонент ImageItem для drag-and-drop и удаления
function ImageItem({ image, index, moveImage, removeImage }) {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: 'image',
    hover(item) {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });
  drag(drop(ref));
  const handleRemove = () => {
    console.log('Удаление изображения:', index, 'URL:', image);
    removeImage(index);
  };
  return h('div', {
    ref,
    className: `flex items-center space-x-2 p-2 bg-gray-100 rounded mb-2 ${isDragging ? 'opacity-50' : 'opacity-100'} cursor-move`
  }, [
    h('img', {
      src: image,
      alt: `Изображение ${index + 1}`,
      className: 'w-24 h-16 object-cover rounded border',
      onError: (e) => { e.target.src = 'https://via.placeholder.com/96x64?text=Ошибка+изображения'; }
    }),
    h('span', { className: 'text-gray-600 flex-1 truncate' }, image),
    h('button', {
      type: 'button',
      onClick: handleRemove,
      className: 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500'
    }, translations[lang].remove_image || 'Remove Image')
  ]);
}

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
    realtor: { name: '', email: 'N/A', phone: '' },
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

  useEffect(() => {
    try {
      const savedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      const normalizedProperties = savedProperties.map(p => ({
        ...p,
        realtor: p.realtor && typeof p.realtor === 'object' ? p.realtor : { name: '', email: 'N/A', phone: '' },
        images: Array.isArray(p.images) ? p.images.filter(img => img) : []
      }));
      setProperties(normalizedProperties);
      console.log('Загруженные объявления:', normalizedProperties);
    } catch (e) {
      console.error('Ошибка загрузки объявлений из localStorage:', e);
      setProperties([]);
      localStorage.removeItem('properties');
      setError('Не удалось загрузить объявления. Локальное хранилище очищено.');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('realtor.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        realtor: { ...prev.realtor, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      await uploadFiles(files);
    }
  };

  const uploadFiles = async (files) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    for (const file of files) {
      const formDataToSend = new FormData();
      const paramsToSign = {};
      const { signature, timestamp } = generateSignature(paramsToSign);
      formDataToSend.append('file', file);
      formDataToSend.append('api_key', API_KEY);
      formDataToSend.append('timestamp', timestamp);
      formDataToSend.append('signature', signature);
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formDataToSend
        });
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const result = await response.json();
        if (result.error) {
          throw new Error(result.error.message);
        }
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, result.secure_url]
        }));
        setError('');
        console.log('Успешная загрузка изображения:', result.secure_url);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        setError(getTranslation('cloudinary_error') + ': ' + error.message);
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (index) => {
    console.log('До удаления, изображения:', formData.images);
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      console.log('После удаления, изображения:', newImages);
      return { ...prev, images: newImages };
    });
  };

  const moveImage = (fromIndex, toIndex) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      console.log('Перемещено изображение с', fromIndex, 'на', toIndex, 'новый порядок:', newImages);
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titleEN || !formData.titleZH || !formData.city || !formData.priceCNY || !formData.priceUSD) {
      setError(getTranslation('required_fields'));
      return;
    }
    if (formData.realtor.email !== 'N/A' && !/\S+@\S+\.\S+/.test(formData.realtor.email)) {
      setError(getTranslation('invalid_email'));
      return;
    }
    const newProperty = {
      id: formData.id || `A${Date.now()}`,
      country: 'China',
      titleEN: formData.titleEN,
      titleZH: formData.titleZH,
      city: formData.city,
      dealType: formData.dealType,
      propertyType: formData.propertyType,
      priceCNY: parseFloat(formData.priceCNY) || 0,
      priceUSD: parseFloat(formData.priceUSD) || 0,
      area: parseFloat(formData.area) || null,
      floor: parseInt(formData.floor) || null,
      rooms: parseInt(formData.rooms) || null,
      yearBuilt: parseInt(formData.yearBuilt) || null,
      realtor: formData.realtor,
      descriptionEN: formData.descriptionEN,
      descriptionZH: formData.descriptionZH,
      images: formData.images.filter(img => img)
    };
    let updatedProperties;
    if (isEditing) {
      updatedProperties = properties.map(p => p.id === newProperty.id ? newProperty : p);
      alert(getTranslation('property_updated'));
    } else {
      updatedProperties = [...properties, newProperty];
      alert(getTranslation('property_added'));
    }
    try {
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      setProperties(updatedProperties);
      resetForm();
    } catch (e) {
      console.error('Ошибка сохранения в localStorage:', e);
      setError('Не удалось сохранить объявление. Попробуйте снова.');
    }
  };

  const handleEdit = (property) => {
    setFormData({
      id: property.id,
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
      realtor: property.realtor || { name: '', email: 'N/A', phone: '' },
      descriptionEN: property.descriptionEN || '',
      descriptionZH: property.descriptionZH || '',
      images: Array.isArray(property.images) ? property.images.filter(img => img) : []
    });
    setIsEditing(true);
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm(getTranslation('confirm_delete'))) {
      const updatedProperties = properties.filter(p => p.id !== id);
      try {
        localStorage.setItem('properties', JSON.stringify(updatedProperties));
        setProperties(updatedProperties);
        alert(getTranslation('property_deleted'));
      } catch (e) {
        console.error('Ошибка удаления из localStorage:', e);
        setError('Не удалось удалить объявление. Попробуйте снова.');
      }
    }
  };

  const resetForm = () => {
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
      realtor: { name: '', email: 'N/A', phone: '' },
      descriptionEN: '',
      descriptionZH: '',
      images: []
    });
    setIsEditing(false);
    setError('');
  };

  const handleLanguageChange = (langCode) => {
    setLang(langCode);
    setIsLanguageDropdownOpen(false);
  };

  const handleLanguageMouseEnter = () => {
    clearTimeout(languageTimeoutRef.current);
    languageTimeoutRef.current = setTimeout(() => {
      setIsLanguageDropdownOpen(true);
    }, 100);
  };

  const handleLanguageMouseLeave = () => {
    clearTimeout(languageTimeoutRef.current);
    languageTimeoutRef.current = setTimeout(() => {
      setIsLanguageDropdownOpen(false);
    }, 200);
  };

  return h('div', { className: 'container mx-auto p-4 max-w-4xl' }, [
    h('div', { className: 'relative mb-8' }, [
      h('div', {
        className: 'absolute top-0 right-0',
        onMouseEnter: handleLanguageMouseEnter,
        onMouseLeave: handleLanguageMouseLeave
      }, [
        h('button', {
          className: 'bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 flex items-center gap-2'
        }, [
          languages.find(l => l.code === lang)?.flag || '🌐',
          languages.find(l => l.code === lang)?.name || getTranslation('language')
        ]),
        h('div', {
          className: `dropdown-menu absolute bg-white shadow-lg rounded mt-1 ${isLanguageDropdownOpen ? 'block' : 'hidden'}`
        }, languages.map(langOption => h('div', {
          key: langOption.code,
          className: 'px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2',
          onClick: () => handleLanguageChange(langOption.code)
        }, [
          langOption.flag,
          langOption.name
        ])))
      ])
    ]),
    h('h1', { className: 'text-3xl font-bold mb-6' }, getTranslation('admin_title')),
    h('form', { onSubmit: handleSubmit, className: 'space-y-4 mb-8 bg-white p-6 rounded-lg shadow' }, [
      h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'titleEN', className: 'block font-semibold mb-1' }, getTranslation('title_en') + ' *'),
          h('input', {
            type: 'text',
            id: 'titleEN',
            name: 'titleEN',
            value: formData.titleEN,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
            required: true
          })
        ]),
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'titleZH', className: 'block font-semibold mb-1' }, getTranslation('title_zh') + ' *'),
          h('input', {
            type: 'text',
            id: 'titleZH',
            name: 'titleZH',
            value: formData.titleZH,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
            required: true
          })
        ])
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'city', className: 'block font-semibold mb-1' }, getTranslation('city') + ' *'),
        h('select', {
          id: 'city',
          name: 'city',
          value: formData.city,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
          required: true
        }, [
          h('option', { value: '' }, getTranslation('select_city')),
          ...adminCities.map(city => h('option', { key: city, value: city }, getTranslation(city)))
        ])
      ]),
      h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'dealType', className: 'block font-semibold mb-1' }, getTranslation('deal_type')),
          h('select', {
            id: 'dealType',
            name: 'dealType',
            value: formData.dealType,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500'
          }, dealTypes.map(type => h('option', { key: type, value: type }, getTranslation(type)))
          )
        ]),
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'propertyType', className: 'block font-semibold mb-1' }, getTranslation('property_type')),
          h('select', {
            id: 'propertyType',
            name: 'propertyType',
            value: formData.propertyType,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500'
          }, propertyTypes.map(type => h('option', { key: type, value: type }, getTranslation(type)))
          )
        ])
      ]),
      h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'priceCNY', className: 'block font-semibold mb-1' }, getTranslation('price_cny') + ' *'),
          h('input', {
            type: 'number',
            id: 'priceCNY',
            name: 'priceCNY',
            value: formData.priceCNY,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
            required: true,
            min: 0
          })
        ]),
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'priceUSD', className: 'block font-semibold mb-1' }, getTranslation('price_usd') + ' *'),
          h('input', {
            type: 'number',
            id: 'priceUSD',
            name: 'priceUSD',
            value: formData.priceUSD,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
            required: true,
            min: 0
          })
        ])
      ]),
      h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'area', className: 'block font-semibold mb-1' }, getTranslation('area')),
          h('input', {
            type: 'number',
            id: 'area',
            name: 'area',
            value: formData.area,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
            min: 0
          })
        ]),
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'floor', className: 'block font-semibold mb-1' }, getTranslation('floor')),
          h('input', {
            type: 'number',
            id: 'floor',
            name: 'floor',
            value: formData.floor,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500'
          })
        ])
      ]),
      h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'rooms', className: 'block font-semibold mb-1' }, getTranslation('rooms')),
          h('input', {
            type: 'number',
            id: 'rooms',
            name: 'rooms',
            value: formData.rooms,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
            min: 0
          })
        ]),
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'yearBuilt', className: 'block font-semibold mb-1' }, getTranslation('year_built')),
          h('input', {
            type: 'number',
            id: 'yearBuilt',
            name: 'yearBuilt',
            value: formData.yearBuilt,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
            min: 1800,
            max: new Date().getFullYear()
          })
        ])
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'realtor.name', className: 'block font-semibold mb-1' }, getTranslation('realtor_name')),
        h('input', {
          type: 'text',
          id: 'realtor.name',
          name: 'realtor.name',
          value: formData.realtor.name,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'realtor.email', className: 'block font-semibold mb-1' }, getTranslation('realtor_email')),
        h('input', {
          type: 'text',
          id: 'realtor.email',
          name: 'realtor.email',
          value: formData.realtor.email,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500',
          placeholder: 'N/A or email'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'realtor.phone', className: 'block font-semibold mb-1' }, getTranslation('realtor_phone')),
        h('input', {
          type: 'text',
          id: 'realtor.phone',
          name: 'realtor.phone',
          value: formData.realtor.phone,
          onChange: handleInputChange,
          placeholder: 'Phone or URL',
          className: 'w-full p-2 border rounded focus:ring-2 focus:ring-purple-500'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'descriptionEN', className: 'block font-semibold mb-1' }, getTranslation('description_en')),
        h('textarea', {
          id: 'descriptionEN',
          name: 'descriptionEN',
          value: formData.descriptionEN,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded h-24 focus:ring-2 focus:ring-purple-500'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'descriptionZH', className: 'block font-semibold mb-1' }, getTranslation('description_zh')),
        h('textarea', {
          id: 'descriptionZH',
          name: 'descriptionZH',
          value: formData.descriptionZH,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded h-24 focus:ring-2 focus:ring-purple-500'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { className: 'block font-semibold mb-1' }, getTranslation('upload_images')),
        h('input', {
          type: 'file',
          id: 'file-input',
          ref: fileInputRef,
          multiple: true,
          accept: 'image/*',
          style: { display: 'none' },
          onChange: handleFileChange
        }),
        h('button', {
          type: 'button',
          onClick: handleUploadClick,
          className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
        }, getTranslation('upload_images')),
        h(DndProvider, { backend: HTML5Backend }, [
          h('div', { className: 'space-y-2 mt-2' }, formData.images.length > 0
            ? formData.images.map((url, index) => h(ImageItem, {
                key: `image-${index}-${url}`,
                image: url,
                index,
                moveImage,
                removeImage
              }))
            : h('p', { className: 'text-gray-500' }, 'Изображения не загружены')
          )
        ])
      ]),
      error && h('div', { className: 'text-red-500 text-sm mt-2' }, error),
      h('div', { className: 'flex gap-2' }, [
        h('button', {
          type: 'submit',
          className: 'bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:ring-2 focus:ring-green-500'
        }, getTranslation(isEditing ? 'update_property' : 'add_property')),
        isEditing && h('button', {
          type: 'button',
          onClick: resetForm,
          className: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:ring-2 focus:ring-gray-500'
        }, getTranslation('cancel'))
      ])
    ]),
    h('div', { className: 'properties-list mt-8' }, [
      h('h2', { className: 'text-2xl font-bold mb-4' }, getTranslation('existing_properties')),
      properties.length === 0
        ? h('p', { className: 'text-gray-600' }, getTranslation('no_properties'))
        : properties.map(property => h('div', {
            key: property.id,
            className: 'p-4 bg-gray-50 rounded-lg mb-4 border'
          }, [
            h('p', { className: 'font-semibold' }, `ID: ${property.id}`),
            h('p', { className: 'font-semibold' }, `${getTranslation('title_en')}: ${property.titleEN || ''}`),
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
            (property.realtor && property.realtor.name) && h('p', null, `${getTranslation('realtor_name')}: ${property.realtor.name}`),
            (property.realtor && property.realtor.email) && h('p', null, `${getTranslation('realtor_email')}: ${property.realtor.email}`),
            (property.realtor && property.realtor.phone) && h('p', null, `${getTranslation('realtor_phone')}: ${property.realtor.phone}`),
            property.descriptionEN && h('p', null, `${getTranslation('description_en')}: ${property.descriptionEN}`),
            property.descriptionZH && h('p', null, `${getTranslation('description_zh')}: ${property.descriptionZH}`),
            property.images.length > 0 && h('div', { className: 'flex flex-wrap gap-2 mt-2' },
              property.images.map((url, index) => h('img', {
                key: `prop-image-${index}-${url}`,
                src: url,
                alt: `Изображение объекта ${index + 1}`,
                className: 'w-24 h-16 object-cover rounded border',
                onError: (e) => { e.target.src = 'https://via.placeholder.com/96x64?text=Ошибка+изображения'; }
              }))
            ),
            h('div', { className: 'flex gap-2 mt-2' }, [
              h('button', {
                onClick: () => handleEdit(property),
                className: 'bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500'
              }, getTranslation('edit')),
              h('button', {
                onClick: () => handleDelete(property.id),
                className: 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-500'
              }, getTranslation('delete'))
            ])
          ]))
    ])
  ]);
}

// Защита паролем
const ADMIN_PASSWORD = 'Awinly-Awinly228';
(function() {
  let storedPassword = localStorage.getItem('adminPassword');
  if (storedPassword !== ADMIN_PASSWORD) {
    const enteredPassword = prompt('Введите пароль администратора:');
    if (enteredPassword !== ADMIN_PASSWORD) {
      alert('Неверный пароль. Доступ запрещен.');
      window.location.href = '/';
      return;
    }
    localStorage.setItem('adminPassword', enteredPassword);
  }
  if (document.getElementById('root')) {
    console.log('Рендеринг AdminPanel:', new Date().toISOString());
    ReactDOM.render(h(AdminPanel), document.getElementById('root'));
  } else {
    console.error('Элемент root не найден');
    alert('Элемент root не найден. Проверьте структуру HTML.');
  }
})();

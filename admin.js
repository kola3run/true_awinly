'use strict';

const { useState, useEffect, useRef } = React;
const h = React.createElement;

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
    buy: "Buy",
    rent: "Rent",
    Apartment: "Apartment",
    House: "House",
    Land: "Land",
    Beijing: "Beijing",
    Shanghai: "Shanghai",
    Guangzhou: "Guangzhou",
    Shenzhen: "Shenzhen",
    Chengdu: "Chengdu",
    Chongqing: "Chongqing",
    Tianjin: "Tianjin",
    Wuhan: "Wuhan",
    XiAn: "Xi'an",
    Hangzhou: "Hangzhou",
    Nanjing: "Nanjing",
    Suzhou: "Suzhou",
    Qingdao: "Qingdao",
    Dalian: "Dalian",
    Shenyang: "Shenyang",
    Changsha: "Changsha",
    Zhengzhou: "Zhengzhou",
    Kunming: "Kunming",
    Hefei: "Hefei",
    Fuzhou: "Fuzhou",
    Xiamen: "Xiamen",
    Jinan: "Jinan",
    Harbin: "Harbin",
    Changchun: "Changchun",
    Nanchang: "Nanchang",
    Urumqi: "Urumqi",
    Shijiazhuang: "Shijiazhuang",
    Taiyuan: "Taiyuan",
    Nanning: "Nanning",
    Guiyang: "Guiyang",
    Lanzhou: "Lanzhou",
    Haikou: "Haikou",
    Yinchuan: "Yinchuan",
    Xining: "Xining",
    Hohhot: "Hohhot",
    Lhasa: "Lhasa",
    Changzhou: "Changzhou",
    Wuxi: "Wuxi",
    Ningbo: "Ningbo",
    Wenzhou: "Wenzhou",
    Jiaxing: "Jiaxing",
    Huzhou: "Huzhou",
    Shaoxing: "Shaoxing",
    Zhoushan: "Zhoushan",
    Taizhou: "Taizhou",
    Lianyungang: "Lianyungang",
    Yancheng: "Yancheng",
    Yangzhou: "Yangzhou",
    Zhenjiang: "Zhenjiang",
    HuaiAn: "Huai'an",
    Suqian: "Suqian",
    LuAn: "Lu'an",
    Huaibei: "Huaibei",
    Bengbu: "Bengbu",
    Fuyang: "Fuyang",
    Huainan: "Huainan",
    Chuzhou: "Chuzhou",
    MaAnshan: "Ma'anshan",
    Tongling: "Tongling",
    Anqing: "Anqing",
    Huangshan: "Huangshan",
    Chizhou: "Chizhou",
    Xuancheng: "Xuancheng",
    Jinhua: "Jinhua",
    Quzhou: "Quzhou",
    Lishui: "Lishui",
    Zaozhuang: "Zaozhuang",
    Weifang: "Weifang",
    Yantai: "Yantai",
    Weihai: "Weihai",
    Rizhao: "Rizhao",
    Laiwu: "Laiwu",
    Linyi: "Linyi",
    Dezhou: "Dezhou",
    Liaocheng: "Liaocheng",
    Binzhou: "Binzhou",
    Heze: "Heze",
    Zibo: "Zibo",
    Dongying: "Dongying",
    Zhengding: "Zhengding",
    Baoding: "Baoding",
    Langfang: "Langfang",
    Tangshan: "Tangshan",
    Qinhuangdao: "Qinhuangdao",
    Handan: "Handan",
    Xingtai: "Xingtai",
    Zhangjiakou: "Zhangjiakou",
    Chengde: "Chengde",
    Cangzhou: "Cangzhou",
    Hengshui: "Hengshui"
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
    buy: "购买",
    rent: "租赁",
    Apartment: "公寓",
    House: "别墅",
    Land: "土地",
    Beijing: "北京",
    Shanghai: "上海",
    Guangzhou: "广州",
    Shenzhen: "深圳",
    Chengdu: "成都",
    Chongqing: "重庆",
    Tianjin: "天津",
    Wuhan: "武汉",
    XiAn: "西安",
    Hangzhou: "杭州",
    Nanjing: "南京",
    Suzhou: "苏州",
    Qingdao: "青岛",
    Dalian: "大连",
    Shenyang: "沈阳",
    Changsha: "长沙",
    Zhengzhou: "郑州",
    Kunming: "昆明",
    Hefei: "合肥",
    Fuzhou: "福州",
    Xiamen: "厦门",
    Jinan: "济南",
    Harbin: "哈尔滨",
    Changchun: "长春",
    Nanchang: "南昌",
    Urumqi: "乌鲁木齐",
    Shijiazhuang: "石家庄",
    Taiyuan: "太原",
    Nanning: "南宁",
    Guiyang: "贵阳",
    Lanzhou: "兰州",
    Haikou: "海口",
    Yinchuan: "银川",
    Xining: "西宁",
    Hohhot: "呼和浩特",
    Lhasa: "拉萨",
    Changzhou: "常州",
    Wuxi: "无锡",
    Ningbo: "宁波",
    Wenzhou: "温州",
    Jiaxing: "嘉兴",
    Huzhou: "湖州",
    Shaoxing: "绍兴",
    Zhoushan: "舟山",
    Taizhou: "台州",
    Lianyungang: "连云港",
    Yancheng: "盐城",
    Yangzhou: "扬州",
    Zhenjiang: "镇江",
    HuaiAn: "淮安",
    Suqian: "宿迁",
    LuAn: "六安",
    Huaibei: "淮北",
    Bengbu: "蚌埠",
    Fuyang: "阜阳",
    Huainan: "淮南",
    Chuzhou: "滁州",
    MaAnshan: "马鞍山",
    Tongling: "铜陵",
    Anqing: "安庆",
    Huangshan: "黄山",
    Chizhou: "池州",
    Xuancheng: "宣城",
    Jinhua: "金华",
    Quzhou: "衢州",
    Lishui: "丽水",
    Zaozhuang: "枣庄",
    Weifang: "潍坊",
    Yantai: "烟台",
    Weihai: "威海",
    Rizhao: "日照",
    Laiwu: "莱芜",
    Linyi: "临沂",
    Dezhou: "德州",
    Liaocheng: "聊城",
    Binzhou: "滨州",
    Heze: "菏泽",
    Zibo: "淄博",
    Dongying: "东营",
    Zhengding: "正定",
    Baoding: "保定",
    Langfang: "廊坊",
    Tangshan: "唐山",
    Qinhuangdao: "秦皇岛",
    Handan: "邯郸",
    Xingtai: "邢台",
    Zhangjiakou: "张家口",
    Chengde: "承德",
    Cangzhou: "沧州",
    Hengshui: "衡水"
  }
};

// Languages
const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

// Cities
const adminCities = [
  'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Chongqing', 'Tianjin', 'Wuhan', 'XiAn', 'Hangzhou',
  'Nanjing', 'Suzhou', 'Qingdao', 'Dalian', 'Shenyang', 'Changsha', 'Zhengzhou', 'Kunming', 'Hefei', 'Fuzhou',
  'Xiamen', 'Jinan', 'Harbin', 'Changchun', 'Nanchang', 'Urumqi', 'Shijiazhuang', 'Taiyuan', 'Nanning', 'Guiyang',
  'Lanzhou', 'Haikou', 'Yinchuan', 'Xining', 'Hohhot', 'Lhasa', 'Changzhou', 'Wuxi', 'Ningbo', 'Wenzhou',
  'Jiaxing', 'Huzhou', 'Shaoxing', 'Zhoushan', 'Taizhou', 'Lianyungang', 'Yancheng', 'Yangzhou', 'Zhenjiang',
  'HuaiAn', 'Suqian', 'LuAn', 'Huaibei', 'Bengbu', 'Fuyang', 'Huainan', 'Chuzhou', 'MaAnshan', 'Tongling',
  'AnQing', 'Huangshan', 'Chizhou', 'Xuancheng', 'Jinhua', 'Quzhou', 'Lishui', 'Zaozhuang', 'Weifang',
  'Yantai', 'Weihai', 'Rizhao', 'Laiwu', 'Linyi', 'Dezhou', 'Liaocheng', 'Binzhou', 'Heze', 'Zibo',
  'Dongying', 'Zhengding', 'Baoding', 'Langfang', 'Tangshan', 'Qinhuangdao', 'Handan', 'Xingtai',
  'Zhangjiakou', 'Chengde', 'Cangzhou', 'Hengshui'
];

const dealTypes = ['buy', 'rent'];
const propertyTypes = ['Apartment', 'House', 'Land'];

// Password check
(function() {
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

  // Load properties from Firestore
  useEffect(() => {
    getDocs(collection(db, 'properties')).then(snapshot => {
      const propertiesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertiesList);
      console.log('Loaded properties from Firestore:', propertiesList);
    }).catch(error => {
      console.error('Error loading properties:', error);
      setError('Failed to load properties');
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('realtor.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({ ...prev, realtor: { ...prev.realtor, [field]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    const placeholderUrl = `https://picsum.photos/474/316?random=${Date.now()}`;
    setFormData(prev => ({ ...prev, images: [...prev.images, placeholderUrl] }));
    setError('');
    console.log('Используется заглушка для изображения:', placeholderUrl);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправка формы:', formData);
    if (!formData.titleEN || !formData.titleZH || !formData.city || !formData.priceCNY || !formData.priceUSD) {
      setError(getTranslation('required_fields'));
      console.error('Отсутствуют обязательные поля');
      return;
    }
    if (!formData.realtor.email.includes('@')) {
      setError(getTranslation('invalid_email'));
      console.error('Недействительный email брокера');
      return;
    }
    const newProperty = {
      country: 'China',
      titleEN: formData.titleEN,
      titleZH: formData.titleZH,
      city: formData.city,
      dealType: formData.dealType,
      propertyType: formData.propertyType,
      priceCNY: parseFloat(formData.priceCNY) || 0,
      priceUSD: parseFloat(formData.priceUSD) || 0,
      area: parseInt(formData.area) || null,
      floor: parseInt(formData.floor) || null,
      rooms: parseInt(formData.rooms) || null,
      yearBuilt: parseInt(formData.yearBuilt) || null,
      realtor: formData.realtor,
      descriptionEN: formData.descriptionEN,
      descriptionZH: formData.descriptionZH,
      images: formData.images
    };
    console.log('Новое свойство:', newProperty);
    if (isEditing) {
      updateDoc(doc(db, 'properties', formData.id), newProperty).then(() => {
        alert(getTranslation('property_updated'));
        resetForm();
      }).catch(error => {
        setError('Failed to update property');
      });
    } else {
      addDoc(collection(db, 'properties'), newProperty).then(() => {
        alert(getTranslation('property_added'));
        resetForm();
      }).catch(error => {
        setError('Failed to add property');
      });
    }
  };

  const handleEdit = (property) => {
    setFormData({
      id: property.id,
      titleEN: property.titleEN || '',
      titleZH: property.titleZH || '',
      city: property.city,
      dealType: property.dealType,
      propertyType: property.propertyType,
      priceCNY: property.priceCNY.toString(),
      priceUSD: property.priceUSD.toString(),
      area: property.area?.toString() || '',
      floor: property.floor?.toString() || '',
      rooms: property.rooms?.toString() || '',
      yearBuilt: property.yearBuilt?.toString() || '',
      realtor: property.realtor || { name: '', email: '', phone: '' },
      descriptionEN: property.descriptionEN || '',
      descriptionZH: property.descriptionZH || '',
      images: property.images || []
    });
    setIsEditing(true);
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm(getTranslation('confirm_delete'))) {
      deleteDoc(doc(db, 'properties', id)).then(() => {
        alert(getTranslation('property_deleted'));
        console.log('Свойство удалено, id:', id);
      }).catch(error => {
        setError('Не удалось удалить свойство');
      });
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
      realtor: { name: '', email: '', phone: '' },
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
        h('div', { className: 'image-preview' }, formData.images.map((url, index) => h('img', { key: index, src: url, alt: `Превью ${index + 1}` })))
      ]),
      error && h('div', { className: 'error' }, error),
      h('button', { type: 'submit' }, getTranslation(isEditing ? 'update_property' : 'add_property'))
    ]),
    h('div', { className: 'properties-list' }, [
      h('h2', null, getTranslation('existing_properties')),
      properties.length === 0 ? h('p', null, getTranslation('no_properties')) : properties.map(property => h('div', { key: property.id, className: 'property-item' }, [
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
        (property.realtor && property.realtor.name) && h('p', null, `${getTranslation('realtor_name')}: ${property.realtor.name}`),
        (property.realtor && property.realtor.email) && h('p', null, `${getTranslation('realtor_email')}: ${property.realtor.email}`),
        (property.realtor && property.realtor.phone) && h('p', null, `${getTranslation('realtor_phone')}: ${property.realtor.phone}`),
        property.descriptionEN && h('p', null, `${getTranslation('description_en')}: ${property.descriptionEN}`),
        property.descriptionZH && h('p', null, `${getTranslation('description_zh')}: ${property.descriptionZH}`),
        property.images.length > 0 && h('div', { className: 'property-images' }, property.images.map((url, index) => h('img', { key: index, src: url, alt: `Изображение свойства ${index + 1}` }))),
        h('div', { className: 'property-actions' }, [
          h('button', { onClick: () => handleEdit(property) }, getTranslation('edit')),
          h('button', { className: 'secondary', onClick: () => handleDelete(property.id) }, getTranslation('delete'))
        ])
      ]))
    ])
  ]);
}

if (typeof ReactDOM !== 'undefined' && document.getElementById('root')) {
  console.log('Рендеринг AdminPanel в', new Date().toISOString());
  ReactDOM.render(h(AdminPanel), document.getElementById('root'));
} else {
  console.error('Не удалось отрендерить AdminPanel: отсутствует ReactDOM или элемент root в', new Date().toISOString());
}
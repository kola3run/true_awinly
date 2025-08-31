'use strict';
console.log('admin.js starting at', new Date().toISOString());
const { useState, useEffect, useRef } = React;
const h = React.createElement;

// Cloudinary configuration
const CLOUD_NAME = 'dkjakynhh';
const API_KEY = '724711754654635';
const API_SECRET = 'v4vizym6WCttYT-13k5XXw7yps8';
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
    remove_image: "Remove Image",
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
    remove_image: "删除图片",
    required_fields: "请填写所有必填字段（标题、城市、人民币价格、美元价格）。",
    invalid_email: "请输入有效的经纪人邮箱。",
    confirm_delete: "您确定要删除此物业吗？",
    property_added: "物业添加成功！",
    property_updated: "物业更新成功！",
    property_deleted: "物业删除成功！",
    upload_error: "图片上传失败",
    cloudinary_error: "Cloudinary上传失败。请检查控制台详情。",
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

// Check if current path is /admin
const isAdminRoute = window.location.pathname === '/admin';

// Password check only for admin route
if (isAdminRoute) {
  (function() {
    try {
      const storedPassword = localStorage.getItem('adminPassword');
      if (!storedPassword || storedPassword !== ADMIN_PASSWORD) {
        const enteredPassword = prompt('Введите пароль админки:');
        if (enteredPassword !== ADMIN_PASSWORD) {
          alert('Неверный пароль. Доступ запрещен.');
          window.location.href = '/';
          return;
        }
        localStorage.setItem('adminPassword', enteredPassword);
      }
    } catch (error) {
      console.error('Ошибка проверки пароля:', error);
      alert('Ошибка проверки пароля. Попробуйте снова.');
      window.location.href = '/';
    }
  })();
}

// Generate Cloudinary signature
function generateSignature(paramsToSign) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const params = Object.assign({}, paramsToSign, { timestamp: timestamp });
    const sortedKeys = Object.keys(params).sort();
    const stringToSign = sortedKeys.map(function(key) { return `${key}=${params[key]}`; }).join('&') + API_SECRET;
    const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);
    return { signature, timestamp };
  } catch (error) {
    console.error('Ошибка генерации подписи Cloudinary:', error);
    return { signature: null, timestamp: null };
  }
}

// Upload image to Cloudinary
async function uploadImage(file) {
  const { signature, timestamp } = generateSignature({});
  if (!signature || !timestamp) {
    throw new Error('Не удалось сгенерировать подпись Cloudinary');
  }
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  try {
    console.log('Uploading file:', file.name, 'Timestamp:', timestamp, 'Signature:', signature);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log('Cloudinary response:', data);
    if (data.secure_url) {
      console.log('Изображение загружено в Cloudinary:', data.secure_url);
      return data.secure_url;
    } else {
      throw new Error('Ошибка загрузки изображения: ' + (data.error?.message || 'Неизвестная ошибка'));
    }
  } catch (error) {
    console.error('Ошибка загрузки в Cloudinary:', error);
    throw error;
  }
}

// ImageItem component for deletion
function ImageItem(props) {
  const handleRemove = function() {
    console.log('Removing image at index:', props.index, 'URL:', props.image);
    props.removeImage(props.index);
  };
  const getTranslation = function(key) {
    return translations[props.lang][key] || translations.EN[key] || key;
  };
  return h('div', {
    className: 'flex items-center space-x-2 p-2 bg-gray-100 rounded mb-2'
  }, [
    h('img', {
      src: props.image,
      alt: `Image ${props.index + 1}`,
      className: 'w-24 h-16 object-cover rounded border',
      onError: function(e) { e.target.src = 'https://picsum.photos/474/316?random=1'; },
      loading: 'lazy'
    }),
    h('span', { className: 'text-gray-600 flex-1 truncate' }, props.image),
    h('button', {
      type: 'button',
      onClick: handleRemove,
      className: 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
    }, getTranslation('remove_image'))
  ]);
}

// Function to fetch properties from DB
function fetchPropertiesFromDB() {
  return fetch('/.netlify/functions/properties', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(function(text) {
      if (!text) {
        console.warn('Пустой ответ от сервера');
        return [];
      }
      const data = JSON.parse(text);
      return data.map(function(item) {
        return {
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
          realtor: item.realtor || { name: '', email: '', phone: '' },
          images: Array.isArray(item.images) && item.images.length ? item.images : ['https://picsum.photos/474/316?random=1'],
          country: item.country || 'China'
        };
      });
    })
    .catch(function(error) {
      console.error('Ошибка при загрузке свойств:', error);
      return [];
    });
}

// Component for Admin Panel
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

  const getTranslation = function(key) {
    return translations[lang][key] || translations.EN[key] || key;
  };

  useEffect(function() {
    fetchPropertiesFromDB().then(function(data) {
      setProperties(data);
      console.log('Загружены свойства:', data);
    }).catch(function(error) {
      console.error('Ошибка загрузки свойств:', error);
      setError(getTranslation('cloudinary_error') + ': ' + error.message);
    });
  }, []);

  useEffect(function() {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const handleInputChange = function(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name.startsWith('realtor.')) {
      const field = name.split('.')[1];
      setFormData(function(prev) {
        return Object.assign({}, prev, {
          realtor: Object.assign({}, prev.realtor, { [field]: value })
        });
      });
    } else {
      setFormData(function(prev) {
        return Object.assign({}, prev, { [name]: value });
      });
    }
  };

  const handleFileChange = async function(e) {
    const files = Array.from(e.target.files);
    try {
      const uploadedUrls = await Promise.all(files.map(function(file) {
        return uploadImage(file);
      }));
      setFormData(function(prev) {
        return Object.assign({}, prev, {
          images: prev.images.concat(uploadedUrls.filter(function(url) { return url; }))
        });
      });
      setError('');
    } catch (error) {
      console.error('Ошибка загрузки файлов:', error);
      setError(getTranslation('upload_error') + ': ' + error.message);
    }
  };

  const handleUploadClick = function() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error('fileInputRef не определён');
      setError('Ошибка загрузки: поле ввода недоступно');
    }
  };

  const removeImage = function(index) {
    console.log('Before remove, images:', formData.images);
    setFormData(function(prev) {
      const newImages = prev.images.filter(function(_, i) { return i !== index; });
      console.log('After remove, images:', newImages);
      return Object.assign({}, prev, { images: newImages });
    });
  };

  const handleSubmit = async function(e) {
    e.preventDefault();
    try {
      if (!formData.titleEN || !formData.titleZH || !formData.city || !formData.priceCNY || !formData.priceUSD) {
        setError(getTranslation('required_fields'));
        return;
      }
      if (!formData.realtor.email.includes('@')) {
        setError(getTranslation('invalid_email'));
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
        images: formData.images.length > 0 ? formData.images : ['https://picsum.photos/474/316?random=1']
      };
      const method = isEditing && formData.id ? 'PUT' : 'POST';
      const response = await fetch('/.netlify/functions/properties', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProperty)
      });
      if (!response.ok) {
        throw new Error(`Ошибка сохранения: ${response.statusText}`);
      }
      const fetchResponse = await fetch('/.netlify/functions/properties', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!fetchResponse.ok) {
        throw new Error(`Ошибка получения обновлённых свойств: ${fetchResponse.statusText}`);
      }
      const text = await fetchResponse.text();
      const data = text ? JSON.parse(text) : [];
      setProperties(data);
      alert(isEditing ? getTranslation('property_updated') : getTranslation('property_added'));
      resetForm();
    } catch (error) {
      console.error(isEditing ? 'Ошибка обновления:' : 'Ошибка добавления:', error);
      setError(isEditing ? 'Не удалось обновить свойство: ' + error.message : 'Не удалось добавить свойство: ' + error.message);
    }
  };

  const handleEdit = function(property) {
    if (!property) {
      console.error('Недопустимое свойство для редактирования');
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
      priceCNY: property.priceCNY ? property.priceCNY.toString() : '',
      priceUSD: property.priceUSD ? property.priceUSD.toString() : '',
      area: property.area ? property.area.toString() : '',
      floor: property.floor ? property.floor.toString() : '',
      rooms: property.rooms ? property.rooms.toString() : '',
      yearBuilt: property.yearBuilt ? property.yearBuilt.toString() : '',
      realtor: property.realtor || { name: '', email: '', phone: '' },
      descriptionEN: property.descriptionEN || '',
      descriptionZH: property.descriptionZH || '',
      images: Array.isArray(property.images) ? property.images : ['https://picsum.photos/474/316?random=1']
    });
    setIsEditing(true);
    setError('');
  };

  const handleDelete = async function(id) {
    if (window.confirm(getTranslation('confirm_delete'))) {
      try {
        const response = await fetch('/.netlify/functions/properties', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        if (!response.ok) {
          throw new Error(`Ошибка удаления: ${response.statusText}`);
        }
        const fetchResponse = await fetch('/.netlify/functions/properties', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!fetchResponse.ok) {
          throw new Error(`Ошибка получения обновлённых свойств: ${fetchResponse.statusText}`);
        }
        const text = await fetchResponse.text();
        const data = text ? JSON.parse(text) : [];
        setProperties(data);
        alert(getTranslation('property_deleted'));
      } catch (error) {
        console.error('Ошибка удаления свойства:', error);
        setError('Не удалось удалить свойство: ' + error.message);
      }
    }
  };

  const resetForm = function() {
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

  const handleLanguageChange = function(langCode) {
    setLang(langCode);
    setIsLanguageDropdownOpen(false);
  };

  const handleLanguageMouseEnter = function() {
    clearTimeout(languageTimeoutRef.current);
    languageTimeoutRef.current = setTimeout(function() {
      setIsLanguageDropdownOpen(true);
    }, 100);
  };

  const handleLanguageMouseLeave = function() {
    clearTimeout(languageTimeoutRef.current);
    languageTimeoutRef.current = setTimeout(function() {
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
        h('button', { className: 'bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2' }, [
          languages.find(function(l) { return l.code === lang; }).flag || '🌐',
          languages.find(function(l) { return l.code === lang; }).name || getTranslation('language')
        ]),
        h('div', { className: `absolute bg-white shadow-lg rounded mt-1 ${isLanguageDropdownOpen ? 'block' : 'hidden'}` },
          languages.map(function(langOption) {
            return h('div', {
              key: langOption.code,
              className: 'px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2',
              onClick: function() { handleLanguageChange(langOption.code); }
            }, [
              langOption.flag,
              langOption.name
            ]);
          })
        )
      ])
    ]),
    h('h1', { className: 'text-3xl font-bold mb-6' }, getTranslation('admin_title')),
    h('form', { onSubmit: handleSubmit, className: 'space-y-4 mb-8' }, [
      h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'titleEN', className: 'block font-semibold mb-1' }, `${getTranslation('title_en')} *`),
          h('input', {
            type: 'text',
            id: 'titleEN',
            name: 'titleEN',
            value: formData.titleEN,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded',
            required: true
          })
        ]),
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'titleZH', className: 'block font-semibold mb-1' }, `${getTranslation('title_zh')} *`),
          h('input', {
            type: 'text',
            id: 'titleZH',
            name: 'titleZH',
            value: formData.titleZH,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded',
            required: true
          })
        ])
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'city', className: 'block font-semibold mb-1' }, `${getTranslation('city')} *`),
        h('select', {
          id: 'city',
          name: 'city',
          value: formData.city,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded',
          required: true
        }, [
          h('option', { value: '' }, getTranslation('select_city')),
          adminCities.map(function(city) {
            return h('option', { key: city, value: city }, getTranslation(city));
          })
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
            className: 'w-full p-2 border rounded'
          }, dealTypes.map(function(type) {
            return h('option', { key: type, value: type }, getTranslation(type));
          }))
        ]),
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'propertyType', className: 'block font-semibold mb-1' }, getTranslation('property_type')),
          h('select', {
            id: 'propertyType',
            name: 'propertyType',
            value: formData.propertyType,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded'
          }, propertyTypes.map(function(type) {
            return h('option', { key: type, value: type }, getTranslation(type));
          }))
        ])
      ]),
      h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'priceCNY', className: 'block font-semibold mb-1' }, `${getTranslation('price_cny')} *`),
          h('input', {
            type: 'number',
            id: 'priceCNY',
            name: 'priceCNY',
            value: formData.priceCNY,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded',
            required: true
          })
        ]),
        h('div', { className: 'form-group' }, [
          h('label', { htmlFor: 'priceUSD', className: 'block font-semibold mb-1' }, `${getTranslation('price_usd')} *`),
          h('input', {
            type: 'number',
            id: 'priceUSD',
            name: 'priceUSD',
            value: formData.priceUSD,
            onChange: handleInputChange,
            className: 'w-full p-2 border rounded',
            required: true
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
            className: 'w-full p-2 border rounded'
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
            className: 'w-full p-2 border rounded'
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
            className: 'w-full p-2 border rounded'
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
            className: 'w-full p-2 border rounded'
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
          className: 'w-full p-2 border rounded'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'realtor.email', className: 'block font-semibold mb-1' }, getTranslation('realtor_email')),
        h('input', {
          type: 'email',
          id: 'realtor.email',
          name: 'realtor.email',
          value: formData.realtor.email,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded',
          placeholder: 'example@domain.com'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'realtor.phone', className: 'block font-semibold mb-1' }, getTranslation('realtor_phone')),
        h('input', {
          type: 'tel',
          id: 'realtor.phone',
          name: 'realtor.phone',
          value: formData.realtor.phone,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded',
          placeholder: '+86 123 456 7890'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'descriptionEN', className: 'block font-semibold mb-1' }, getTranslation('description_en')),
        h('textarea', {
          id: 'descriptionEN',
          name: 'descriptionEN',
          value: formData.descriptionEN,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded h-24'
        })
      ]),
      h('div', { className: 'form-group' }, [
        h('label', { htmlFor: 'descriptionZH', className: 'block font-semibold mb-1' }, getTranslation('description_zh')),
        h('textarea', {
          id: 'descriptionZH',
          name: 'descriptionZH',
          value: formData.descriptionZH,
          onChange: handleInputChange,
          className: 'w-full p-2 border rounded h-24'
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
          className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        }, getTranslation('upload_images')),
        h('div', { className: 'image-preview space-y-2 mt-2' }, formData.images.length > 0
          ? formData.images.map(function(url, index) {
              return h(ImageItem, {
                key: `image-${index}-${url}`,
                image: url,
                index: index,
                removeImage: removeImage,
                lang: lang
              });
            }).filter(function(item) { return item.props.image; })
          : h('p', { className: 'text-gray-500' }, 'No images uploaded')
        )
      ]),
      error && h('div', { className: 'error text-red-500 text-sm mt-2' }, error),
      h('div', { className: 'form-group' }, [
        h('button', {
          type: 'submit',
          className: 'bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
        }, getTranslation(isEditing ? 'update_property' : 'add_property')),
        isEditing && h('button', {
          type: 'button',
          className: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2',
          onClick: resetForm
        }, getTranslation('cancel'))
      ])
    ]),
    h('h2', { className: 'text-2xl font-bold mb-4' }, getTranslation('existing_properties')),
    properties.length > 0
      ? h('div', { className: 'properties-list mt-8' }, properties.map(function(property) {
          return h('div', {
            key: property.id,
            className: 'property-item p-4 bg-gray-50 rounded-lg mb-4 border'
          }, [
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
            property.realtor && property.realtor.name && h('p', null, `${getTranslation('realtor_name')}: ${property.realtor.name}`),
            property.realtor && property.realtor.email && h('p', null, `${getTranslation('realtor_email')}: ${property.realtor.email}`),
            property.realtor && property.realtor.phone && h('p', null, `${getTranslation('realtor_phone')}: ${property.realtor.phone}`),
            property.descriptionEN && h('p', null, `${getTranslation('description_en')}: ${property.descriptionEN}`),
            property.descriptionZH && h('p', null, `${getTranslation('description_zh')}: ${property.descriptionZH}`),
            property.images && property.images.length > 0 && h('div', { className: 'property-images flex flex-wrap gap-2 mt-2' },
              property.images.map(function(url, index) {
                return h('img', {
                  key: `prop-image-${index}-${url}`,
                  src: url,
                  alt: `Property image ${index + 1}`,
                  className: 'w-24 h-16 object-cover rounded border',
                  onError: function(e) { e.target.src = 'https://picsum.photos/474/316?random=1'; },
                  loading: 'lazy'
                });
              })
            ),
            h('div', { className: 'property-actions flex gap-2 mt-2' }, [
              h('button', {
                onClick: function() { handleEdit(property); },
                className: 'bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'
              }, getTranslation('edit')),
              h('button', {
                onClick: function() { handleDelete(property.id); },
                className: 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
              }, getTranslation('delete'))
            ])
          ]);
        }))
      : h('p', { className: 'text-gray-600' }, getTranslation('no_properties'))
  ]);
}

// Render the app
document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  if (!root) {
    console.error('Элемент с id "root" не найден. Проверьте admin.html');
    throw new Error('Нет элемента root');
  }
  ReactDOM.render(h(AdminPanel), root);
  console.log('AdminPanel успешно отрендерен в', new Date().toISOString());
});

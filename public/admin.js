'use strict';
console.log('admin.js starting at', new Date().toISOString());

// Cloudinary configuration
const CLOUD_NAME = 'dkjakynhh';
const API_KEY = '724711754654635';
const API_SECRET = 'v4vizym6WCttYT-13k5XXw7yps8';

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
    Urumqi: "乌鲁木qi",
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

// Initialize form data
let formData = {
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
};
let properties = JSON.parse(localStorage.getItem('properties')) || [];
let isEditing = false;
let error = '';
const getTranslation = (key) => translations['EN'][key] || translations.EN[key] || key; // Исправлено EN в кавычках

// DOM elements
const form = document.createElement('form');
form.className = 'space-y-4 mb-8';
const propertiesList = document.createElement('div');
propertiesList.className = 'properties-list mt-8';

// Language switcher
const langSelect = document.createElement('select');
langSelect.className = 'bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700';
langSelect.onchange = (e) => {
  setLang(e.target.value);
};
languages.forEach(lang => {
  const option = document.createElement('option');
  option.value = lang.code;
  option.textContent = `${lang.flag} ${lang.name}`;
  if (lang.code === 'EN') option.selected = true;
  langSelect.appendChild(option);
});

// Generate Cloudinary signature
function generateSignature(paramsToSign) {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { ...paramsToSign, timestamp };
  const sortedKeys = Object.keys(params).sort();
  const stringToSign = sortedKeys.map(key => `${key}=${params[key]}`).join('&') + API_SECRET;
  return { signature: CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex), timestamp };
}

// Function to extract public_id from Cloudinary URL
function getPublicIdFromUrl(url) {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
  return match ? match[1] : null;
}

// Function to delete image from Cloudinary
async function deleteFromCloudinary(publicId) {
  const timestamp = Math.floor(Date.now() / 1000);
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
  const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);
  const formDataToSend = new FormData();
  formDataToSend.append('public_id', publicId);
  formDataToSend.append('api_key', API_KEY);
  formDataToSend.append('timestamp', timestamp);
  formDataToSend.append('signature', signature);
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
      method: 'POST',
      body: formDataToSend
    });
    const result = await response.json();
    if (result.result === 'ok') {
      console.log('Deleted from Cloudinary:', publicId);
    } else {
      console.error('Delete failed from Cloudinary:', result);
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
}

// Upload files
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'file-input';
fileInput.multiple = true;
fileInput.accept = 'image/*';
fileInput.style.display = 'none';

async function uploadFiles(event) {
  const files = event.target.files;
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
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error.message);
      }
      formData.images.push(result.secure_url);
      renderImages();
      error = '';
      console.log('Upload successful:', result.secure_url);
    } catch (error) {
      console.error('Upload error:', error);
      error = getTranslation('cloudinary_error') + ': ' + error.message;
      renderError();
    }
  }
}

function handleUploadClick() {
  fileInput.click();
}

function removeImage(index) {
  const imageUrl = formData.images[index];
  formData.images = formData.images.filter((_, i) => i !== index);
  if (imageUrl && imageUrl.includes('cloudinary.com')) {
    const publicId = getPublicIdFromUrl(imageUrl);
    if (publicId) {
      deleteFromCloudinary(publicId);
    } else {
      console.error('Could not extract public_id from', imageUrl);
    }
  } else {
    console.log('Non-Cloudinary image or invalid URL, only link removed:', imageUrl);
  }
  renderImages();
}

function moveImage(fromIndex, toIndex) {
  const newImages = [...formData.images];
  const [movedImage] = newImages.splice(fromIndex, 1);
  newImages.splice(toIndex, 0, movedImage);
  formData.images = newImages;
  renderImages();
}

// Handle form submission
function handleSubmit(e) {
  e.preventDefault();
  const titleEN = document.getElementById('titleEN').value;
  const titleZH = document.getElementById('titleZH').value;
  const city = document.getElementById('city').value;
  const priceCNY = document.getElementById('priceCNY').value;
  const priceUSD = document.getElementById('priceUSD').value;
  const dealType = document.getElementById('dealType').value;
  const propertyType = document.getElementById('propertyType').value;
  const area = document.getElementById('area').value;
  const floor = document.getElementById('floor').value;
  const rooms = document.getElementById('rooms').value;
  const yearBuilt = document.getElementById('yearBuilt').value;
  const realtorName = document.getElementById('realtor.name').value;
  const realtorEmail = document.getElementById('realtor.email').value;
  const realtorPhone = document.getElementById('realtor.phone').value;
  const descriptionEN = document.getElementById('descriptionEN').value;
  const descriptionZH = document.getElementById('descriptionZH').value;

  if (!titleEN || !titleZH || !city || !priceCNY || !priceUSD) {
    error = getTranslation('required_fields');
    renderError();
    return;
  }
  if (!realtorEmail.includes('@') && realtorEmail !== 'N/A') {
    error = getTranslation('invalid_email');
    renderError();
    return;
  }

  const newProperty = {
    id: formData.id || `A${Date.now()}`,
    country: 'China',
    titleEN,
    titleZH,
    city,
    dealType,
    propertyType,
    priceCNY: parseFloat(priceCNY) || 0,
    priceUSD: parseFloat(priceUSD) || 0,
    area: parseFloat(area) || null,
    floor: parseInt(floor) || null,
    rooms: parseInt(rooms) || null,
    yearBuilt: parseInt(yearBuilt) || null,
    realtor: { name: realtorName, email: realtorEmail, phone: realtorPhone },
    descriptionEN,
    descriptionZH,
    images: formData.images
  };

  if (isEditing) {
    properties = properties.map(p => p.id === newProperty.id ? newProperty : p);
    alert(getTranslation('property_updated'));
  } else {
    properties.push(newProperty);
    alert(getTranslation('property_added'));
  }
  localStorage.setItem('properties', JSON.stringify(properties));
  resetForm();
  renderProperties();
}

function handleEdit(property) {
  formData = { ...property };
  isEditing = true;
  error = '';
  renderForm();
}

function handleDelete(id) {
  if (window.confirm(getTranslation('confirm_delete'))) {
    properties = properties.filter(p => p.id !== id);
    localStorage.setItem('properties', JSON.stringify(properties));
    alert(getTranslation('property_deleted'));
    renderProperties();
  }
}

function resetForm() {
  formData = {
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
  };
  isEditing = false;
  error = '';
  renderForm();
}

// Render functions
function renderForm() {
  form.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label for="titleEN" class="block font-semibold mb-1">${getTranslation('title_en')} *</label>
        <input type="text" id="titleEN" name="titleEN" value="${formData.titleEN}" class="w-full p-2 border rounded" required>
      </div>
      <div class="form-group">
        <label for="titleZH" class="block font-semibold mb-1">${getTranslation('title_zh')} *</label>
        <input type="text" id="titleZH" name="titleZH" value="${formData.titleZH}" class="w-full p-2 border rounded" required>
      </div>
    </div>
    <div class="form-group">
      <label for="city" class="block font-semibold mb-1">${getTranslation('city')} *</label>
      <select id="city" name="city" class="w-full p-2 border rounded" required>
        <option value="">${getTranslation('select_city')}</option>
        ${adminCities.map(city => `<option value="${city}" ${formData.city === city ? 'selected' : ''}>${getTranslation(city)}</option>`).join('')}
      </select>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label for="dealType" class="block font-semibold mb-1">${getTranslation('deal_type')}</label>
        <select id="dealType" name="dealType" class="w-full p-2 border rounded">
          ${dealTypes.map(type => `<option value="${type}" ${formData.dealType === type ? 'selected' : ''}>${getTranslation(type)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label for="propertyType" class="block font-semibold mb-1">${getTranslation('property_type')}</label>
        <select id="propertyType" name="propertyType" class="w-full p-2 border rounded">
          ${propertyTypes.map(type => `<option value="${type}" ${formData.propertyType === type ? 'selected' : ''}>${getTranslation(type)}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label for="priceCNY" class="block font-semibold mb-1">${getTranslation('price_cny')} *</label>
        <input type="number" id="priceCNY" name="priceCNY" value="${formData.priceCNY}" class="w-full p-2 border rounded" required>
      </div>
      <div class="form-group">
        <label for="priceUSD" class="block font-semibold mb-1">${getTranslation('price_usd')} *</label>
        <input type="number" id="priceUSD" name="priceUSD" value="${formData.priceUSD}" class="w-full p-2 border rounded" required>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label for="area" class="block font-semibold mb-1">${getTranslation('area')}</label>
        <input type="number" id="area" name="area" value="${formData.area}" class="w-full p-2 border rounded">
      </div>
      <div class="form-group">
        <label for="floor" class="block font-semibold mb-1">${getTranslation('floor')}</label>
        <input type="number" id="floor" name="floor" value="${formData.floor}" class="w-full p-2 border rounded">
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-group">
        <label for="rooms" class="block font-semibold mb-1">${getTranslation('rooms')}</label>
        <input type="number" id="rooms" name="rooms" value="${formData.rooms}" class="w-full p-2 border rounded">
      </div>
      <div class="form-group">
        <label for="yearBuilt" class="block font-semibold mb-1">${getTranslation('year_built')}</label>
        <input type="number" id="yearBuilt" name="yearBuilt" value="${formData.yearBuilt}" class="w-full p-2 border rounded">
      </div>
    </div>
    <div class="form-group">
      <label for="realtor.name" class="block font-semibold mb-1">${getTranslation('realtor_name')}</label>
      <input type="text" id="realtor.name" name="realtor.name" value="${formData.realtor.name}" class="w-full p-2 border rounded">
    </div>
    <div class="form-group">
      <label for="realtor.email" class="block font-semibold mb-1">${getTranslation('realtor_email')}</label>
      <input type="email" id="realtor.email" name="realtor.email" value="${formData.realtor.email}" class="w-full p-2 border rounded" placeholder="N/A or email">
    </div>
    <div class="form-group">
      <label for="realtor.phone" class="block font-semibold mb-1">${getTranslation('realtor_phone')}</label>
      <input type="text" id="realtor.phone" name="realtor.phone" value="${formData.realtor.phone}" class="w-full p-2 border rounded" placeholder="Phone or URL">
    </div>
    <div class="form-group">
      <label for="descriptionEN" class="block font-semibold mb-1">${getTranslation('description_en')}</label>
      <textarea id="descriptionEN" name="descriptionEN" class="w-full p-2 border rounded h-24">${formData.descriptionEN}</textarea>
    </div>
    <div class="form-group">
      <label for="descriptionZH" class="block font-semibold mb-1">${getTranslation('description_zh')}</label>
      <textarea id="descriptionZH" name="descriptionZH" class="w-full p-2 border rounded h-24">${formData.descriptionZH}</textarea>
    </div>
    <div class="form-group">
      <label class="block font-semibold mb-1">${getTranslation('upload_images')}</label>
      <input type="file" id="file-input" multiple accept="image/*" style="display: none" onchange="uploadFiles(event)">
      <button type="button" onclick="handleUploadClick()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">${getTranslation('upload_images')}</button>
      <div id="image-container" class="flex flex-wrap gap-4"></div>
    </div>
    ${error ? `<div class="text-red-500 text-sm mt-2">${error}</div>` : ''}
    <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">${getTranslation(isEditing ? 'update_property' : 'add_property')}</button>
  `;
  document.querySelector('.container').replaceChild(form, document.querySelector('form'));
}

function renderImages() {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = formData.images.map((url, index) => `
    <div class="relative" draggable="true" ondragstart="dragStart(event, ${index})" ondragover="dragOver(event)" ondrop="drop(event, ${index})">
      <img src="${url}" alt="Image ${index + 1}" class="w-32 h-24 object-cover rounded border" onError="this.src='https://via.placeholder.com/96x64?text=Image+Error';">
      <button type="button" onclick="removeImage(${index})" class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">X</button>
    </div>
  `).join('');
}

function renderProperties() {
  propertiesList.innerHTML = properties.length === 0
    ? `<p class="text-gray-600">${getTranslation('no_properties')}</p>`
    : properties.map(property => `
      <div class="p-4 bg-gray-50 rounded-lg mb-4 border">
        <p class="font-semibold">${getTranslation('title_en')}: ${property.titleEN || ''}</p>
        <p>${getTranslation('title_zh')}: ${property.titleZH || ''}</p>
        <p>${getTranslation('city')}: ${getTranslation(property.city) || ''}</p>
        <p>${getTranslation('deal_type')}: ${getTranslation(property.dealType) || ''}</p>
        <p>${getTranslation('property_type')}: ${getTranslation(property.propertyType) || ''}</p>
        <p>${getTranslation('price_cny')}: ¥${(property.priceCNY || 0).toLocaleString()}</p>
        <p>${getTranslation('price_usd')}: $${(property.priceUSD || 0).toLocaleString()}</p>
        ${property.area ? `<p>${getTranslation('area')}: ${property.area} m²</p>` : ''}
        ${property.floor ? `<p>${getTranslation('floor')}: ${property.floor}</p>` : ''}
        ${property.rooms ? `<p>${getTranslation('rooms')}: ${property.rooms}</p>` : ''}
        ${property.yearBuilt ? `<p>${getTranslation('year_built')}: ${property.yearBuilt}</p>` : ''}
        ${property.realtor.name ? `<p>${getTranslation('realtor_name')}: ${property.realtor.name}</p>` : ''}
        ${property.realtor.email ? `<p>${getTranslation('realtor_email')}: ${property.realtor.email}</p>` : ''}
        ${property.realtor.phone ? `<p>${getTranslation('realtor_phone')}: ${property.realtor.phone}</p>` : ''}
        ${property.descriptionEN ? `<p>${getTranslation('description_en')}: ${property.descriptionEN}</p>` : ''}
        ${property.descriptionZH ? `<p>${getTranslation('description_zh')}: ${property.descriptionZH}</p>` : ''}
        ${property.images.length > 0 ? `<div class="flex flex-wrap gap-2 mt-2">${property.images.map((url, index) => `
          <img src="${url}" alt="Property image ${index + 1}" class="w-24 h-16 object-cover rounded border" onError="this.src='https://via.placeholder.com/96x64?text=Image+Error';">
        `).join('')}</div>` : ''}
        <div class="flex gap-2 mt-2">
          <button onclick="handleEdit(${JSON.stringify(property)})" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">${getTranslation('edit')}</button>
          <button onclick="handleDelete('${property.id}')" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">${getTranslation('delete')}</button>
        </div>
      </div>
    `).join('');
  document.querySelector('.properties-list').replaceWith(propertiesList);
}

function renderError() {
  const errorDiv = document.querySelector('.text-red-500');
  if (error) {
    if (errorDiv) errorDiv.textContent = error;
    else form.insertAdjacentHTML('beforeend', `<div class="text-red-500 text-sm mt-2">${error}</div>`);
  } else if (errorDiv) errorDiv.remove();
}

// Drag-and-drop handlers
let draggedIndex = null;

function dragStart(event, index) {
  draggedIndex = index;
  event.dataTransfer.setData('text/plain', index);
}

function dragOver(event) {
  event.preventDefault(); // Allow drop
}

function drop(event, toIndex) {
  event.preventDefault();
  if (draggedIndex === null) return;
  moveImage(draggedIndex, toIndex);
  draggedIndex = null;
}

// Set up the page
function setLang(lang) {
  document.documentElement.lang = lang.toLowerCase();
  renderForm();
  renderProperties();
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.className = 'container mx-auto p-4 max-w-4xl';
  const langDiv = document.createElement('div');
  langDiv.className = 'relative mb-8';
  const langWrapper = document.createElement('div');
  langWrapper.className = 'absolute top-0 right-0';
  langWrapper.appendChild(langSelect);
  langDiv.appendChild(langWrapper);
  container.appendChild(langDiv);
  const h1 = document.createElement('h1');
  h1.className = 'text-3xl font-bold mb-6';
  h1.textContent = getTranslation('admin_title');
  container.appendChild(h1);
  container.appendChild(form);
  container.appendChild(propertiesList);
  document.body.appendChild(container);

  fileInput.onchange = uploadFiles;
  form.onsubmit = handleSubmit;

  renderForm();
  renderProperties();

  // Password protection
  const ADMIN_PASSWORD = 'Awinly-Awinly228';
  const storedPassword = localStorage.getItem('adminPassword');
  if (!storedPassword) {
    const enteredPassword = prompt('Enter admin password:');
    if (enteredPassword !== ADMIN_PASSWORD) {
      alert('Incorrect password. Access denied.');
      window.location.href = '/';
      return;
    }
    localStorage.setItem('adminPassword', enteredPassword);
  } else if (storedPassword !== ADMIN_PASSWORD) {
    const enteredPassword = prompt('Enter admin password:');
    if (enteredPassword !== ADMIN_PASSWORD) {
      alert('Incorrect password. Access denied.');
      window.location.href = '/';
      return;
    }
    localStorage.setItem('adminPassword', enteredPassword);
  }
});

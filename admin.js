'use strict';

console.log('admin.js starting at', new Date().toISOString());

if (typeof window === 'undefined') {
  console.error('Window object not available!');
} else {
  console.log('Window object available');
}

if (typeof React === 'undefined') {
  console.error('React not loaded!');
} else {
  console.log('React loaded:', React.version);
}

if (typeof ReactDOM === 'undefined') {
  console.error('ReactDOM not loaded!');
} else {
  console.log('ReactDOM loaded');
}

const { useState, useEffect } = React || {};
const h = React.createElement;

if (!useState || !useEffect || !h) {
  console.error('Required React components missing:', { useState, useEffect, h });
} else {
  console.log('React components available');
}

// Translations
const translations = {
  EN: {
    brand: "AWINLY",
    about: "About",
    admin: "Admin",
    add_property: "Add Property",
    edit_property: "Edit Property",
    add: "Add",
    update: "Update",
    delete: "Delete",
    properties_list: "Properties List",
    image_url: "Image URL",
    add_image: "Add Image",
    realtor_name: "Realtor Name",
    realtor_email: "Realtor Email",
    realtor_phone: "Realtor Phone",
    description: "Description",
    title: "Title",
    search_city: "Select City",
    price: "Price",
    Apartment: "Apartment",
    House: "House",
    Land: "Land",
    buy: "Buy",
    rent: "Rent",
    area: "Area",
    rooms: "Rooms",
    yearBuilt: "Year Built",
    Beijing: "Beijing",
    Shanghai: "Shanghai",
    Guangzhou: "Guangzhou",
    Shenzhen: "Shenzhen",
    // Add more if needed, but since it's select, not necessary
  },
  zh: {
    brand: "AWINLY",
    about: "关于",
    admin: "管理",
    add_property: "添加物业",
    edit_property: "编辑物业",
    add: "添加",
    update: "更新",
    delete: "删除",
    properties_list: "物业列表",
    image_url: "图片链接",
    add_image: "添加图片",
    realtor_name: "经纪人姓名",
    realtor_email: "经纪人邮箱",
    realtor_phone: "经纪人电话",
    description: "描述",
    title: "标题",
    search_city: "选择城市",
    price: "价格",
    Apartment: "公寓",
    House: "别墅",
    Land: "土地",
    buy: "购买",
    rent: "租赁",
    area: "面积",
    rooms: "房间数",
    yearBuilt: "建造年份",
    Beijing: "北京",
    Shanghai: "上海",
    Guangzhou: "广州",
    Shenzhen: "深圳",
  },
};

// Mock data
const initialProperties = [];

// Full cities list for admin select
const adminCities = [
  'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Chongqing', 'Tianjin', 'Wuhan',
  'XiAn', 'Hangzhou', 'Nanjing', 'Suzhou', 'Qingdao', 'Dalian', 'Shenyang', 'Changsha',
  'Zhengzhou', 'Kunming', 'Hefei', 'Fuzhou', 'Xiamen', 'Jinan', 'Harbin', 'Changchun',
  'Nanchang', 'Urumqi', 'Shijiazhuang', 'Taiyuan', 'Nanning', 'Guiyang', 'Lanzhou',
  'Haikou', 'Yinchuan', 'Xining', 'Hohhot', 'Lhasa', 'Changzhou', 'Wuxi', 'Ningbo',
  'Wenzhou', 'Jiaxing', 'Huzhou', 'Shaoxing', 'Zhoushan', 'Taizhou', 'Lianyungang',
  'Yancheng', 'Yangzhou', 'Zhenjiang', 'Taizhou', 'HuaiAn', 'Suqian', 'LuAn', 'Huaibei',
  'Bengbu', 'Fuyang', 'Huainan', 'Chuzhou', 'MaAnshan', 'Tongling', 'AnQing', 'Huangshan',
  'Chizhou', 'Xuancheng', 'Jinhua', 'Quzhou', 'Lishui', 'Zaozhuang', 'Weifang', 'Yantai',
  'Weihai', 'Rizhao', 'Laiwu', 'Linyi', 'Dezhou', 'Liaocheng', 'Binzhou', 'Heze', 'Zibo',
  'Dongying', 'Zhengding', 'Baoding', 'Langfang', 'Tangshan', 'Qinhuangdao', 'Handan',
  'Xingtai', 'Zhangjiakou', 'Chengde', 'Cangzhou', 'Hengshui'
];

function Admin() {
  const [lang, setLang] = useState('EN');
  const t = (key) => (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    city: '',
    priceCNY: '',
    priceUSD: '',
    propertyType: 'Apartment',
    dealType: 'buy',
    description: '',
    area: '',
    rooms: '',
    yearBuilt: '',
    images: [''],
    realtor: { name: '', email: '', phone: '' },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log('Loading properties for admin...');
    try {
      const savedProperties = JSON.parse(localStorage.getItem('properties')) || initialProperties;
      console.log('Admin properties loaded:', savedProperties);
      if (Array.isArray(savedProperties)) {
        setProperties(savedProperties);
      } else {
        console.error('Invalid properties data:', savedProperties);
        setProperties(initialProperties);
      }
    } catch (error) {
      console.error('Error parsing localStorage in admin:', error);
      setProperties(initialProperties);
    }
  }, []);

  const saveProperties = (updatedProperties) => {
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    console.log('Properties saved:', updatedProperties);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('realtor.')) {
      const field = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        realtor: { ...prev.realtor, [field]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index, value) => {
    setForm(prev => {
      const newImages = [...prev.images];
      newImages[index] = value;
      return { ...prev, images: newImages };
    });
  };

  const addImageField = () => {
    setForm(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = {
      ...form,
      id: isEditing ? form.id : properties.length + 1,
      priceCNY: parseInt(form.priceCNY) || 0,
      priceUSD: parseInt(form.priceUSD) || 0,
      area: parseInt(form.area) || null,
      rooms: parseInt(form.rooms) || null,
      yearBuilt: parseInt(form.yearBuilt) || null,
      images: form.images.filter(img => img),
      country: 'China',
    };
    const updatedProperties = isEditing
      ? properties.map(p => p.id === form.id ? newProperty : p)
      : [...properties, newProperty];
    saveProperties(updatedProperties);
    setForm({
      id: null,
      title: '',
      city: '',
      priceCNY: '',
      priceUSD: '',
      propertyType: 'Apartment',
      dealType: 'buy',
      description: '',
      area: '',
      rooms: '',
      yearBuilt: '',
      images: [''],
      realtor: { name: '', email: '', phone: '' },
    });
    setIsEditing(false);
  };

  const handleEdit = (property) => {
    setForm(property);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const updatedProperties = properties.filter(p => p.id !== id);
    saveProperties(updatedProperties);
  };

  return h('div', { className: 'admin-panel' }, [
    h('h2', null, isEditing ? t('edit_property') : t('add_property')),
    h('form', { className: 'admin-form', onSubmit: handleSubmit }, [
      h('input', { name: 'title', value: form.title, onChange: handleInputChange, placeholder: t('title'), required: true }),
      h('select', { name: 'city', value: form.city, onChange: handleInputChange, required: true }, [
        h('option', { value: '' }, t('search_city')),
        ...adminCities.map(city => h('option', { key: city, value: city }, t(city) || city))
      ]),
      h('input', { name: 'priceCNY', type: 'number', value: form.priceCNY, onChange: handleInputChange, placeholder: `${t('price')} (CNY)`, required: true }),
      h('input', { name: 'priceUSD', type: 'number', value: form.priceUSD, onChange: handleInputChange, placeholder: `${t('price')} (USD)` }),
      h('select', { name: 'propertyType', value: form.propertyType, onChange: handleInputChange }, [
        h('option', { value: 'Apartment' }, t('Apartment')),
        h('option', { value: 'House' }, t('House')),
        h('option', { value: 'Land' }, t('Land'))
      ]),
      h('select', { name: 'dealType', value: form.dealType, onChange: handleInputChange }, [
        h('option', { value: 'buy' }, t('buy')),
        h('option', { value: 'rent' }, t('rent'))
      ]),
      h('textarea', { name: 'description', value: form.description, onChange: handleInputChange, placeholder: t('description') }),
      h('input', { name: 'area', type: 'number', value: form.area, onChange: handleInputChange, placeholder: t('area') }),
      h('input', { name: 'rooms', type: 'number', value: form.rooms, onChange: handleInputChange, placeholder: t('rooms') }),
      h('input', { name: 'yearBuilt', type: 'number', value: form.yearBuilt, onChange: handleInputChange, placeholder: t('yearBuilt') }),
      h('div', null, form.images.map((img, index) => h('input', {
        key: index,
        name: 'image',
        value: img,
        onChange: (e) => handleImageChange(index, e.target.value),
        placeholder: t('image_url')
      }))),
      h('button', { type: 'button', onClick: addImageField }, t('add_image')),
      h('input', { name: 'realtor.name', value: form.realtor.name, onChange: handleInputChange, placeholder: t('realtor_name') }),
      h('input', { name: 'realtor.email', value: form.realtor.email, onChange: handleInputChange, placeholder: t('realtor_email') }),
      h('input', { name: 'realtor.phone', value: form.realtor.phone, onChange: handleInputChange, placeholder: t('realtor_phone') }),
      h('button', { type: 'submit' }, isEditing ? t('update') : t('add'))
    ]),
    h('h3', null, t('properties_list')),
    h('ul', { className: 'admin-list' }, properties.map(property =>
      h('li', { key: property.id }, [
        h('span', null, property.title),
        h('button', { onClick: () => handleEdit(property) }, t('edit')),
        h('button', { onClick: () => handleDelete(property.id) }, t('delete'))
      ])
    ))
  ]);
}

if (typeof ReactDOM !== 'undefined' && document.getElementById('root')) {
  console.log('Rendering Admin at', new Date().toISOString());
  ReactDOM.render(h(Admin), document.getElementById('root'));
} else {
  console.error('Cannot render Admin: ReactDOM or root element missing at', new Date().toISOString());
}
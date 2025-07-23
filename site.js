'use strict';

console.log('site.js starting at', new Date().toISOString());

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

if (typeof ReactRouterDOM === 'undefined') {
  console.error('React Router DOM not loaded!');
} else {
  console.log('React Router DOM loaded');
}

const { useState, useEffect } = React || {};
const { BrowserRouter, Route, Switch, Link } = ReactRouterDOM || {};
const h = React.createElement;

if (!useState || !useEffect || !BrowserRouter || !Route || !Switch || !Link || !h) {
  console.error('Required React components missing:', { useState, useEffect, BrowserRouter, Route, Switch, Link, h });
} else {
  console.log('React components available');
}

// Переводы
const translations = {
  EN: {
    title: "FIND YOUR PERFECT PROPERTY",
    brand: "AWINLY",
    search_city: "Select City",
    buy: "Buy",
    rent: "Rent",
    Apartment: "Apartment",
    House: "House",
    Land: "Land",
    offer_button: "Search",
    no_results: "No properties found.",
    price: "Price",
    about: "About",
    admin: "Admin",
    Beijing: "Beijing",
    Shanghai: "Shanghai",
    Guangzhou: "Guangzhou",
    Shenzhen: "Shenzhen",
    about_text: "Awinly is a test project to gauge demand for real estate listings. Starting in China, with plans for global expansion.",
    area: "Area",
    rooms: "Rooms",
    yearBuilt: "Year Built",
  },
  zh: {
    title: "寻找您的理想物业",
    brand: "AWINLY",
    search_city: "选择城市",
    buy: "购买",
    rent: "租赁",
    Apartment: "公寓",
    House: "别墅",
    Land: "土地",
    offer_button: "搜索",
    no_results: "未找到物业。",
    price: "价格",
    about: "关于",
    admin: "管理",
    Beijing: "北京",
    Shanghai: "上海",
    Guangzhou: "广州",
    Shenzhen: "深圳",
    about_text: "Awinly 是一个测试项目，旨在评估房地产列表需求，从中国开始，计划全球扩展。",
    area: "面积",
    rooms: "房间数",
    yearBuilt: "建造年份",
  },
};

// Моковые данные
const initialProperties = [
  {
    id: 1,
    title: "Property 1",
    country: "China",
    city: "Beijing",
    priceCNY: 500000,
    priceUSD: 71428,
    propertyType: "Apartment",
    dealType: "buy",
    description: "A beautiful apartment in a prime location.",
    area: 100,
    rooms: 3,
    yearBuilt: 2005,
    images: ["https://picsum.photos/474/316?random=1"],
    realtor: { name: "John Doe", email: "john.doe@awinly.com", phone: "+123-456-7890" },
  },
];

function App() {
  const [lang, setLang] = useState ? useState('EN') : [null, () => console.error('setLang fallback')];
  const t = (key) => (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
  const [properties, setProperties] = useState ? useState([]) : [null, () => console.error('setProperties fallback')];
  const [filteredProperties, setFilteredProperties] = useState ? useState([]) : [null, () => console.error('setFilteredProperties fallback')];
  const [displayedProperties, setDisplayedProperties] = useState ? useState([]) : [null, () => console.error('setDisplayedProperties fallback')];
  const [page, setPage] = useState ? useState(1) : [null, () => console.error('setPage fallback')];
  const [currency, setCurrency] = useState ? useState('CNY') : [null, () => console.error('setCurrency fallback')];
  const [searchCity, setSearchCity] = useState ? useState('') : [null, () => console.error('setSearchCity fallback')];
  const [dealType, setDealType] = useState ? useState('') : [null, () => console.error('setDealType fallback')];
  const [propertyType, setPropertyType] = useState ? useState('') : [null, () => console.error('setPropertyType fallback')];
  const [isCityModalOpen, setIsCityModalOpen] = useState ? useState(false) : [null, () => console.error('setIsCityModalOpen fallback')];
  const [citySearch, setCitySearch] = useState ? useState('') : [null, () => console.error('setCitySearch fallback')];
  const listingsPerPage = 10;

  const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'];
  const dealTypes = [
    { value: 'buy', label: 'buy' },
    { value: 'rent', label: 'rent' },
  ];
  const propertyTypes = [
    { value: 'Apartment', label: 'Apartment' },
    { value: 'House', label: 'House' },
    { value: 'Land', label: 'Land' },
  ];

  useEffect(() => {
    console.log('Loading properties from localStorage...');
    try {
      const savedProperties = JSON.parse(localStorage.getItem('properties')) || initialProperties;
      console.log('Properties loaded:', savedProperties);
      if (Array.isArray(savedProperties)) {
        setProperties(savedProperties);
        setFilteredProperties(savedProperties);
        setDisplayedProperties(savedProperties.slice(0, listingsPerPage));
      } else {
        console.error('Invalid properties data:', savedProperties);
        setProperties(initialProperties);
        setFilteredProperties(initialProperties);
        setDisplayedProperties(initialProperties.slice(0, listingsPerPage));
      }
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      setProperties(initialProperties);
      setFilteredProperties(initialProperties);
      setDisplayedProperties(initialProperties.slice(0, listingsPerPage));
    }
  }, []);

  useEffect(() => {
    console.log('Setting up scroll listener...');
    const handleScroll = () => {
      const btn = document.querySelector('.scroll-to-top-btn');
      if (btn) {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        console.log('Loading more, page:', page + 1);
        setPage((prev) => {
          const nextPage = prev + 1;
          const newProperties = filteredProperties.slice(0, nextPage * listingsPerPage);
          setDisplayedProperties(newProperties);
          return nextPage;
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredProperties]);

  const handleFilter = () => {
    console.log('Filtering with:', { searchCity, dealType, propertyType });
    const filtered = properties.filter((property) => {
      return (
        (!searchCity || property.city === searchCity) &&
        (!dealType || property.dealType === dealType) &&
        (!propertyType || property.propertyType === propertyType)
      );
    });
    console.log('Filtered results:', filtered);
    setFilteredProperties(filtered);
    setDisplayedProperties(filtered.slice(0, listingsPerPage));
    setPage(1);
  };

  const PropertyCard = ({ property }) => {
    const price = currency === 'CNY' ? property.priceCNY : property.priceUSD;
    const currencySymbol = currency === 'CNY' ? '¥' : '$';
    const [currentImageIndex, setCurrentImageIndex] = useState ? useState(0) : [0, () => console.error('setCurrentImageIndex fallback')];
    const images = property.images && property.images.length > 0 ? property.images : ["https://picsum.photos/474/316?random=" + property.id];

    return h('div', { className: 'listing-card' }, [
      h('div', { className: 'listing-image-wrapper' }, [
        h('div', { className: 'listing-image-container' }, [
          h('div', { className: 'carousel' }, [
            h('img', { src: images[currentImageIndex], alt: property.title, className: 'carousel-image' }),
            images.length > 1 ? [
              h('button', { className: 'carousel-arrow left', onClick: () => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)) }, '←'),
              h('button', { className: 'carousel-arrow right', onClick: () => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)) }, '→'),
              h('div', { className: 'carousel-dots' }, images.map((_, index) =>
                h('div', {
                  key: index,
                  className: `carousel-dot ${index === currentImageIndex ? 'active' : ''}`,
                  onClick: () => setCurrentImageIndex(index)
                }, null)
              ))
            ] : null
          ])
        ])
      ]),
      h('div', { className: 'listing-details' }, [
        h('div', { className: 'listing-details-content' }, [
          h('div', { className: 'listing-details-left' }, [
            h('h3', null, property.title),
            h('p', { className: 'price' }, `${currencySymbol}${price.toLocaleString()}`),
            h('p', { className: 'location' }, `${t(property.city)}, ${property.country}`),
            h('p', { className: 'deal-type' }, t(property.dealType)),
            h('p', { className: 'spec-property-type' }, t(property.propertyType)),
            h('div', { className: 'listing-specs' }, [
              property.area && h('span', null, [
                h('div', { className: 'spec-value' }, `${property.area} m²`),
                h('div', { className: 'spec-label' }, t('area'))
              ]),
              property.rooms && h('span', null, [
                h('div', { className: 'spec-value' }, property.rooms),
                h('div', { className: 'spec-label' }, t('rooms'))
              ]),
              property.yearBuilt && h('span', null, [
                h('div', { className: 'spec-value' }, property.yearBuilt),
                h('div', { className: 'spec-label' }, t('yearBuilt'))
              ])
            ])
          ]),
          h('div', { className: 'listing-details-right' }, [
            property.description && h('p', { className: 'description' }, property.description),
            h('div', { className: 'realtor-info' }, [
              h('p', null, property.realtor.name),
              property.realtor.email && h('p', null, property.realtor.email),
              h('p', null, property.realtor.phone)
            ])
          ])
        ])
      ])
    ]);
  };

  const Listings = () => h('section', { className: 'offer' }, [
    h('div', { className: 'offer-container' }, [
      h('h1', null, t('title')),
      h('div', { className: 'filter-section' }, [
        h('div', { className: 'search-bar' }, [
          h('div', { className: 'search-bar-container' }, [
            h('div', { className: 'filter-wrapper' }, [
              h('div', { className: 'filter-container' }, [
                h('div', { className: 'city-selector', onClick: () => setIsCityModalOpen(true) }, [
                  h('div', { className: 'city-part' }, [
                    h('div', { className: 'city-text' }, searchCity ? t(searchCity) : t('search_city'))
                  ])
                ]),
                h('div', { className: 'deal-type-selector' }, [
                  h('div', { className: 'deal-type-part' }, [
                    h('select', {
                      className: 'deal-type-text',
                      value: dealType,
                      onChange: (e) => { setDealType(e.target.value); handleFilter(); }
                    }, [
                      h('option', { value: '' }, `${t('buy')}/${t('rent')}`),
                      ...dealTypes.map((type) => h('option', { key: type.value, value: type.value }, t(type.label)))
                    ])
                  ])
                ]),
                h('div', { className: 'property-type-selector' }, [
                  h('div', { className: 'property-type-part' }, [
                    h('select', {
                      className: 'property-type-text',
                      value: propertyType,
                      onChange: (e) => { setPropertyType(e.target.value); handleFilter(); }
                    }, [
                      h('option', { value: '' }, `${t('Apartment')}/${t('House')}/${t('Land')}`),
                      ...propertyTypes.map((type) => h('option', { key: type.value, value: type.value }, t(type.label)))
                    ])
                  ])
                ])
              ]),
              h('button', { className: 'search-btn', onClick: handleFilter }, t('offer_button'))
            ])
          ])
        ])
      ])
    ])
  ]);

  const ListingsContainer = () => h('div', { className: 'listings-container' }, [
    displayedProperties.length > 0 ? h('div', { className: 'listings-list' }, displayedProperties.map((property) =>
      h(PropertyCard, { key: property.id, property })
    )) : h('div', { className: 'no_results' }, t('no_results'))
  ]);

  const ScrollToTopButton = () => h('button', {
    className: 'scroll-to-top-btn',
    style: { display: window.scrollY > 300 ? 'block' : 'none' },
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
  }, '↑');

  const CityModal = () => isCityModalOpen && h('div', { className: 'modal-overlay', onClick: () => setIsCityModalOpen(false) }, [
    h('div', { className: 'modal', onClick: (e) => e.stopPropagation() }, [
      h('div', { className: 'modal-header' }, [
        h('h3', null, t('search_city')),
        h('button', { className: 'modal-close', onClick: () => setIsCityModalOpen(false) }, '×')
      ]),
      h('div', { className: 'modal-search-container' }, [
        h('input', {
          type: 'text',
          className: 'modal-search',
          placeholder: t('search_city'),
          value: citySearch,
          onChange: (e) => setCitySearch(e.target.value)
        }),
        h('span', { className: 'modal-search-icon' }, '🔍')
      ]),
      h('div', { className: 'modal-content' }, [
        h('div', { className: 'cities-grid' }, cities.filter((city) =>
          t(city).toLowerCase().includes(citySearch.toLowerCase())
        ).map((city) =>
          h('div', {
            key: city,
            className: `modal-item ${searchCity === city ? 'selected' : ''}`,
            onClick: () => {
              setSearchCity(city);
              setIsCityModalOpen(false);
              setCitySearch('');
              handleFilter();
            }
          }, t(city))
        ))
      ]),
      h('div', { className: 'modal-footer' }, [
        h('button', {
          className: 'modal-btn clear',
          onClick: () => {
            setSearchCity('');
            setCitySearch('');
            handleFilter();
            setIsCityModalOpen(false);
          }
        }, 'Clear'),
        h('button', { className: 'modal-btn', onClick: () => setIsCityModalOpen(false) }, 'Done')
      ])
    ])
  ]);

  const AboutPage = () => h('div', { className: 'about-container' }, [
    h('h1', null, t('about').toUpperCase()),
    h('img', { src: 'https://picsum.photos/600/300', alt: 'Awinly Vision', style: { width: '100%', maxWidth: '600px', marginBottom: '20px' } }),
    h('p', null, t('about_text'))
  ]);

  const AdminPage = () => h('div', { className: 'about-container' }, [
    h('h1', null, t('admin').toUpperCase()),
    h('p', null, 'Пожалуйста, откройте admin.html для доступа к админ-панели.')
  ]);

  return h(BrowserRouter, null, [
    h('div', { className: 'listings' }, [
      h('header', { className: 'header' }, [
        h('div', { className: 'header-container' }, [
          h('div', { className: 'header-left' }, [
            h('img', { src: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', alt: 'Awinly Logo', className: 'listings-logo' }),
            h('div', { className: 'header-title' }, [h('h1', null, t('brand'))]),
            h(Link, { to: '/', className: 'nav-text' }, t('title')),
            h(Link, { to: '/about', className: 'nav-text' }, t('about')),
            h(Link, { to: '/admin', className: 'nav-text' }, t('admin'))
          ]),
          h('div', { className: 'header-actions' }, [
            h('div', { className: 'dropdown' }, [
              h('select', { className: 'dropdown-btn', value: lang, onChange: (e) => setLang(e.target.value) }, [
                h('option', { value: 'EN' }, 'English'),
                h('option', { value: 'zh' }, '中文')
              ])
            ]),
            h('div', { className: 'dropdown' }, [
              h('select', { className: 'dropdown-btn', value: currency, onChange: (e) => setCurrency(e.target.value) }, [
                h('option', { value: 'CNY' }, 'CNY'),
                h('option', { value: 'USD' }, 'USD')
              ])
            ])
          ])
        ])
      ]),
      h(Switch, null, [
        h(Route, { exact: true, path: '/' }, [
          Listings(),
          ListingsContainer(),
          ScrollToTopButton(),
          CityModal()
        ]),
        h(Route, { path: '/about' }, [AboutPage()]),
        h(Route, { path: '/admin' }, [AdminPage()])
      ])
    ])
  ]);
}

if (typeof ReactDOM !== 'undefined' && document.getElementById('root')) {
  console.log('Rendering App at', new Date().toISOString());
  ReactDOM.render(h(App), document.getElementById('root'));
} else {
  console.error('Cannot render App: ReactDOM or root element missing at', new Date().toISOString());
}
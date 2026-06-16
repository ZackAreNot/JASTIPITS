import {
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { Children, useEffect, useMemo, useState } from 'react'
import './App.css'

const assets = {
  podium: '/Assets/HomePage/newhomepage3x/123lead.png',
  chat: '/Assets/HomePage/Chat.png',
  cart: '/Assets/HomePage/newhomepage3x/Buymew.png',
  home: '/Assets/HomePage/Icon Home Active.png',
  profile: '/Assets/HomePage/Profile.png',
  ayam: '/Assets/HomePage/ayam.png',
  ayamOmSatrio: '/Assets/HomePage/ayamomsatrio.png',
  maps: '/Assets/HomePage/logomaps.png',
  nasi: '/Assets/HomePage/nasi.png',
  ppEvan: '/Assets/HomePage/newhomepage3x/profil.png',
  rockChicken: '/Assets/HomePage/rockchiken.png',
  roti: '/Assets/HomePage/roti.png',
  rotiBecek: '/Assets/HomePage/rotibecek.png',
  search: '/Assets/HomePage/searchicon.png',
  paymentPattern: '/Assets/PaymentAsset/Pattern.png',
  paymentQr: '/Assets/PaymentAsset/QR_Code_example1.png',
  qrisText: '/Assets/PaymentAsset/qristext.png',
  food: {
    geprekLabtek: '/Assets/homepagefoodmenu/GeprekLabtek.png',
    nasiAyamKampus: '/Assets/homepagefoodmenu/NasiAyamKampus.png',
    nasiGilaBundaran: '/Assets/homepagefoodmenu/NasiGilaBundaran.png',
    rockChicken: '/Assets/homepagefoodmenu/RockCHiken.png',
    rotiCoklatKeju: '/Assets/homepagefoodmenu/RotiCoklatKeju.png',
    ayamKuahBlukutuk: '/Assets/homepagefoodmenu/ayamkuahblukutuk.png',
  },
  zoomFood: {
    geprekLabtek: '/Assets/zoominfood/gepreklabtek.png',
    nasiAyamKampus: '/Assets/zoominfood/ayamkampus.png',
    nasiGilaBundaran: '/Assets/zoominfood/nasigila.png',
    rockChicken: '/Assets/zoominfood/rockchiken.png',
    rotiBecek: '/Assets/zoominfood/rotibecekmasevan.png',
    rotiCoklatKeju: '/Assets/zoominfood/roticoklatkeju.png',
    ayamKuahBlukutuk: '/Assets/zoominfood/ayamkuahsatrio.png',
  },
}

const currentUser = {
  name: 'Evan GantengZ',
  status: 'Pengguna jasa',
  location: 'Perum Asdos, Jln burung kuntul',
  avatar: assets.ppEvan,
}

const jastipers = [
  {
    id: 'zakuy',
    name: 'Jastip Zakuy Playboy',
    route: 'Kantin Teknik > Asrama',
    closesAt: '20.00',
    eta: '8-15 mnt',
    rating: '4.9',
    status: 'open',
  },
  {
    id: 'syihan',
    name: 'Jastip Syihan Hengker',
    route: 'Manyar > Perum Asdos',
    closesAt: '20.30',
    eta: '10-20 mnt',
    rating: '4.8',
    status: 'open',
  },
  {
    id: 'albert',
    name: 'Jastip Albert Ngetroll',
    route: 'Gebang > Perpus ITS',
    closesAt: '19.30',
    eta: '12-18 mnt',
    rating: '4.7',
    status: 'open',
  },
]

const menus = [
  {
    id: 'rock-chicken',
    category: 'Ayam',
    name: 'Rock Chicken',
    stall: 'Rock 2 Sambel Bawang',
    desc: 'Ayam krispi dada dengan sambel bawang',
    price: 13000,
    image: assets.food.rockChicken,
    detailImage: assets.zoomFood.rockChicken,
    jastiperId: 'zakuy',
    stock: 8,
    tag: 'Best seller',
  },
  {
    id: 'ayam-satrio',
    category: 'Ayam',
    name: 'Ayam Kuah Satrio Blukutuk',
    stall: 'Ayam Om Satrio',
    desc: 'Kuah santan panas, gurih, dan kental',
    price: 18000,
    image: assets.food.ayamKuahBlukutuk,
    detailImage: assets.zoomFood.ayamKuahBlukutuk,
    imageClass: 'food-photo-lg',
    jastiperId: 'albert',
    stock: 5,
    tag: 'Masih panas',
  },
  {
    id: 'geprek-labtek',
    category: 'Ayam',
    name: 'Geprek Labtek',
    stall: 'Kantin Mesin',
    desc: 'Geprek pedas buat lanjut nugas',
    price: 14000,
    image: assets.food.geprekLabtek,
    detailImage: assets.zoomFood.geprekLabtek,
    jastiperId: 'zakuy',
    stock: 6,
    tag: 'Foto nanti',
  },
  {
    id: 'nasi-kampus',
    category: 'Nasi',
    name: 'Nasi Ayam Kampus',
    stall: 'Dapur Teknik ITS',
    desc: 'Nasi hangat dengan ayam gurih',
    price: 15000,
    image: assets.food.nasiAyamKampus,
    detailImage: assets.zoomFood.nasiAyamKampus,
    jastiperId: 'syihan',
    stock: 10,
    tag: 'Hemat',
  },
  {
    id: 'nasi-gila',
    category: 'Nasi',
    name: 'Nasi Gila Bundaran',
    stall: 'Warung Bundaran',
    desc: 'Topping rame untuk malam panjang',
    price: 16000,
    image: assets.food.nasiGilaBundaran,
    detailImage: assets.zoomFood.nasiGilaBundaran,
    jastiperId: 'albert',
    stock: 4,
    tag: 'Foto nanti',
  },
  {
    id: 'roti-becek',
    category: 'Roti',
    name: 'Roti Becek Mas Evan',
    stall: 'Roti Becek Mas Evan',
    desc: 'Roti susu kental, manis, lembut',
    price: 10000,
    image: assets.rotiBecek,
    detailImage: assets.zoomFood.rotiBecek,
    jastiperId: 'albert',
    stock: 12,
    tag: '10 ribu',
  },
  {
    id: 'roti-coklat',
    category: 'Roti',
    name: 'Roti Coklat Keju',
    stall: 'Pos Satpam Snack',
    desc: 'Coklat keju lumer',
    price: 12000,
    image: assets.food.rotiCoklatKeju,
    detailImage: assets.zoomFood.rotiCoklatKeju,
    jastiperId: 'syihan',
    stock: 7,
    tag: 'Foto nanti',
  },
]

const categories = [
  { name: 'Semua', emoji: '✨' },
  { name: 'Ayam', emoji: '🍗' },
  { name: 'Nasi', emoji: '🍚' },
  { name: 'Roti', emoji: '🍞' },
]

const vouchers = [
  { id: 'v90a', label: '90% OFF', color: 'green' },
  { id: 'v40', label: '40% OFF', color: 'blue' },
  { id: 'v90b', label: '90% OFF', color: 'yellow' },
  { id: 'v50', label: '50% OFF', color: 'purple' },
]

const rupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`
const getJastiper = (id) => jastipers.find((item) => item.id === id)
const getMenu = (id) => menus.find((item) => item.id === id)
const getCartItems = (cart) =>
  Object.entries(cart)
    .map(([id, qty]) => ({ ...getMenu(id), qty }))
    .filter((item) => item.id)
const getCartSummary = (cart) => {
  const items = getCartItems(cart)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal ? 4000 : 0
  const admin = subtotal ? 2000 : 0

  return {
    items,
    subtotal,
    shipping,
    admin,
    total: subtotal + shipping + admin,
  }
}

function useCountdown(nextRoute, seconds = 10) {
  const navigate = useNavigate()
  const [left, setLeft] = useState(seconds)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLeft((current) => Math.max(0, current - 1))
    }, 1000)
    const timeout = window.setTimeout(() => navigate(nextRoute), seconds * 1000)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [navigate, nextRoute, seconds])

  return left
}

function AppScreen({ children, className = '' }) {
  const childList = Children.toArray(children)
  const navChildren = childList.filter((child) => child.type === BottomNav)
  const overlayChildren = childList.filter((child) => child.props?.className === 'toast-v2')
  const contentChildren = childList.filter(
    (child) => child.type !== BottomNav && child.props?.className !== 'toast-v2',
  )

  return (
    <main className="app-stage">
      <section className={`app-phone ${className} ${navChildren.length ? 'with-bottom-nav' : ''}`}>
        <div className="screen-scroll">{contentChildren}</div>
        {overlayChildren}
        {navChildren}
      </section>
    </main>
  )
}

function BackButton({ to = '/home' }) {
  return (
    <Link to={to} className="back-control" aria-label="Kembali">
      <span>‹</span>
    </Link>
  )
}

function PhotoBox({ src, alt, className = '' }) {
  if (src) {
    return <img className={`photo-box ${className}`.trim()} src={src} alt={alt} />
  }

  return (
    <div className={`photo-box photo-empty ${className}`} aria-label={`${alt} belum ada foto`}>
      <span>Foto</span>
    </div>
  )
}

function Avatar({ src, label }) {
  if (src) {
    return <img className="avatar-img" src={src} alt={label} />
  }

  return <div className="avatar-empty">{label.slice(0, 2).toUpperCase()}</div>
}

function BottomNav({ cartCount }) {
  const location = useLocation()
  const nav = [
    { to: '/home', label: 'Home', icon: assets.home },
    { to: '/activity', label: 'Pesanan', icon: assets.chat },
    { to: '/cart', label: 'Cart', icon: assets.cart, badge: cartCount },
    { to: '/profile', label: 'Profil', icon: assets.profile },
  ]
  const activeIndex = Math.max(
    0,
    nav.findIndex((item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)),
  )

  return (
    <nav className="bottom-nav-v2" style={{ '--active-index': activeIndex }} aria-label="Navigasi utama">
      <span className="nav-slider" />
      {nav.map((item, index) => (
        <Link className={`nav-link-v2 ${index === activeIndex ? 'active' : ''}`} to={item.to} key={item.to}>
          <span className="nav-icon-wrap">
            <img src={item.icon} alt="" />
            {item.badge > 0 && <b>{item.badge}</b>}
          </span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

function MenuCard({ item, onAdd }) {
  const jastiper = getJastiper(item.jastiperId)

  return (
    <article className="menu-card-v2">
      <Link to={`/menu/${item.id}`} className="menu-card-main">
        <span className="menu-chip">{item.tag}</span>
        <PhotoBox src={item.image} alt={item.name} className={item.imageClass || ''} />
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
      </Link>
      <div className="menu-jastiper">
        <Avatar src={jastiper.avatar} label={jastiper.name} />
        <div>
          <strong>{jastiper.name}</strong>
          <span>Tutup {jastiper.closesAt}</span>
        </div>
      </div>
      <div className="menu-card-bottom">
        <strong>{rupiah(item.price)}</strong>
        <span>{item.stock} stok</span>
        <button type="button" onClick={() => onAdd(item.id)} aria-label={`Tambah ${item.name}`}>
          +
        </button>
      </div>
    </article>
  )
}

function HomePage({ cartCount, onAdd }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')
  const [jastiperFilter, setJastiperFilter] = useState('all')
  const [notice, setNotice] = useState('')
  const openJastipers = jastipers.filter((item) => item.status === 'open')

  const visibleMenus = useMemo(() => {
    return menus.filter((menu) => {
      const jastiper = getJastiper(menu.jastiperId)
      const open = jastiper.status === 'open'
      const byCategory = category === 'Semua' || menu.category === category
      const byJastiper = jastiperFilter === 'all' || menu.jastiperId === jastiperFilter
      const bySearch = `${menu.name} ${menu.stall} ${menu.desc} ${jastiper.name}`
        .toLowerCase()
        .includes(query.toLowerCase())

      return open && byCategory && byJastiper && bySearch
    })
  }, [category, jastiperFilter, query])

  function addItem(id) {
    const item = getMenu(id)
    onAdd(id)
    setNotice(`${item.name} masuk cart`)
    window.setTimeout(() => setNotice(''), 1500)
  }

  return (
    <AppScreen className="home-screen has-nav">
      <header className="home-header">
        <div className="home-top">
          <div>
            <span className="eyebrow">Jastip ITS</span>
            <h1>Mau nitip apa hari ini?</h1>
            <p>
              <img src={assets.maps} alt="" />
              {currentUser.location}
            </p>
          </div>
          <Link to="/profile">
            <Avatar src={currentUser.avatar} label={currentUser.name} />
          </Link>
        </div>

        <label className="search-field">
          <img src={assets.search} alt="" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari menu atau jastiper"
          />
        </label>
      </header>

      <section className="open-summary">
        <div>
          <span>Jastip sedang buka</span>
          <strong>{openJastipers.length} jastiper aktif</strong>
        </div>
        <Link to="/activity">Lihat status</Link>
      </section>

      <section className="jastiper-strip" aria-label="Jastiper aktif">
        <button
          className={jastiperFilter === 'all' ? 'active' : ''}
          type="button"
          onClick={() => setJastiperFilter('all')}
        >
          Semua
        </button>
        {openJastipers.map((item) => (
          <button
            key={item.id}
            className={jastiperFilter === item.id ? 'active' : ''}
            type="button"
            onClick={() => setJastiperFilter(item.id)}
          >
            <Avatar src={item.avatar} label={item.name} />
            <span>{item.name}</span>
            <small>Tutup {item.closesAt}</small>
          </button>
        ))}
      </section>

      <section className="home-banner">
        <div>
          <h2>Leaderboard</h2>
          <p>Kamu peringkat 43 minggu ini</p>
          <Link to="/leaderboard">Selengkapnya</Link>
        </div>
        <img src={assets.podium} alt="Leaderboard" />
      </section>

      <section className="category-tabs" aria-label="Kategori menu">
        {categories.map((item) => (
          <button
            key={item.name}
            className={category === item.name ? 'active' : ''}
            type="button"
            onClick={() => setCategory(item.name)}
          >
            <span className="category-emoji" aria-hidden="true">
              {item.emoji}
            </span>
            {item.name}
          </button>
        ))}
      </section>

      <div className="section-heading">
        <h2>Menu dari jastiper aktif</h2>
        <span>{visibleMenus.length} menu</span>
      </div>

      <section className="menu-grid-v2">
        {visibleMenus.map((item) => (
          <MenuCard item={item} onAdd={addItem} key={item.id} />
        ))}
        {visibleMenus.length === 0 && (
          <div className="empty-state">
            <strong>Belum ada menu yang cocok</strong>
            <p>Coba ganti kategori, jastiper, atau kata pencarian.</p>
          </div>
        )}
      </section>

      {notice && <div className="toast-v2">{notice}</div>}
      <BottomNav cartCount={cartCount} />
    </AppScreen>
  )
}

function DetailPage({ onAdd }) {
  const { id } = useParams()
  const item = getMenu(id) || menus[0]
  const jastiper = getJastiper(item.jastiperId)
  const [qty, setQty] = useState(1)

  return (
    <AppScreen className="detail-screen">
      <div className="detail-cover">
        <BackButton />
        <PhotoBox src={item.detailImage || item.image} alt={item.name} className="detail-photo" />
      </div>
      <section className="detail-panel">
        <span className="drag-line" />
        <div className="detail-status">
          <span>Jastip buka sampai {jastiper.closesAt}</span>
          <strong>{jastiper.eta}</strong>
        </div>
        <h1>{item.name}</h1>
        <p>{item.desc}</p>
        <div className="detail-bottom-stack">
          <div className="detail-jastiper">
            <Avatar src={jastiper.avatar} label={jastiper.name} />
            <div>
              <strong>{jastiper.name}</strong>
              <span>{jastiper.route}</span>
            </div>
          </div>
          <div className="detail-actions">
            <div className="stepper">
              <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))}>
                -
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((value) => value + 1)}>
                +
              </button>
            </div>
            <strong>{rupiah(item.price * qty)}</strong>
          </div>
          <Link
            to="/cart"
            className="primary-action"
            onClick={() => {
              for (let index = 0; index < qty; index += 1) onAdd(item.id)
            }}
          >
            Tambah ke cart
          </Link>
        </div>
      </section>
    </AppScreen>
  )
}

function CartPage({ cart, onUpdate, onClear }) {
  const { items: cartItems, subtotal, shipping, admin, total } = getCartSummary(cart)

  return (
    <AppScreen className="cart-screen has-nav">
      <header className="page-header">
        <BackButton to="/home" />
        <div>
          <span>Keranjang</span>
          <h1>Order details</h1>
        </div>
      </header>

      <section className="cart-list">
        {cartItems.map((item) => {
          const jastiper = getJastiper(item.jastiperId)
          return (
            <article className="cart-item" key={item.id}>
              <PhotoBox src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{jastiper.name}</p>
                <strong>{rupiah(item.price)}</strong>
              </div>
              <div className="mini-stepper">
                <button type="button" onClick={() => onUpdate(item.id, -1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => onUpdate(item.id, 1)}>
                  +
                </button>
              </div>
            </article>
          )
        })}

        {cartItems.length === 0 && (
          <div className="empty-state">
            <strong>Cart masih kosong</strong>
            <p>Pilih menu dari jastiper aktif terlebih dahulu.</p>
            <Link to="/home">Cari menu</Link>
          </div>
        )}
      </section>

      <section className="checkout-panel">
        <div>
          <span>Sub-total</span>
          <strong>{rupiah(subtotal)}</strong>
        </div>
        <div>
          <span>Ongkir</span>
          <strong>{rupiah(shipping)}</strong>
        </div>
        <div>
          <span>Admin</span>
          <strong>{rupiah(admin)}</strong>
        </div>
        <div className="total">
          <span>Total</span>
          <strong>{rupiah(total)}</strong>
        </div>
        <Link to={cartItems.length ? '/payment/qris' : '/home'} className="checkout-button">
          {cartItems.length ? 'Bayar menggunakan QRIS' : 'Pilih menu dulu'}
        </Link>
        {cartItems.length > 0 && (
          <button type="button" className="clear-cart" onClick={onClear}>
            Kosongkan cart
          </button>
        )}
      </section>
      <BottomNav cartCount={cartItems.reduce((sum, item) => sum + item.qty, 0)} />
    </AppScreen>
  )
}

function PaymentPage({
  cart = {},
  amount,
  backTo = '/cart',
  nextTo = '/waiting',
  primaryText = 'Unduh QR code',
  secondaryText = 'Bagikan QR Code',
}) {
  const left = useCountdown(nextTo, 10)
  const { total } = getCartSummary(cart)
  const paymentTotal = amount ?? (total || 27000)

  return (
    <AppScreen className="payment-screen">
      <div className="payment-pattern" aria-hidden="true" />
      <BackButton to={backTo} />
      <h1>Payment Methode</h1>
      <h2>QRIS</h2>
      <section className="qr-shell">
        <p>Scan atau unduh QR code</p>
        <img className="qris-logo-img" src={assets.qrisText} alt="QRIS" />
        <img className="qr-code-img" src={assets.paymentQr} alt="QR code pembayaran" />
      </section>
      <div className="count-card">
        <span>Selesaikan pembayaran dalam</span>
        <strong>00:00:{String(left).padStart(2, '0')}</strong>
        <i style={{ width: `${left * 10}%` }} />
      </div>
      <div className="payment-total">
        <span>Total Pembayaran</span>
        <strong>{rupiah(paymentTotal)}</strong>
      </div>
      <Link to={nextTo} className="primary-action">
        {primaryText}
      </Link>
      <Link to={nextTo} className="plain-action payment-share">
        {secondaryText}
      </Link>
    </AppScreen>
  )
}

function MembershipPaymentPage() {
  const location = useLocation()
  const plan = new URLSearchParams(location.search).get('plan')
  const amount = plan === 'monthly' ? 20000 : 200000

  return (
    <PaymentPage
      amount={amount}
      backTo="/membership"
      nextTo="/profile"
      primaryText="Aktifkan membership"
      secondaryText="Kembali ke profil"
    />
  )
}

function WaitingPage() {
  const left = useCountdown('/finish-order', 10)
  const progress = 100 - left * 10

  return (
    <AppScreen className="waiting-screen">
      <div className="map-layer">
        <BackButton to="/activity" />
        <Link className="map-chat" to="/chat-driver">
          Chat
        </Link>
        <div className="map-status">Jastiper sedang menuju lokasi</div>
        <div className="destination-pin" />
        <div className="courier-pin" style={{ left: `${18 + progress * 0.58}%` }} />
      </div>
      <section className="driver-sheet">
        <div className="driver-profile">
          <Avatar label="Jastip Zakuy Playboy" />
          <div>
            <strong>Jastip Zakuy Playboy</strong>
            <span>Estimasi tiba {left} detik</span>
          </div>
          <b>4.9</b>
        </div>
        <div className="delivery-track">
          <span className="done">Dibayar</span>
          <span className={progress > 35 ? 'done' : ''}>Diambil</span>
          <span className={progress > 72 ? 'done' : ''}>Diantar</span>
        </div>
        <Link to="/chat-driver" className="sheet-button">
          Chat jastiper
        </Link>
        <Link to="/finish-order" className="sheet-button secondary">
          Pesanan diterima
        </Link>
      </section>
    </AppScreen>
  )
}

function ActivityPage({ cartCount }) {
  return (
    <AppScreen className="activity-screen has-nav">
      <header className="page-header no-back">
        <div>
          <span>Pesanan</span>
          <h1>Status jastip</h1>
        </div>
      </header>
      <section className="active-order-card">
        <span className="live-dot">Live</span>
        <h2>Belum ada pesanan aktif</h2>
        <p>Setelah bayar, status pengantaran dan chat jastiper akan muncul di sini.</p>
        <Link to="/home">Cari menu</Link>
      </section>
      <section className="history-list">
        <h2>Riwayat</h2>
        <article>
          <PhotoBox src={assets.rotiBecek} alt="Roti Becek Mas Evan" />
          <div>
            <strong>Roti Becek Mas Evan</strong>
            <span><br />Selesai kemarin</span>
          </div>
          <b>Rp 10.000</b>
        </article>
      </section>
      <BottomNav cartCount={cartCount} />
    </AppScreen>
  )
}

function ChatPage() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([
    { from: 'driver', text: 'Halooo, pesanannya sudah sesuai aplikasi ya?' },
    { from: 'me', text: 'Iya, ditunggu ya' },
    { from: 'driver', text: 'Siap. Saya sedang meluncur ke lokasi.' },
  ])

  function send() {
    const value = text.trim()
    if (!value) return
    setMessages((current) => [...current, { from: 'me', text: value }])
    setText('')
  }

  return (
    <AppScreen className="chat-screen">
      <header className="page-header">
        <BackButton to="/waiting" />
        <div>
          <span>Chat</span>
          <h1>Jastip Zakuy</h1>
        </div>
      </header>
      <section className="chat-list">
        {messages.map((item, index) => (
          <p className={item.from === 'me' ? 'me' : 'driver'} key={`${item.text}-${index}`}>
            {item.text}
          </p>
        ))}
        <span className="typing-bubble">Jastiper typing...</span>
      </section>
      <footer className="message-box">
        <button type="button">+</button>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') send()
          }}
          placeholder="Tulis pesan"
        />
        <button type="button" onClick={send}>
          Kirim
        </button>
      </footer>
    </AppScreen>
  )
}

function FinishPage() {
  const [rating, setRating] = useState(4)
  const [done, setDone] = useState(false)
  const [feedback, setFeedback] = useState('')

  return (
    <AppScreen className="finish-screen">
      <div className="finish-pattern" aria-hidden="true" />
      <span className="finish-dot dot-one" aria-hidden="true" />
      <span className="finish-dot dot-two" aria-hidden="true" />
      <span className="finish-dot dot-three" aria-hidden="true" />
      <span className="finish-dot dot-four" aria-hidden="true" />

      <section className="finish-content">
        <div className="success-mark">✓</div>
        <h1>
          Thank You!
          <span>Order Completed</span>
        </h1>
        <p>Please rate your last Driver</p>
        <div className="rating-row" aria-label="Rating pesanan">
          {[1, 2, 3, 4, 5].map((item) => (
            <button
              key={item}
              className={item <= rating ? 'active' : ''}
              type="button"
              onClick={() => setRating(item)}
              aria-label={`${item} bintang`}
            >
              ★
            </button>
          ))}
        </div>
      </section>

      <section className="finish-actions">
        <label className="feedback-field">
          <span>□</span>
          <input
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder={done ? 'Rating tersimpan. Terima kasih.' : 'Leave feedback'}
          />
        </label>
        <div className="finish-buttons">
          <Link className="primary-action" to="/home" onClick={() => setDone(true)}>
            Submit
          </Link>
          <Link to="/home" className="plain-action">
            Skip
          </Link>
        </div>
      </section>
    </AppScreen>
  )
}

function VoucherPage({ cartCount }) {
  const [used, setUsed] = useState(() => new Set())

  return (
    <AppScreen className="voucher-screen has-nav">
      <header className="profile-hero">
        <BackButton to="/profile" />
        <Avatar src={currentUser.avatar} label={currentUser.name} />
        <h1>Voucher Diskon</h1>
        <p>Pilih voucher sebelum checkout.</p>
      </header>
      <section className="voucher-grid-v2">
        {vouchers.map((item) => (
          <button
            key={item.id}
            className={`voucher-ticket ${item.color} ${used.has(item.id) ? 'used' : ''}`}
            type="button"
            onClick={() =>
              setUsed((current) => {
                const next = new Set(current)
                next.add(item.id)
                return next
              })
            }
          >
            <strong>{item.label}</strong>
            <span>{used.has(item.id) ? 'Dipakai' : 'Redeem'}</span>
          </button>
        ))}
      </section>
      <Link to="/cart" className="primary-action in-page">
        Pakai di cart
      </Link>
      <BottomNav cartCount={cartCount} />
    </AppScreen>
  )
}

function ProfilePage({ cartCount }) {
  return (
    <AppScreen className="profile-screen has-nav">
      <section className="profile-hero">
        <Avatar src={currentUser.avatar} label={currentUser.name} />
        <h1>{currentUser.name}</h1>
        <p>{currentUser.status}</p>
      </section>
      <section className="profile-stats">
        <div>
          <strong>43</strong>
          <span>Rank</span>
        </div>
        <div>
          <strong>12</strong>
          <span>Order</span>
        </div>
        <div>
          <strong>4</strong>
          <span>Voucher</span>
        </div>
      </section>
      <section className="profile-menu">
        <Link to="/membership">Membership JastipITS</Link>
        <Link to="/voucher">Voucher diskon</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/activity">Riwayat pesanan</Link>
      </section>
      <BottomNav cartCount={cartCount} />
    </AppScreen>
  )
}

function MembershipPage() {
  const [plan, setPlan] = useState('annual')

  return (
    <AppScreen className="membership-screen">
      <BackButton to="/profile" />
      <header>
        <span>JastipITS Plus</span>
        <h1>Daftar Membership</h1>
        <p>Dapatkan diskon admin dan prioritas jastiper aktif.</p>
      </header>
      <section className="plan-cards">
        <button className={plan === 'annual' ? 'active' : ''} type="button" onClick={() => setPlan('annual')}>
          <span>Annual Plans</span>
          <b>Diskon 20%</b>
          <strong>Rp200.000/thn</strong>
          <del>Rp250.000</del>
        </button>
        <button className={plan === 'monthly' ? 'active' : ''} type="button" onClick={() => setPlan('monthly')}>
          <span>Monthly Plans</span>
          <strong>Rp20.000/bln</strong>
          <small>Bisa batal kapan saja</small>
        </button>
      </section>
      <Link to={`/payment/membership?plan=${plan}`} className="primary-action">
        Daftar sekarang
      </Link>
      <Link to="/profile" className="plain-action">
        Batal
      </Link>
    </AppScreen>
  )
}

function LeaderboardPage({ cartCount }) {
  const [range, setRange] = useState('Mingguan')
  const ranks = {
    Mingguan: [
      ['Alibert My ...', '3000'],
      ['Syihan ...', '2500'],
      ['Fahmuy ...', '2400'],
      ['Satrio Pacarnya Keisya', '2255'],
      ['Rafi Teknik Sipil', '2180'],
      ['Dina Statistika', '2040'],
      ['Evan GantengZ', '1988'],
    ],
    Bulanan: [
      ['Naufal Elektro', '9200'],
      ['Alibert My ...', '8900'],
      ['Keisya Despro', '8400'],
      ['Satrio Pacarnya Keisya', '8000'],
      ['Evan GantengZ', '7900'],
      ['Dina Statistika', '7550'],
      ['Rafi Teknik Sipil', '7300'],
    ],
  }
  const activeRanks = ranks[range]

  return (
    <AppScreen className="leaderboard-screen has-nav">
      <header className="page-header">
        <BackButton to="/home" />
        <div>
          <span>Komunitas</span>
          <h1>Leaderboard</h1>
        </div>
      </header>
      <div className="segmented">
        {Object.keys(ranks).map((item) => (
          <button
            className={range === item ? 'active' : ''}
            type="button"
            onClick={() => setRange(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="podium-card">
        {activeRanks.slice(0, 3).map(([name, score], index) => (
          <div key={name} className={index === 0 ? 'winner' : ''}>
            <Avatar label={name} />
            <b>{index + 1}</b>
            <strong>{name}</strong>
            <span>{score}</span>
          </div>
        ))}
      </section>
      <section className="rank-list-v2">
        {activeRanks.slice(3).map(([name, score], index) => (
          <article key={name}>
            <b>{index + 4}</b>
            <Avatar label={name} />
            <span>{name}</span>
            <strong>{score}</strong>
          </article>
        ))}
      </section>
      <BottomNav cartCount={cartCount} />
    </AppScreen>
  )
}

function NotFoundPage() {
  return (
    <AppScreen className="empty-screen">
      <h1>JastipITS</h1>
      <p>Halaman tidak ditemukan.</p>
      <Link to="/home" className="primary-action">
        Kembali ke home
      </Link>
    </AppScreen>
  )
}

function AppRoutes() {
  const [cart, setCart] = useState({})
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  function addToCart(id) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  }

  function updateCart(id, delta) {
    setCart((current) => {
      const nextQty = (current[id] || 0) + delta
      const next = { ...current }
      if (nextQty <= 0) delete next[id]
      else next[id] = nextQty
      return next
    })
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage cartCount={cartCount} onAdd={addToCart} />} />
      <Route path="/menu/:id" element={<DetailPage onAdd={addToCart} />} />
      <Route path="/detail-menu" element={<Navigate to="/menu/ayam-satrio" replace />} />
      <Route
        path="/cart"
        element={<CartPage cart={cart} onUpdate={updateCart} onClear={() => setCart({})} />}
      />
      <Route
        path="/order-details"
        element={<CartPage cart={cart} onUpdate={updateCart} onClear={() => setCart({})} />}
      />
      <Route path="/payment/qris" element={<PaymentPage cart={cart} />} />
      <Route path="/payment/membership" element={<MembershipPaymentPage />} />
      <Route path="/waiting" element={<WaitingPage />} />
      <Route path="/menunggu-pesanan" element={<Navigate to="/waiting" replace />} />
      <Route path="/activity" element={<ActivityPage cartCount={cartCount} />} />
      <Route path="/chat-driver" element={<ChatPage />} />
      <Route path="/finish-order" element={<FinishPage />} />
      <Route path="/voucher" element={<VoucherPage cartCount={cartCount} />} />
      <Route path="/profile" element={<ProfilePage cartCount={cartCount} />} />
      <Route path="/membership" element={<MembershipPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage cartCount={cartCount} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  )
}

export default App

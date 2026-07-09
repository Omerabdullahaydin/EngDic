# 📖 EngDic - İngilizce/Türkçe Sözlük & Kelime Takip API'si

Bu proje; kullanıcıların kendi kişisel İngilizce-Türkçe sözlüklerini oluşturmalarına, kelime aramalarına ve kelime dağarcıklarını geliştirmelerine olanak tanıyan, RESTful mimariyle tasarlanmış modern bir **Backend API** çalışmasıdır. 

Proje, arayüz (Frontend) katmanından tamamen bağımsız (**Pure API**) olarak geliştirilmiştir. Bu sayede ileride geliştirilecek web veya mobil arayüzler, mevcut backend mimarisine dokunmadan bu servisi doğrudan tüketebilir.

---

## 🏗️ Sistem Mimarisi & Teknolojiler
* **Runtime Environment:** Node.js
* **Web Framework:** Express.js
* **Database:** PostgreSQL (Dockerized / Local)
* **Veritabanı Sürücüsü:** `pg` (Node-Postgres Pool)
* **Güvenlik & Şifreleme:** Bcrypt (10 Salt Rounds)
* **Ortam Değişkenleri:** Dotenv

---

## 🗄️ Veritabanı Şeması (Database Schema)
Uygulama ayağa kalktığı anda PostgreSQL üzerinde gerekli tabloları otomatik olarak kontrol eder ve yoksa oluşturur (`userModel.js`).

### 1. `users` Tablosu
Kullanıcı kayıt ve giriş bilgilerini güvenli bir şekilde saklar.
* `id`: SERIAL (Primary Key)
* `first_name`: VARCHAR(100) NOT NULL
* `last_name`: VARCHAR(100) NOT NULL
* `email`: VARCHAR(150) UNIQUE NOT NULL (Aynı e-posta ile tekrar kayıt olunamaz)
* `password`: VARCHAR(255) NOT NULL (Bcrypt ile hash'lenmiş şifre)
* `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### 2. `words` Tablosu
Sözlükteki kelimeleri ve anlamlarını tutar.
* `id`: SERIAL (Primary Key)
* `word`: VARCHAR(100) NOT NULL
* `meaning`: TEXT NOT NULL
* `user_id`: INT (Foreign Key - `users.id` bağlantılı)

---

## 🚀 API Endpoint'leri ve Kullanım Kılavuzu

### 👥 1. Kimlik Doğrulama & Kullanıcı İşlemleri (`/api/auth`)
| Metot | Endpoint | Açıklama | Request Body (JSON) | Durum |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | Yeni kullanıcı kaydı oluşturur. Şifreyi hash'leyerek kaydeder. | `{"first_name": "...", "last_name": "...", "email": "...", "password": "..."}` | ✅ Tamamlandı |
| `POST` | `/login` | Kullanıcı girişi sağlar ve oturum (Session/Token) başlatır. | `{"email": "...", "password": "..."}` | ⏳ Sırada |

### 📝 2. Sözlük & Kelime İşlemleri (`/api/words`)
| Metot | Endpoint | Açıklama | Request Body / Query | Durum |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Kullanıcının sözlüğüne yeni kelime ekler. | `{"word": "...", "meaning": "..."}` | ✅ Tamamlandı |
| `GET` | `/` | Kelime arama yapar veya tüm kelimeleri listeler. | `?search=kelime_adi` | ✅ Tamamlandı |

---

## 🎨 Gelecek Planı: AI Güdümlü Ön Yüz (Frontend) Entegrasyonu
Backend servisinin sunduğu ham verileri (`JSON`) son kullanıcıya şık ve etkileşimli bir şekilde sunmak adına, projenin bir sonraki fazında **AI yardımıyla kodlama yükü olmadan** bir arayüz inşa edilecektir.

### 🌟 Kullanıcı Dostu (UX/UI) Tasarım Prensipleri
1. **Separation of Concerns (Ayrık Klasörleme):** Ön yüz kodları, backend projesinin içine (`/public` klasörüne) veya tamamen bağımsız bir repoya konumlandırılarak kod çakışmaları %0'a indirilecektir.
2. **Akıllı Arama (Debouncing):** Kullanıcı arama çubuğuna yazarken her harfte veritabanına istek atılmayacak; yazma bittikten 300ms sonra otomatik tetiklenen akıcı bir arama motoru kurulacaktır.
3. **Anlık Form Validasyonu:** Alanların boş bırakılması gibi durumlar daha istek backend'e gitmeden ön yüzde yakalanacak, böylece sunucu trafiği optimize edilecektir.
4. **Şık Hata Yönetimi (Toast Notifications):** Backend'den dönen `400 (Zaten kayıtlı)` veya `500 (Sunucu hatası)` gibi çiğ hata mesajları, kullanıcıya rehberlik eden modern uyarı balonları ile gösterilecektir.
5. **Modern Arayüz (SPA):** Tailwind CSS kütüphanesi kullanılarak, göz yormayan modern ve koyu tema (Dark Mode) destekli tek sayfalık bir web uygulaması oluşturulacaktır.

---

## 🛠️ Kurulum ve Çalıştırma

1. Projeyi klonlayın ve bağımlılıkları yükleyin:
   ```bash
   npm install

Kök dizinde .env dosyasını oluşturun ve PostgreSQL bağlantı bilgilerinizi girin:
   PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=eng_dic
DB_PORT=5432

Uygulamayı başlatın:
npm start
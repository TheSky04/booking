# Booking App

## Proje Hakkında
Booking App, kullanıcıların kitap ödünç alıp iade edebildiği bir React + Node.js + MySQL uygulamasıdır. Bu proje, basit bir rezervasyon uygulaması örneği olarak tasarlanmıştır.

## Kurulum Adımları

### Gereksinimler
- **Node.js** (v14+ önerilir)
- **npm** veya **yarn**
- **MySQL** veritabanı
- **Prisma CLI** (`npm install -g prisma`)

### Adım 1: Projeyi Klonlayın
```bash
git clone https://github.com/TheSky04/booking.git
cd booking
```

### Adım 2: Bağımlılıkları Kurun
```bash
npm install
# veya
yarn install
```

### Adım 3: Veritabanını Ayarlayın
1. **MySQL** üzerinde bir veritabanı oluşturun:
   ```sql
   CREATE DATABASE bookingdb;
   ```

2. **.env** dosyasını oluşturun ve aşağıdaki gibi yapılandırın:
   ```env
   DATABASE_URL="mysql://root:ornek123456@localhost:3306/bookingdb"
   ```

### Adım 4: Prisma Migrate Çalıştırın
```bash
npx prisma migrate dev --name init
```

### Adım 5: Sunucuyu Başlatın
```bash
npm run dev
# veya
yarn dev
```

### Adım 6: Frontend'i Başlatın
Frontend klasörüne giderek:
```bash
cd frontend
npm start
# veya
yarn start
```

## Kullanım
Uygulamayı yerel ortamda başlattıktan sonra, tarayıcınızda http://localhost:5173 adresine giderek uygulamayı kullanabilirsiniz.

## Önemli Komutlar
- **Veritabanı migrasyonlarını çalıştır**:
  ```bash
  npx prisma migrate dev --name migration_name
  ```
- **Prisma şemasını veritabanına yansıt**:
  ```bash
  npx prisma db push
  ```

## API Dökümantasyonu
API uç noktalarını incelemek için `http://localhost:3000` adresinde çalışan backend'i kontrol edebilirsiniz. Örnek API uç noktaları şunlardır:
- `GET /users`: Kullanıcıları getirir.
- `GET /books`: Tüm kitapları getirir.
- `POST /users/:id/borrow/:bookId`: Belirtilen kullanıcının bir kitabı ödünç almasını sağlar.
- `POST /users/:id/return/:bookId`: Kullanıcının ödünç aldığı kitabı iade eder.

## Katkıda Bulunma
Katkıda bulunmak isterseniz, lütfen önce bir **pull request** açın. Her katkı, projeyi daha iyi hale getirecek!

## Lisans
Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

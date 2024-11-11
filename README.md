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
C:\Users\Furkan\desktop> dizinine gelin ve aşağıdaki komutu uygulayın.
```bash
git clone https://github.com/TheSky04/booking.git
cd booking
```

### Adım 2: MySQL Veritabanını Kurun
Booking App'in çalışabilmesi için bir MySQL veritabanına ihtiyaç vardır. Eğer MySQL kurulu değilse, lütfen [MySQL'i buradan indirin](https://dev.mysql.com/downloads/installer/). Kurulumdan sonra veritabanını aşağıdaki adımları izleyerek ayarlayın:


1- MySQL'e giriş yapın:

```bash
mysql -u root -p
```

2- Yeni bir veritabanı oluşturun:

```sql
CREATE DATABASE bookingdb;
```

3- booking-backend klasörü içerisinde **.env** dosyasını oluşturun ve aşağıdaki gibi yapılandırın:

```env
DATABASE_URL="mysql://root:ornek123456@.@localhost:3306/bookingdb"
```

### Adım 3: Backendi Kurun
cd booking-backend dizinine gelin ve aşağıdaki gibi node_modules klasörünü ilgili dosyaya indirin.

```bash
C:\Users\Furkan\Desktop\booking\booking-backend> npm install
```
ardından npm run migrate diyerek Prisma veritabanı şemasını güncelleyin.

```bash
C:\Users\Furkan\Desktop\booking\booking-backend> npm run migrate
```

ardından aşağıdaki komutu uygulayarak backendi çalıştırın.

```bash
C:\Users\Furkan\Desktop\booking\booking-backend> npm run dev
```

### Adım 4: Frontendi Kurun

Mevcut terminali kapatmayın ve yeni bir terminal açın ve aşağıdaki işlemleri uygulayın.
C:\Users\Furkan\Desktop\booking\booking-frontend\booking> dizinine gelin ve aşağıdaki komutları sırayla uygulayın.

```bash
C:\Users\Furkan\Desktop\booking\booking-frontend\booking> npm install
```
ardından

```bash
C:\Users\Furkan\Desktop\booking\booking-frontend\booking> npm run dev
```

## Kullanım
Uygulamayı başlattıktan sonra, tarayıcınızda http://localhost:5173 adresine giderek frontend'i kontrol edebilir, backend'e ise http://localhost:3000 adresinden ulaşabilirsiniz.

## API Dökümantasyonu
API uç noktalarını incelemek için `http://localhost:3000` adresinde çalışan backend'i kontrol edebilirsiniz. Örnek API uç noktaları şunlardır:
- `GET /users`: Kullanıcıları getirir.
- `GET /users/1`: Id'ye sahip kullanıcıları getirir.
- `GET /books`: Tüm kitapları getirir.
- `GET /books/3`: Id'ye sahip tüm kitapları getirir.
- `POST /users/:id/borrow/:bookId`: Belirtilen kullanıcının bir kitabı ödünç almasını sağlar.
- `POST /users/:id/return/:bookId`: Kullanıcının ödünç aldığı kitabı iade eder.

## Katkıda Bulunma
Katkıda bulunmak isterseniz, lütfen önce bir **pull request** açın. Her katkı, projeyi daha iyi hale getirecek!

## Lisans
Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

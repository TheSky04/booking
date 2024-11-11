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
Booking App'in çalışabilmesi için bir MySQL veritabanına ihtiyaç vardır. Eğer MySQL kurulu değilse, lütfen [MySQL'i buradan indirin](https://dev.mysql.com/downloads/). Verilen MySQL adresinden MySQL Community Server ve MySQL Workbench'i indirin. Kurulumdan sonra veritabanını aşağıdaki adımları izleyerek ayarlayın:


1- MySQL'e giriş yapın:

```bash
mysql -u root -p
```

2- Yeni bir veritabanı oluşturun:

```sql
CREATE DATABASE bookingdb;
```

### Adım 3: .env Dosyasının Oluşturulması ve Yapılandırılması
Projenin arka ucunun çalışabilmesi için veritabanı bağlantı bilgilerinin .env dosyasına eklenmesi gerekmektedir. Aşağıdaki adımları izleyerek .env dosyasını oluşturun ve doğru bilgilerle yapılandırın:

1. booking-backend klasöründe bir .env dosyası oluşturun.

2. .env dosyasına aşağıdaki gibi bir yapı ekleyin:

```env
DATABASE_URL="mysql://<DB_USER>:<DB_PASSWORD>@localhost:3306/bookingdb"
```

3.<DB_USER> ve <DB_PASSWORD> alanlarını kendi MySQL kullanıcı adı ve şifreniz ile değiştirin:

4. örnek olarak: DATABASE_URL="mysql://root:ornek123456@localhost:3306/bookingdb"

5. .env dosyasını kaydedin. Bu dosya, proje çalıştığında veritabanı bağlantısı için kullanılacaktır.

### Adım 4: Backendi Kurun
cd booking-backend dizinine gelin ve aşağıdaki gibi node_modules klasörünü ilgili dosyaya indirin.

```bash
C:\Users\Furkan\Desktop\booking\booking-backend> npm install
```
ardından npm run migrate diyerek Prisma veritabanı şemasını güncelleyin.

```bash
C:\Users\Furkan\Desktop\booking\booking-backend> npm run migrate
```

Veritabanına başlangıç verilerini eklemek için npm run seed komutunu çalıştırın:

```bash
C:\Users\Furkan\Desktop\booking\booking-backend> npm run seed
```

ardından aşağıdaki komutu uygulayarak backendi çalıştırın.

```bash
C:\Users\Furkan\Desktop\booking\booking-backend> npm run dev
```

Mevcut terminali kapatmayın ve bundan sonraki işlemlere yeni terminalde devam edin.

### Adım 5: Frontendi Kurun

yeni bir terminal açın ve aşağıdaki işlemleri uygulayın.
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

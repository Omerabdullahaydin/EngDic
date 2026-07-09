// Veritabanı bağlantı havuzunu (pool) konfigürasyon dosyamızdan çekiyoruz
const {pool} = require("../config/db");

// Veritabanında kullanıcılar tablosunu asenkron olarak oluşturan fonksiyon
const createUsersTable = async () => {
        const queryUsers = `CREATE TABLE IF NOT EXISTS users(
           id SERIAL PRIMARY KEY,
           email VARCHAR(255) UNIQUE NOT NULL,
           password TEXT NOT NULL,
           first_name VARCHAR(255) NOT NULL,
           last_name VARCHAR(255) NOT NULL
           ); `
        ;


    try {
        // Hazırladığımız sorguyu veritabanı havuzuna gönderip çalıştırıyoruz
        await pool.query(queryUsers)
        console.log("Kullanici Tablosu olusturuldu.")
    }
    catch(err){
        // Olası bir SQL hatasında terminale detayı basıp hatayı yukarı fırlatıyoruz
        console.error("Kullanici Tablosu oluşturulamadi"+ err);
        throw err;
    }
}
// Yazdığımız bu fonksiyonu diğer dosyalarda (örneğin app.js veya server.js) çağırabilmek için ihraç ediyoruz
module.exports = {createUsersTable}
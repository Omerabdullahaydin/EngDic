const {pool} = require("../config/db");
const bcrypt = require("bcrypt");

//Kayıt yapan kullanıcın verilerini çektiğimiz ve kontrol ettiğimiz yer

const register = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    try{
    if(!first_name || !last_name || !email || !password){
        return res.status(400).json("boş alan birakmayiniz");
    }

    const db_email = "SELECT * FROM users WHERE email = $1"

    const userCheck = await pool.query(db_email,[email])

    if(userCheck.rows.length > 0){
        return res.status(400).json("Bu e-posta zaten kayıtlı");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const insertQuery = `INSERT INTO users(first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4) 
    `;

    const values = [first_name, last_name, email, hashedPassword]

    await pool.query(insertQuery, values)
    return res.status(201).json("Basarili bir sekilde kullanici eklendi");
}
    catch{
        return res.status(500).json("Kullanici eklenemedi");
    }
}

// Kullanıcı giriş (Login) işlemlerini yürüten controller fonksiyonu
const login = async (req, res) =>{
    // Mobil uygulamadan (istemciden) gelen e-posta ve şifre bilgilerini gövdeden (body) ayıklıyoruz
    const {email, password} = req.body

    try {
        //E-posta kontrolü için güvenli, parametrik SQL sorgumuzu hazırlıyoruz
        const sorgu = "SELECT * FROM users WHERE email = $1"
        // Mobil uygulamadan (istemciden) gelen e-posta ve şifre bilgilerini gövdeden (body) ayıklıyoruz
        const sonuclar = await pool.query(sorgu,[email])

        if (sonuclar.rows.length === 0){
            return res.status(400).json("E-postanizi bos veya hatali girdiniz");
        }else if ( !await bcrypt.compare(password,sonuclar.rows[0].password)){
            return res.status(400).json("E-postanizi bos veya hatali girdiniz");
        }
        return res.status(200).json({
            message: "Giriş Yapıldı",
            kullanici: {
                id: sonuclar.rows[0].id,
                adi: sonuclar.rows[0].first_name,
                email: sonuclar.rows[0].email
            }
        });
    }
    catch(err) {
        // Veritabanı kesintisi veya beklenmedik kod hatalarında sunucu çökmesin diye hatayı yakalayıp 500 dönüyoruz
        return res.status(500).json("Giris Yapilamadi");
    }
}

module.exports = {register, login}

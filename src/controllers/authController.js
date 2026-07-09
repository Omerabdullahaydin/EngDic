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

module.exports = {register}

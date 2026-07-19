const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const headers = req.headers["authorization"]
    const token = headers && headers.split[1];

    if (!token){
        return res.status(401).json("Yetkisiz Giriş")
    }

    try {
        const verified = jwt.verify(token, "Omer.baba5654")
        req.user = verified
        next();
    }
    catch(err){
        return res.status(400).json("Geçersiz Giriş")
    }
}

module.exports = {authMiddleware}
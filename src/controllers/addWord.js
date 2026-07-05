const {pool} = require("../config/db");
const {fetchWordDetails} = require("../services/dictionaryServices");

const getAllWords = async (req, res) => {
    const queryText = "SELECT * FROM word ORDER BY created_at DESC;";

    try {
        const result = await pool.query(queryText);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching word:", error);
        res.status(500).json({ message: "Error fetching word" });
    }
};

const addWord = async (req, res) => {
    const {english_word} = req.body;
    if (!english_word) {
        return res.status(400).json({ message: "English word is required" });
    }

    try {
    const wordDetails = await fetchWordDetails(english_word);

    const querytext = `INSERT INTO word (english_word, turkish_word, sample_sentence, sentence_translation) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;

    const values = [
        wordDetails.english,
        wordDetails.definition,
        wordDetails.sample_sentence,
        null
    ];

    const result = await pool.query(querytext, values);
    return res.status(201).json(result.rows[0]).json({ message: "Word added successfully" });

    }
    catch (error) {
        console.error("Error adding word:", error);
        return res.status(500).json({ message: "Error adding word" });
    }

};

module.exports = {
    getAllWords,
    addWord
};
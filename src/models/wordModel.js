const {pool} = require("../config/db");

const getAllWords = async () => { 
        const queryText = `CREATE TABLE IF NOT EXISTS  word(
            id SERIAL PRIMARY KEY,
            english_word VARCHAR(255) NOT NULL,
            turkish_word VARCHAR(255) NOT NULL,
            sample_sentence TEXT,
            sentence_translation TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
            

    try {
        await pool.query(queryText);
        console.log('Word table created successfully');
    } catch (error) {
        console.error('Error creating word table:', error);
        throw error;
    }

}

module.exports = {getAllWords};
exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS models (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      context_length INTEGER NOT NULL,
      tokenizer VARCHAR(255) NOT NULL,
      modality VARCHAR(255) NOT NULL
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql('DROP TABLE IF EXISTS models;');
};

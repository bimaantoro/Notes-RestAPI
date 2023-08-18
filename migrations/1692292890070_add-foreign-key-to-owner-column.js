/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.sql("INSERT INTO users VALUES ('old-notes', 'old-notes', 'old-notes', 'old-notes')");

  pgm.sql("UPDATE notes SET owner = 'old-notes' WHERE owner IS NULL");

  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old-notes'");

  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};

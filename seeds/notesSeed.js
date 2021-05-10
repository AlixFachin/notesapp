const firstNotes = [
  { message: "This is the body of my first message ", summary: "First"},
  { message: "This is the body of my second message ", summary: "Second"},
  { message: "This is the body of my third message ", summary: "Third"},
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(() => knex('notes').insert(firstNotes))
    .catch((err) => console.log(err));
};

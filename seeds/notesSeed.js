const firstNotes = [
  { id:1 , message: "This is the body of my first message ", summary: "First"},
  { id:2, message: "This is the body of my second message ", summary: "Second"},
  { id:3, message: "This is the body of my third message ", summary: "Third"},
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(() => knex('notes').insert(firstNotes))
    .catch((err) => console.log(err));
};

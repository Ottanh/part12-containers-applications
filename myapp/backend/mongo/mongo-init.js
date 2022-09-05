/* eslint-disable no-undef */
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})

db.createCollection('people')

db.people.insert({ name: 'eka', number: 1 })
db.people.insert({ name: 'toka', number: 2 })
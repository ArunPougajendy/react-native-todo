module.exports = {
  development: {
    url: 'mongodb://localhost:27017',
    options: {
      dbName: 'toDo-List',
      user: '',
      pass: '',
      authSource: 'admin',
      useNewUrlParser: true,
    },
  },
};

const { client, index, type } = require("../elasticsearch/connection");

const searchName = (term, offset = 0) => {
  const body = {
    from: offset,
    query: {
      match: {
        name: {
          query: term
        }
      }
    },
    highlight: { fields: { name: {} } }
  };

  return client.search({ index, type, body, size: 10 });
};


module.exports = {
  searchName
}
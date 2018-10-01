const { client, index, type } = require("../elasticsearch/connection");
// GET /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false
const demoQuery = (term, offset = 0) => {
  console.log("TERM: ", term)
  const body = {
    from: offset,
    query: {
      bool: {
        should: [
          { match: { age: { query: term.age || "", boost: 2 } } },
          { match: { latitude: term.latitude || "" } },
          { match: { longitude: term.longitude  || ""} },
          { match: { monthlyIncome: term.monthlyIncome || "" } },
          { match: { experienced: term.experienced || ""} }
        ]
      }
    },
    highlight: { fields: { name: {} } }
  };

  return client.search({ index, type, body, size: 100 });
};

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

  return client.search({ index, type, body, size: 100 });
};

const dynamicQuery = (term, offset = 0) => {
  let type = "name";
  const body = `from: offset,
    query: {
      match: {
        ${type}: {
          query: ${term}
        }
      }
    },
    highlight: { fields: { name: {} } }`;

  return client.search({ index, type, body, size: 100 });
};

const searchAge = (term, offset = 0) => {
  const body = {
    from: offset,
    query: {
      match: {
        age: {
          query: term
        }
      }
    },
    highlight: { fields: { age: {} } }
  };

  return client.search({ index, type, body, size: 10 });
};

const multiTerm = (term, offset = 0) => {
  const body = {
    from: offset,
    query: {
      multi_match: {
        query: term,
        fields: ["age", "name"]
      }
    },
    highlight: { fields: { name: {} } }
  };

  return client.search({ index, type, body, size: 100 });
};

module.exports = {
  searchName,
  searchAge,
  dynamicQuery,
  multiTerm,
  demoQuery
};

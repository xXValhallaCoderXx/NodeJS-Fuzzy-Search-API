const { client, index, type } = require("../elasticsearch/connection");

const multiQuery = (term, offset = 0) => {
  const body = {
    from: offset,
    query: {
      bool: {
        should: [
          {
            match: {
              age: {
                query: term.age || "",
                fuzziness: "AUTO",
                boost: 5
              }
            }
          },
          {
            match: {
              latitude: {
                query: term.latitude || "",
                fuzziness: "AUTO",
                boost: 2
              }
            }
          },
          {
            match: {
              longitude: {
                query: term.longitude || "",
                fuzziness: "AUTO",
                boost: 2
              }
            }
          },
          {
            match: {
              monthlyIncome: {
                query: term.monthlyIncome || "",
                fuzziness: "AUTO",
                boost: 3
              }
            }
          },
          { match: { experienced: term.experienced || "" } }
        ]
      }
    }
  };
  return client.search({ index, type, body, size: 100 });
};

module.exports = {
  multiQuery
};

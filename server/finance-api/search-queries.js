const { client, index, type } = require("../elasticsearch/connection");
// GET /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false
const demoQuery = (term, offset = 0) => {
  console.log("TERM: ", term);
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
  demoQuery
};

const { client, index, type } = require("../elasticsearch/connection");
// GET /people-like-you?age=23&latitude=40.71667&longitude=19.56667&monthlyIncome=5500&experienced=false
const demoQuery = (term, offset = 0) => {
  console.log("TERM: ", term);
  const body = {
    from: offset,
    query: {
      bool: {
        should: [
          { match: { age: term.age || "" } },
          { match: { latitude: term.latitude || "" } },
          { match: { longitude: term.longitude || "" } },
          {
            match: {
              monthlyIncome: {
                query: term.monthlyIncome || "",
                fuzziness: "AUTO"
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

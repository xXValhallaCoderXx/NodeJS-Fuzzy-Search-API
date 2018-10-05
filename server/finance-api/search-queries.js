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
                boost: 0.2
              }
            }
          },
          // {
          //   match: {
          //     latitude: {
          //       query: term.latitude || "",
          //       fuzziness: "0",
          //       boost: 0.2
          //     }
          //   }
          // },
          // {
          //   match: {
          //     longitude: {
          //       query: term.longitude || "",
          //       fuzziness: "0",
          //       boost: 0.2
          //     }
          //   }
          // },
          {
            match: {
              monthlyIncome: {
                query: term.monthlyIncome || "",
                fuzziness: "AUTO",
                boost: 0.2
              }
            }
          },
          //{ match: { experienced: term.experienced || "" } }
        ] 
      }
    }
  };
  return client.search({ index, type, body, size: 100 });
};

module.exports = {
  multiQuery
};

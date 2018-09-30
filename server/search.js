const { client, index, type } = require('./connection')

module.exports = {
  /** Query ES index for the provided term */
  queryTerm (term, offset = 0) {
    const body = {
      from: offset,
      query: { match: {
        name: {
          query: term
        } } },
      highlight: { fields: { name: {} } }
    }

    return client.search({ index, type, body, size: 10 })
  },
  multiTerm(term, offset = 0) {
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
  },
}
const elasticsearch = require("elasticsearch");

// Core ES variables for this project
const index = "persons";
const type = "person";
const port = 9200;
const host = process.env.ES_HOST || "localhost";
const client = new elasticsearch.Client({ host: { host, port } });

/** Check the ES connection status */
async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    console.log("Connecting to ES");
    try {
      const health = await client.cluster.health({});
      console.log(health);
      isConnected = true;
    } catch (err) {
      console.log("Connection Failed, Retrying...", err);
    }
  }
}

async function resetIndex() {
  if (await client.indices.exists({ index })) {
    await client.indices.delete({ index });
  }

  await client.indices.create({ index });
  await putPersonMapping();
}

async function putPersonMapping() {
  const schema = {
    name: { type: "keyword" },
    age: { type: "keyword" },
    latitude: { type: "keyword" },
    longitude: { type: "keyword" },
    monthlyIncome: { type: "keyword" },
    experienced: { type: "keyword" }
  };
  return client.indices.putMapping({
    index,
    type,
    body: { properties: schema }
  });
}

module.exports = {
  client,
  index,
  type,
  checkConnection,
  resetIndex
};

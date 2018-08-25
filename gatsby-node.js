const WooCommerceAPI = require('woocommerce-api');
const { processNode } = require('./helpers');

exports.sourceNodes = async (
  { boundActionCreators, createNodeId },
  configOptions
) => {
  const { createNode } = boundActionCreators;
  delete configOptions.plugins;

  const { api, https, api_keys, fields } = configOptions;

  // set up WooCommerce node api tool
  const WooCommerce = new WooCommerceAPI({
    url: `http${https?'s':''}://${api}`,
    consumerKey: api_keys.consumer_key,
    consumerSecret: api_keys.consumer_secret,
    wpAPI: true,
    version: 'wc/v1'
  });

  // Fetch Node and turn our response to JSON
  const fetchNodes = async (fieldName) => {
    const res = await WooCommerce.getAsync(fieldName);
    return JSON.parse(res.toJSON().body);
  };

  // Loop over each field set in configOptions and process/create nodes
  async function fetchNodesAndCreate (array) {
    for (const field of array) {
      const nodes = await fetchNodes(field);
      nodes.forEach(n=>createNode(processNode(createNodeId, n, field)));
    }
  }
  
  // Leh go...
  await fetchNodesAndCreate(fields);
  return;
};

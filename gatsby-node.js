const WooCommerceAPI = require('woocommerce-api');
const { processNode } = require('./helpers');

exports.sourceNodes = async (
  { boundActionCreators, createNodeId },
  configOptions
) => {
  const { createNode } = boundActionCreators;
  delete configOptions.plugins;

  const {api, https, api_keys} = configOptions;

  // set up WooCommerce node api tool
  const WooCommerce = new WooCommerceAPI({
    url: `http${https?'s':''}://${api}`,
    consumerKey: api_keys.consumer_key,
    consumerSecret: api_keys.consumer_secret,
    wpAPI: true,
    version: 'wc/v1'
  });

  const fetchNodes = async (fieldName) => {
    const res = await WooCommerce.getAsync(fieldName);
    return JSON.parse(res.toJSON().body);
  };

  try{
    console.log('Searching for Customers...')
    const nodes = await fetchNodes('customers');
    nodes.forEach(n=>createNode(processNode(createNodeId, n, 'customers')));
  }catch(e){
    console.log(e);
  }

  try{
    console.log('\nSearching for Orders...')
    const nodes = await fetchNodes('orders');
    nodes.forEach(n=>createNode(processNode(createNodeId, n, 'orders')));
  }catch(e){
    console.log(e);
  }

  try{
    console.log('\nSearching for Reports...')
    const nodes = await fetchNodes('reports');
    nodes.forEach(n=>createNode(processNode(createNodeId, n, 'reports')));
  }catch(e){
    console.log(e);
  }

  try{
    console.log('\nSearching for Products...')
    const nodes = await fetchNodes('products');
    nodes.forEach(n=>createNode(processNode(createNodeId, n, 'products')));
  }catch(e){
    console.log(e);
  }

  try{
    console.log('\nSearching for Coupons...')
    const nodes = await fetchNodes('coupons');
    nodes.forEach(n=>createNode(processNode(createNodeId, n, 'coupons')));
  }catch(e){
    console.log(e);
  }

  return;
};

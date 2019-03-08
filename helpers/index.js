const crypto = require("crypto");

const processNode = (createNodeId, node, fieldName) => {
  const nodeId = createNodeId(`woocommerce-${fieldName}-${node.id}`)
  const nodeContent = JSON.stringify(node);
  const nodeContentDigest = crypto
    .createHash('md5')
    .update(nodeContent)
    .digest('hex')

  const nodeData = Object.assign({}, node, {
    id: nodeId,
    wordpress_id: node['id'],
    parent: null,
    children: [],
    internal: {
      type: `WC${capitalize(fieldName)}`,
      content: nodeContent,
      contentDigest: nodeContentDigest,
    },
  })
  return nodeData
};

// Turn multi part endpoints into camelCase
// e.g. products/categories becomes productsCategories
const normaliseFieldName = (name) => {
  const parts = name.split('/');
  return parts.reduce((whole, partial) => {
    if(whole === '') {
      return whole.concat(partial);
    }
    return whole.concat(partial[0].toUpperCase() + partial.slice(1));
  }, '')
}

module.exports = { processNode, normaliseFieldName };

// Helper Helpers
function capitalize(s){
  return s[0].toUpperCase() + s.slice(1);
}

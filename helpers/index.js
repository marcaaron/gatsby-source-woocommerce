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

module.exports = { processNode };

// Helper Helpers
function capitalize(s){
  return s[0].toUpperCase() + s.slice(1);
}

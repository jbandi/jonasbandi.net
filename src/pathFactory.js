const path = require('path')

exports.generatePathForBlog = function(node) {
  const date = node.fields.date.split('T')[0];
  return `/blog/${date}-${node.fields.slug}/`;
}

exports.generatePathForDevlink = function(node){
  const extension = path.extname(node.fileAbsolutePath);
  const fileName = path.basename(node.fileAbsolutePath, extension);
  return `/devlinks/${fileName}/`;
}

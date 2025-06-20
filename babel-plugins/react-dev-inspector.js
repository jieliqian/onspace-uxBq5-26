/*
 * @Description: 
 */
module.exports = function ({ types: t }) {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        if (state.file && path.node && path.node.loc) {
          const { line, column } = path.node.loc.start
          const filePath = state.file.opts.filename || ''
          if (filePath.includes('node_module')) return;
          console.log(123, filePath, path.node.loc);
          path.node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier('data-inspector-line'),
              t.stringLiteral(String(line))
            )
          )
          path.node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier('data-inspector-column'),
              t.stringLiteral(String(column))
            )
          )
          path.node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier('data-inspector-file-path'),
              t.stringLiteral(filePath.replace(process.cwd() + '/', ''))
            )
          )
        }
      },
    },
  }
}

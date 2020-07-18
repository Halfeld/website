exports.handler = (event, context, callback) => {
  callback({
    statusCode: 200,
    body: {
      message: 'running'
    }
  })
}


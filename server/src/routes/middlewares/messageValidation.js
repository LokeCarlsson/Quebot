export default (request, response, next) => {
  const {student, username} = request.body

  if (student === undefined) {
    return next(new Error('Request must include student details'))
  }

  if (username === undefined) {
    return next(new Error('Request must include username details'))
  }

  next()
}
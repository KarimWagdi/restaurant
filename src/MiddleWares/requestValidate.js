// const  {plainToInstance} = require('class-transformer')
// const  {validate} = require('class-validator')

// const extractErrorsRecursively = ( error, rawErrors ) => {
//     if (error.constraints) {
//         Object.values(error.constraints).forEach((errMsg) => {
//             rawErrors.push(errMsg)
//         })
//     }
//     if (error.children) {
//         error.children.forEach((childError) => {
//             extractErrorsRecursively(childError, rawErrors)
//         })
//     }
// }

// const requestValidate = (requestType) => {
//     return async (request, response, next) => {
//         console.log(request.body);
//         const converterObject = plainToInstance(requestType, request.body)
//         const valid = await validate(converterObject)
//         if (valid.length > 0) {
//             const rawErrors = []
//             valid.forEach((validationError) => {
//                 extractErrorsRecursively(validationError, rawErrors)
//             })
//             const data = {
//                 code: 400,
//                 data: rawErrors
//             }
//             response.status(400).json(data)
//         } else {
//             next()
//         }
//     }
// }
// module.exports = requestValidate

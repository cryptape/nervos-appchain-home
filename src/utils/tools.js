import React, {Component} from 'react'

export  {parsedText, parsedContent, cleanProps} from './parse'

export const deepClone = (o) => {
  return JSON.parse(JSON.stringify(o))
}




// var randomString = function (n) {
//   var letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//
//   '.,0123456789!?'
//   var len = letter.length
//   var s = ''
//   for (var i = 0; i < n; i++) {
//     var index = Math.floor(Math.random() * len)
//     s += letter[index]
//   }
//   return s
// }
// var rs = randomString(200)
// var r5 = randomString(50)
// var r1 = randomString(10)

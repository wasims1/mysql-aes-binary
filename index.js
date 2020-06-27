/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */

'use strict'

/**
 * Module dependencies
 */

const crypto = require('crypto')

exports.encrypt = (str, key) => {
  const c = crypto.createCipheriv('aes-128-ecb', convertCryptKey(key), '')
  let ret = ''
  ret += c.update(str, 'utf8', 'binary')
  ret += c.final('binary')
  const buffer_ret = Buffer.from(ret, 'binary')
  return buffer_ret
}

exports.decrypt = (str, key) => {
  const d = crypto.createDecipheriv('aes-128-ecb', convertCryptKey(key), '')
  const buffer_str = Buffer.from(str, 'binary')
  let ret = ''
  ret += d.update(buffer_str, 'binary', 'utf8')
  ret += d.final('utf8')
  return ret
}

exports.convertCryptKey = convertCryptKey

function convertCryptKey(strKey) {
  const newKey = Buffer.alloc(16)
  strKey = Buffer.from(strKey)
  for (let i = 0; i < strKey.length; i++) newKey[i % 16] ^= strKey[i]
  return newKey
}
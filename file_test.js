const _ = require('lodash');
const fs = require('fs');
const translationEn = require('D:/cassie_project/external-portal_fe/src/i18n/en_US/translations.json');
const translationZh = require('D:/cassie_project/external-portal_fe/src/i18n/zh_CN/translations.json');
const translationKo = require('D:/cassie_project/external-portal_fe/src/i18n/ko_KR/translations.json');

const result = [];

// _.map(translationEn, (item, key) => {
//   if (translationZh[key]) {
//     result.key = ''
//   }
//   // if (typeof item === 'string')
// })

const find = (value, string, obj) => {
  _.map(value, (item, key) => {
    if (!obj[key]) {
      result.push(`${string}.${key}`);
    } else if (typeof item !== 'string') {
      find(item, `${string}.${key}`, obj[key]);
    }
  });
};
find(translationEn, 'translate', translationKo);
console.log(result);
// const str = result.join('\n');
// const buffer = new Buffer(str);
// fs.writeFile(`${__dirname}/translation_en.txt`, buffer, { flag: 'a' }, err => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('写入成功');
//   }
// });

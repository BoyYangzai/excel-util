const fg = require('fast-glob');
const xl = require('xlsx');
const entries = fg.sync(['excel/*.xlsx'], { dot: true });
const res = new Map()
entries.forEach(item => {
  const workBook = xl.readFile(item);
  const workSheet = workBook.Sheets[workBook.SheetNames[0]];
  const data = xl.utils.sheet_to_json(workSheet);
  //如果数组元素key包含学号，则已value为key，次value出现的次数为value
  data.forEach(item => {
    if (item['姓名（必填）'] + '--' + item['学号（必填）']) {
      res.set(item['姓名（必填）'] + '--' + item['学号（必填）'], res.get(item['姓名（必填）'] + '--' + item['学号（必填）']) ? res.get(item['姓名（必填）'] + '--' + item['学号（必填）']) + 1 : 1)
    }
  }
  )
})
console.log(Object.fromEntries(res.entries()))

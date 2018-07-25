export default function (val) {
  let str;
  switch (val) {
    case '1':
      str = '刑事案件';
      break;
    case '2':
      str = '民事案件';
      break;
    case '3':
      str = '行政案件';
      break;
    case '4':
      str = '赔偿案件';
      break;
    case '5':
      str = '执行案件';
      break;
    default:
      str = '';
      break;

  }
  return str

}

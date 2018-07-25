export default function (val) {
  if(!!val){
    if(!val){
      return
    }
    let arr = val.split('');
    let str = arr[0];
    for (let i = 1; i < arr.length; i++) {
      str += "*"
    }
    return str;
  }
  return '--'
}

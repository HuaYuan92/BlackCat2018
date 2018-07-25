export default function (val) {
  if(!val){
    return
  }
  let arr =val.split("");
  arr[10]="*";
  arr[11]="*";
  arr[12]="*";
  arr[13]="*";
  return arr.join('');
}

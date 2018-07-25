export default function (val) {
  if(!val){
    return '- -'
  }
  return (val || "").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export default function (val) {
  if(!!val){
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
  }
  return '--'

}

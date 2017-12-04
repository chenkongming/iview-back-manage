let $lm = {};
$lm.setToken = function (value) {
  sessionStorage.setItem("token", value);
};
$lm.getToken = function (name) {
  return sessionStorage.getItem(name)
};
$lm.sussess = function (msg) {
  // store.dispatch('setToast', {
  //   toastShow:true,
  //   toastText:msg
  // });
  return false
};
$lm.error = function (msg) {
  // store.dispatch('setToast', {
  //   toastShow:true,
  //   toastText:msg
  // });
  return false
};
//打印json数据
$lm.JSON = function (data) {
  console.log(JSON.stringify(data))
};
$lm.print=function (data) {
  console.log(data);
};
export default $lm;

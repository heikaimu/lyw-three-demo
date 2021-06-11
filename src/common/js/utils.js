/**
 * 获取文件本地预览地址
 * @param {*} file - 源文件
 * @returns {String} - 本地预览地址
 */
export function getObjectUrl(file) {
  var url = null;
  if (window.createObjectURL !== undefined) {
    url = window.createObjectURL(file);
  } else if (window.URL !== undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

/**
 * base64转blob
 * @param {String} dataurl
 * @returns
 */
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

// blob转base64
export function blobToDataURL(blob, callback) {
  const a = new FileReader();
  a.onload = function(e) { callback(e.target.result); };
  a.readAsDataURL(blob);
}

// 获取一个随机ID
export function getRandomID(length = 8) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

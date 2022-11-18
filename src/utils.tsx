export const numberToFileSize = (num: number) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"]
  let p = 0

  while (num >= 1024) {
    num /= 1024
    p++
  }

  let numStr = num.toFixed(2).toString()
  let i = numStr.length - 1
  while (numStr[i] == '0') i--
  if (numStr[i] == '.') i--

  return numStr.slice(0, i + 1) + units[p]
}

export function timeConverter(UNIX_timestamp: number) {
  const a = new Date(UNIX_timestamp * 1000);
  const year = a.getFullYear();
  const month = a.getMonth() + 1;
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return year + '年-' + month + '月-' + date + '日 ' + hour + ':' + min + ':' + sec;
}

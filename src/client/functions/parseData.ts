export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatSeconds(secs: number) {
  const sign = secs < 0;
  const hhmmss = new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
  return sign ? "-" + hhmmss : hhmmss;
}

// 초(seconds) → "mm:ss" 문자열 (예: 80 → "01:20")
export const formatTimeMMSS = (totalSec: number): string => {
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  // padStart(2, "0"): 한 자리면 앞에 0 붙여 두 자리로 (5 → "05")
  const mm = String(min).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");
  return `${mm}:${ss}`;
};

// index는 굳이 경로 끝까지 안적어도 찾아줌
export const generateId = (prefix?: string): string => {
  // UUID v4 규격의 포맷(8-4-4-4-12)에 맞게 16진수 난수를 채워넣는 표준 알고리즘
  // 라이브러리 사용 하지 않기 위해서
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

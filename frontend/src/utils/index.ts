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

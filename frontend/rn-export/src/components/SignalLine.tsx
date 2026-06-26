import React from "react";
import { View } from "react-native";
import Svg, {
  Polyline,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

/**
 * SignalLine — record의 시그니처.
 * 노력/휴식/진척을 한 줄 신호로 그린다.
 *
 * points: [[x,y], ...]  (viewBox 좌표계)
 * progressIndex: 이 인덱스까지는 그린(진행), 이후는 회색(예정)
 * fill: 진행 구간 아래 영역을 옅게 채움
 * lead: 진행 끝점에 펄스 점 표시
 */
type Pt = [number, number];

export function SignalLine({
  points,
  width = 320,
  height = 120,
  progressIndex,
  fill = false,
  lead = true,
  baseline,
  stroke = "#16A65C",
  ghost = "#E2E6E4",
  strokeWidth = 2.6,
}: {
  points: Pt[];
  width?: number;
  height?: number;
  progressIndex?: number; // 기본: 전부 진행
  fill?: boolean;
  lead?: boolean;
  baseline?: number; // 영역 채움 바닥 y
  stroke?: string;
  ghost?: string;
  strokeWidth?: number;
}) {
  const cut = progressIndex ?? points.length - 1;
  const done = points.slice(0, cut + 1);
  const todo = points.slice(cut); // 겹치게 시작점 포함
  const leadPt = points[cut];
  const base = baseline ?? height;
  const toStr = (ps: Pt[]) => ps.map((p) => `${p[0]},${p[1]}`).join(" ");
  const areaPath =
    `M ${toStr(done)} L ${done[done.length - 1][0]},${base} ` +
    `L ${done[0][0]},${base} Z`;

  return (
    <View style={{ width: "100%", height }}>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {fill && (
          <>
            <Defs>
              <LinearGradient id="sig" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={stroke} stopOpacity={0.18} />
                <Stop offset="1" stopColor={stroke} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Path d={areaPath} fill="url(#sig)" />
          </>
        )}
        {todo.length > 1 && (
          <Polyline
            points={toStr(todo)}
            fill="none"
            stroke={ghost}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        <Polyline
          points={toStr(done)}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {lead && leadPt && (
          <Circle cx={leadPt[0]} cy={leadPt[1]} r={5} fill="#fff" stroke={stroke} strokeWidth={3} />
        )}
      </Svg>
    </View>
  );
}

/** 작은 로고/버튼용 미니 신호 글리프 */
export function SignalGlyph({ color = "#16A65C", width = 22, height = 12 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 12">
      <Polyline
        points="0,9 4,8 7,3 10,10 13,9 16,2 19,7 22,6"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

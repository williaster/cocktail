import { path } from 'd3-path';

const { cos, sin, PI: pi } = Math;
const halfPi = pi / 2;

export default function ribbon({ source, target }) {
  const { radius: sRadius } = source;
  const { radius: tRadius } = target;

  const sa0 = source.startAngle - halfPi;
  const sa1 = source.endAngle - halfPi;
  const sx0 = sRadius * cos(sa0);
  const sy0 = sRadius * sin(sa0);
  const sx1 = sRadius * cos(sa1);
  const sy1 = sRadius * sin(sa1);

  const ta0 = target.startAngle - halfPi;
  const ta1 = target.endAngle - halfPi;
  const tx0 = tRadius * cos(ta0);
  const ty0 = tRadius * sin(ta0);

  const tx1 = tRadius * cos(ta1);
  const ty1 = tRadius * sin(ta1);

  const midRadius = (sRadius + tRadius) / 2;
  const midAngle0 = (sa0 + ta0) / 2;
  const midAngle1 = (sa1 + ta1) / 2;

  // const controlX0 = (sx0 + tx0) / 2; // midRadius * cos(midAngle0);
  // const controlY0 = (sy0 + ty0) / 2; // midRadius * sin(midAngle0);
  // const controlX1 = (sx1 + tx1) / 2; // midRadius * cos(midAngle1);
  // const controlY1 = (sy1 + ty1) / 2; // midRadius * sin(midAngle1);
  const controlX0 = midRadius * cos(midAngle0);
  const controlY0 = midRadius * sin(midAngle0);
  const controlX1 = midRadius * cos(midAngle1);
  const controlY1 = midRadius * sin(midAngle1);

  const pathGen = path();

  //   pathGen.moveTo(sx0, sy0);
  //   pathGen.arc(0, 0, sRadius, sa0, sa1);

  //   if (sa0 !== ta0 || sa1 !== ta1) {
  //     pathGen.quadraticCurveTo(controlX0, controlY0, tx0, ty0);
  //     pathGen.arc(0, 0, tRadius, ta0, ta1);
  //   }

  //   pathGen.quadraticCurveTo(controlX1, controlY1, sx0, sy0);

  pathGen.moveTo(sx0, sy0);
  pathGen.bezierCurveTo(controlX0, controlY0, controlX1, controlY1, tx0, ty0);
  pathGen.arc(0, 0, tRadius, ta0, ta1);
  pathGen.bezierCurveTo(controlX1, controlY1, controlX0, controlY0, sx1, sy1);
  pathGen.arc(0, 0, sRadius, sa1, sa0, true);

  pathGen.closePath();

  return pathGen.toString();
}

"use client";

import { memo, useMemo } from "react";
import { getBezierPath, type EdgeProps } from "@xyflow/react";
import { HANDLE_COLORS } from "../WorkflowContext";

const GradientEdge = memo(function GradientEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  sourceHandleId,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Get the color based on the source handle
  const edgeColor = useMemo(
    () => HANDLE_COLORS[sourceHandleId || ""] || "#6EDDB3",
    [sourceHandleId]
  );

  return (
    <path
      id={id}
      d={edgePath}
      fill="none"
      stroke={edgeColor}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
});

export default GradientEdge;

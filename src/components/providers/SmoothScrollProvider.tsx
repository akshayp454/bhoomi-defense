"use client";

import React, { useEffect, useState } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [LenisComponent, setLenisComponent] = useState<any>(null);

  useEffect(() => {
    import("lenis/react")
      .then((mod) => {
        setLenisComponent(() => mod.ReactLenis);
      })
      .catch(() => {
        // Fallback to normal scroll if Lenis fails
      });
  }, []);

  if (!LenisComponent) {
    return <>{children}</>;
  }

  return (
    <LenisComponent
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </LenisComponent>
  );
}

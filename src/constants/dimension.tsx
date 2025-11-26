import { useEffect, useState } from "react";

export const useDeviceMode = () => {
  const getWindowSize = () => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  const [size, setSize] = useState(getWindowSize);

  useEffect(() => {
    const update = () => setSize(getWindowSize());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { width, height } = size;
  const orientation = width > height ? "landscape" : "portrait";

  let device = "4k";

  // MOBILE
  if ((width <= 320 && height <= 568) || (width <= 568 && height <= 320)) device = "mobile-small";
  else if ((width <= 390 && height <= 667) || (width <= 667 && height <= 390)) device = "mobile-medium";
  else if ((width <= 414 && height <= 844) || (width <= 844 && height <= 414)) device = "mobile-medium-plus";
  else if ((width <= 480 && height <= 896) || (width <= 896 && height <= 480)) device = "mobile-large";

  // TABLET
  else if ((width <= 768 && height <= 1024) || (width <= 1024 && height <= 768)) device = "tablet";
  else if ((width <= 1024 && height <= 1112) || (width <= 1112 && height <= 1024)) device = "tablet-large";
  else if ((width <= 1280 && height <= 1366) || (width <= 1366 && height <= 1280)) device = "tablet-extra-large";

  // LAPTOP
  else if ((width <= 1366 && height <= 768) || (width <= 768 && height <= 1366)) device = "laptop";
  else if ((width <= 1440 && height <= 900) || (width <= 900 && height <= 1440)) device = "laptop-standart";
  else if ((width <= 1600 && height <= 1024) || (width <= 1024 && height <= 1600)) device = "laptop-large";
  else if ((width <= 1920 && height <= 1080) || (width <= 1080 && height <= 1920)) device = "laptop-extra-large";

  // DESKTOP
  else if ((width <= 2560 && height <= 1440) || (width <= 1440 && height <= 2560)) device = "desktop";
  else if ((width <= 3440 && height <= 1440) || (width <= 1440 && height <= 3440)) device = "desktop-large";
  else device = "4k";

  return { device, orientation };
};

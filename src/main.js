import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/menu-fullscreen";
import "./scripts/reviews-slider";
import "./scripts/portfolio-slider";
import "./scripts/skills";
import "./scripts/scroll";
import "./scripts/parallax";
import "./scripts/write-me";
import { FC } from "react";

import image from "@/src/assets/WEBP/page-404.webp";

const ErrorImage: FC = () => (
  <section>
    <div>
      <img src={image} alt="error-404" width="974" height="649" />
    </div>
  </section>
);

export default ErrorImage;

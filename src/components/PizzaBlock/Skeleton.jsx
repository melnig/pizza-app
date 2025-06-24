import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={300}
    height={500}
    viewBox="0 0 300 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="321" y="151" rx="0" ry="0" width="9" height="9" />
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="200" />
    <rect x="0" y="230" rx="4" ry="4" width="100%" height="30" />
    <rect x="0" y="290" rx="8" ry="8" width="100%" height="90" />
    <rect x="100" y="395" rx="4" ry="4" width="105" height="30" />
    <rect x="70" y="440" rx="25" ry="25" width="160" height="55" />
  </ContentLoader>
);

export default Skeleton;

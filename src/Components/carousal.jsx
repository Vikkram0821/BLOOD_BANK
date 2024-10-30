import SimpleImageSlider from "react-simple-image-slider";
import image1 from "../assets/rpics.jpg";
import image2 from "../assets/img-2.jpg";
import image3 from "../assets/DONATE BLOOD SAVE LIFE.jpg";
const images = [
  {
    url: image1,
  },
  {
    url: image2,
  },
  {
    url: image3,
  },
];

const Carousal = ({ showCarousal }) => {
  return (
    <div className={`carousal ${showCarousal ? "hide_1" : ""}`}>
      <SimpleImageSlider
        width={1360}
        height={550}
        images={images}
        showBullets={true}
        autoPlay={true}
        showNavs={true}
        controls={true}
        style={{
          overflow: "show",
          objectFit: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default Carousal;

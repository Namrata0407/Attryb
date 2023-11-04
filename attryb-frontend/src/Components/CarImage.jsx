/* eslint-disable react/prop-types */
import axios from "axios";

const CarImage = ({ setImgUrl, imgUrl }) => {
  const handleImg = (e) => {
    uploadImg(e.target.files[0]);
  };

  const uploadImg = async (data) => {
    let cloudName = `dmj7ibh4p`;
    let preset = "buycars";
    try {
      let imgData = new FormData();
      imgData.append("file", data);
      if (cloudName && preset) {
        imgData.append("upload_preset", preset);
        imgData.append("cloud_name", cloudName);
        let res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          imgData
        );
        console.log(res.data.secure_url);
        setImgUrl(res.data.secure_url);
        console.log(imgUrl);
      } else {
        throw cloudName;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleImg} value={imgUrl} />
    </div>
  );
};

export default CarImage;
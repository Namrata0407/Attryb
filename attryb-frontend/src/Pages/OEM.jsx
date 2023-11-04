import axios from "axios";
import React, { useState } from "react";

const OEM = () => {
  const [img, setImg] = useState("");
  const [obj, setObj] = useState({
    name: "",
    max_speed: "",
    mfg_year: "",
    mileage: "",
    model: "",
    og_price: "",
    power: "",
  });

  const handleImg = (e) => {
    setImg(e.target.value);
    let image = uploadImg(e.target.files[0]);
    console.log(image);
  };

  const handleChange = () => {};

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
        return res.data.secure_url;
      } else {
        throw cloudName;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <form>
          <label>Model Name</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={obj.name}
          />
          <br />
          <label>Max Speed</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="max_speed"
            value={obj.max_speed}
          />
          <br />
          <label>Manuf. Year</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="mfg_year"
            value={obj.mfg_year}
          />
          <br />
          <label>Mileage</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="mileage"
            value={obj.mileage}
          />
          <br />
          <label>Model</label>
          <br />
          <input
            type="text"
            onChange={handleChange}
            name="model"
            value={obj.model}
          />
          <br />
          <label>Original Price</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="og_price"
            value={obj.og_price}
          />
          <br />
          <label>Power(BHP)</label>
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="power"
            value={obj.power}
          />
          <br />
        </form>

        <input type="file" onChange={handleImg} value={img} />
      </div>
    </div>
  );
};

export default OEM;
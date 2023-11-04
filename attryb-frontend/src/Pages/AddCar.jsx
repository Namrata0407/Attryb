import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AddCar = () => {
  const [obj, setObj] = useState({
    km_odoMeter: "",
    major_scratches: "",
    original_paint: "",
    accidents_reported: "",
    previous_buyers: "",
    registration_place: "",
    dealer_price: "",
  });
  const [carModel, setCarModel] = useState("");
  const [carData, setCarData] = useState([]);
  const [OEMSepcs, setOEMSpecs] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [url, setUrl] = useState("");
  const nav = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let token = localStorage.getItem("buyCarToken");
    
    if (token == undefined || token == null) {
      nav("/login");
    }
  }, []);

  const handleSubmit = async () => {
    if (
      obj.km_odoMeter == "" ||
      obj.major_scratches == "" ||
      obj.original_paint == "" ||
      obj.accidents_reported == "" ||
      obj.previous_buyers == "" ||
      obj.registration_place == "" ||
      obj.dealer_price == "" ||
      url == ""
    ) {
      toast({
        title: "Please fill all fields.",
        description: "All fields mandatory",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position:"top"
      });
    } else {
      let newObj = { ...obj, car_data: OEMSepcs._id, imgUrl: url };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/marketplace/add`,
          newObj,
          {
            headers: {
              Authorization: `Barrier ${localStorage.getItem("buyCarToken")}`,
            },
          }
        );
        if (response.data.message == "car added successfully") {
          toast({
            title: "Car Added successfully",
            description: "successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position:"top"
          });
          setObj({
            km_odoMeter: "",
            major_scratches: "",
            original_paint: "",
            accidents_reported: "",
            previous_buyers: "",
            registration_place: "",
            dealer_price: "",
          });
          setOEMSpecs(null);
          setUrl("");
          setCarModel("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDetails = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const handleCarModel = (e) => {
    setCarModel(e.target.value);
  };

  const SearchCarModel = async () => {
    if (carModel != "") {
      try {
        const car = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/oemspecs?q=${carModel}`
        );
        if (car.data.length == 0) {
          let message = { _id: 12554, model: "No such car in Data base" };
          setCarData([message]);
        } else {
          setCarData(car.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addOEM = (el) => {
    setOEMSpecs(el);
    setCarData([]);
  };
  // add car image function
  const handleImg = (e) => {
    setImgUrl(e.target.value);
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
        let url = res.data.secure_url;
        setUrl(url);
        console.log(imgUrl);
      } else {
        throw cloudName;
      }
    } catch (err) {
      console.log(err);
    }
  };
  // reset Details
  const resetForm = () => {
    setObj({
      km_odoMeter: "",
      major_scratches: "",
      original_paint: "",
      accidents_reported: "",
      previous_buyers: "",
      registration_place: "",
      dealer_price: "",
    });
    setOEMSpecs(null);
    setUrl("");
    setCarModel("");
    setCarData([]);
  };

  return (
    <div>
      <Heading className="Heading newcar">Add New Car 🚘</Heading>

      <Box className="addCar_container">
        <Box>
          <label>Enter KMs on Odometer</label>
          <br />
          <input
            type="number"
            value={obj.km_odoMeter}
            placeholder="Enter KMs on Odometer"
            name="km_odoMeter"
            onChange={handleDetails}
          />
          <br />
          <label>No. of Major Scratches</label>
          <br />
          <input
            type="number"
            value={obj.major_scratches}
            placeholder="No. of Major Scratches"
            name="major_scratches"
            onChange={handleDetails}
          />
          <br />
          <label>Upload Car Image</label>
          <br />
          <input type="file" onChange={handleImg} value={imgUrl} />
          <label>Original Paint</label>
          <br />
          <input
            type="text"
            value={obj.original_paint}
            name="original_paint"
            placeholder="Original Paint"
            onChange={handleDetails}
          />
          <br />
          <label>Number of accidents reported</label>
          <br />
          <input
            type="number"
            value={obj.accidents_reported}
            name="accidents_reported"
            placeholder="Enter Number of accidents reported"
            onChange={handleDetails}
          />
          <br />
          <label>Number of previous buyers</label>
          <br />
          <input
            type="number"
            value={obj.previous_buyers}
            name="previous_buyers"
            placeholder="Number of previous buyers"
            onChange={handleDetails}
          />
          <br />
          <label>Registration Place</label>
          <br />
          <input
            type="text"
            value={obj.registration_place}
            name="registration_place"
            placeholder="Enter Registration Place"
            onChange={handleDetails}
          />
          <br />
          <label>Enter Price</label>
          <br />
          <input
            type="number"
            value={obj.dealer_price}
            name="dealer_price"
            placeholder="Enter car Price"
            onChange={handleDetails}
          />
          <br />
        </Box>
        <Box>
          <label>Enter Car Model</label> <br />
          <input
            type="text"
            value={carModel}
            name="dealer_price"
            onChange={handleCarModel}
            placeholder="Search car OEM"
          />{" "}
          <input type="button" className="searchvalue" value="Search" onClick={SearchCarModel} /> <br />
          {carData &&
            carData.map((el) => (
              <div key={el._id} onClick={() => addOEM(el)} className="carList">
                <p>{el.model}</p>
              </div>
            ))}
          {OEMSepcs && (
            <div>
              <label>Model Name</label>
              <br />
              <input value={OEMSepcs.model} readOnly />
              <br />
              <label>Max Speed</label>
              <br />
              <input value={OEMSepcs.max_speed} readOnly />
              <br />
              <label>Manuf. Year</label>
              <br />
              <input value={OEMSepcs.mfg_year} readOnly />
              <br />
              <label>Mileage</label>
              <br />
              <input value={OEMSepcs.mileage} readOnly />
              <br />
              <label>Original Price</label>
              <br />
              <input value={OEMSepcs.og_price} readOnly />
              <br />
              <label>Power(BHP)</label>
              <br />
              <input value={OEMSepcs.power} readOnly />
              <br />
            </div>
          )}
        </Box>
      </Box>

      <Box className="addCar_button">
        <Button colorScheme="red" mr={3} onClick={resetForm}>
          Reset
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Add
        </Button>
      </Box>
    </div>
  );
};

export default AddCar;
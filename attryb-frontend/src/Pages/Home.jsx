import { Box, Button, Select, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { useToast } from '@chakra-ui/react'
import EdtModal from "../Components/EditModal";

const Home = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dealer_price,setdealer_price] = useState("");
  const [original_paint, setoriginal_paint] = useState("");
  const nav = useNavigate();
  const toast = useToast()


  const addCarPage = () => {
    nav("/addcar");
  };

  useEffect(() => {
    fetchCarData();
  }, [carData.length,dealer_price,original_paint]);

  const fetchCarData = async () => {
    setLoading(true);
    let obj = {
      dealer_price,
      original_paint
    }
    const queryString = new URLSearchParams(obj).toString();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/marketplace?${queryString}`

      );
      const res = response.data;
      console.log(res);
      setCarData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const detailsPage = (el) => {
    localStorage.setItem("detailsPage", JSON.stringify(el));
    nav("/detailpage");
  };
  //--------------------------  Delete functionality --------------------------------//
  const handleCarDelete = async (el) => {

    try {
      const sendData = await axios.delete(`${process.env.REACT_APP_BASE_URL}/marketplace/${el._id}`,
        {
          headers: {
            Authorization: `Barrier ${localStorage.getItem("buyCarToken")}`,
          },
        }
      );
      const res = sendData.data;
      if (res == "Deleted Successfully") {
        toast({
          title: `${res}`,
          description: "Data deleted successfully",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: "top"

        })
        fetchCarData()
      }
      else if (res == "Not Authorized to delete") {
        toast({
          title: `${res}`,
          description: "You can only delete the data which you have added !",
          status: 'warning',
          duration: 2000,
          isClosable: true,
          position: "top"
        })
      }


    } catch (err) {
      console.log(err)
    }
  };
  //--------------------------  Delete functionality --------------------------------//


  if (loading) return <Box
    height="120px"
    width={"100px"}
    display="flex"
    alignItems="center"
    justifyContent="center"
    margin={"auto"}
    mt={"100px"}
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Box>;



  return (
    <div>
      <Box className="add_car">

        <div>
        <label style={{display:"flex",alignItems:"center"}}>
           <Text style={{width:"120px",fontWeight:"bold"}}> Filter by color :</Text>
            <Select w={"91x"} value={original_paint} onChange={(e)=>setoriginal_paint(e.target.value)} >
              <option value="">All</option>
              <option value="red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Orange">Orange</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Grey">Grey</option>
              <option value="Purple">Purple</option>
            </Select>
          </label>
        </div>

        <div>
          <label style={{display:"flex",alignItems:"center"}}>
           <Text style={{width:"120px",fontWeight:"bold"}}> Sort by Price :</Text>
            <Select w={"90px"} value={dealer_price} onChange={(e)=>setdealer_price(e.target.value)}>
              <option value="">All</option>
              <option value="1">ASC</option>
              <option value="-1">DESC</option>

            </Select>
          </label>
        </div>




        <Button
          style={{ backgroundColor: "rgb(5, 51, 94)", color: "white" }}
          onClick={addCarPage}
        >
          {" "}
          Add Car{" "}
        </Button>

      </Box>

      <Box className="homePage_cars_container">
        {carData &&
          carData.map((el) => (
            <div key={el._id} className="homePage_cars_div">
              <img src={el.imgUrl} alt={el._id} />
              <p>{`No. of Kms driven :- ${el.km_odoMeter} Km`}</p>
              <hr />
              <p>{`Original Paint :- ${el.original_paint}`}</p>
              <hr />
              <p>{`Previous Buyers :- ${el.previous_buyers}`}</p>
              <hr />
              <p>{`Registration Place :- ${el.registration_place}`}</p>
              <hr />
              <p>{`Price :- ${el.dealer_price} Rs.`}</p>
              <hr />
              <div className="details_btn">
                <button className="homepage_icon_btn" onClick={() => handleCarDelete(el)} ><MdDelete /></button>
                <button onClick={() => detailsPage(el)}>See Details</button>
                <EdtModal el={el} />
              </div>

            </div>
          ))}


         
      </Box>

      {carData.length==0 && <div style={{textAlign:"center",fontSize:"30px",fontWeight:"bold",color:"red"}}><h1>No data found...</h1></div>}
    </div>
  );
};

export default Home;
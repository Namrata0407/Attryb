import { Box, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {MdDelete,MdEdit} from "react-icons/md";
import { useToast } from '@chakra-ui/react'

const Home = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const toast = useToast()
  
  const addCarPage = () => {
    nav("/addcar");
  };

  useEffect(() => {
    fetchCarData();
  }, [carData.length]);

  const fetchCarData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/marketplace`
      );
      const res = response.data;
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
const handleCarDelete = async(el)=>{
  
  try {
    const sendData = await axios.delete(`${process.env.REACT_APP_BASE_URL}/marketplace/${el._id}`,
    {
      headers: {
        Authorization: `Barrier ${localStorage.getItem("buyCarToken")}`,
      },
    }
    );
    const res = sendData.data;
    if(res =="Deleted Successfully"){
      toast({
        title: `${res}`,
        description: "Data deleted successfully",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:"top"

      })
      fetchCarData()
    }
    else if(res == "Not Authorized to delete"){
      toast({
        title: `${res}`,
        description: "You are Not authorized",
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position:"top"

      })
    }
   

  } catch (err) {
    console.log(err)
  }
};
//--------------------------  Delete functionality --------------------------------//
const handleCarEdit = async(el)=>{
   /*
  try {
    const sendData = await axios.get(`${process.env.REACT_APP_BASE_URL}/marketplace/verify/${el._id}`,
    {
      headers: {
        Authorization: `Barrier ${localStorage.getItem("buyCarToken")}`,
      },
    }
    );
    const res = sendData.data;
  
  } catch (err) {
    console.log(err)
  }
  */
}

  if (loading) return   <Box
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
              <button className="homepage_icon_btn" onClick={() => handleCarDelete(el)} ><MdDelete/></button>
                <button onClick={() => detailsPage(el)}>See Details</button>
                <button className="homepage_icon_btn" onClick={() => handleCarEdit(el)}><MdEdit/></button>
              </div>
        
            </div>
          ))}
      </Box>
    </div>
  );
};

export default Home;
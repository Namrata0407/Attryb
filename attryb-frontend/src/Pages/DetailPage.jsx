import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const DetailPage = () => {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("detailsPage"));
    setDetail(data);
  }, []);

  return (
    <div>
      {detail && (
        <Box className="main_container_detailPage">
          <Box className="details_page_container">
            <Box className="detailPage_img">
              <img src={detail.imgUrl} alt={detail._id} />
              <p>{`Price : ${detail.dealer_price} Rs.`}</p>
            </Box>
            <Box>
              <TableContainer className="tables_detailPage">
                <Table variant="striped" colorScheme="blue">
                  <TableCaption>
                    Contains Original Equipment Manufacturers (OEM) Details
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Specifications</Th>
                      <Th>Detail</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Model</Td>
                      <Td>{detail.car_data.model}</Td>
                    </Tr>
                    <Tr>
                      <Td>Manufactured Year</Td>
                      <Td>{detail.car_data.mfg_year}</Td>
                    </Tr>
                    <Tr>
                      <Td>Power (BHP)</Td>
                      <Td>{detail.car_data.power}</Td>
                    </Tr>
                    <Tr>
                      <Td>Mileage (km/lt)</Td>
                      <Td>{detail.car_data.mileage}</Td>
                    </Tr>
                    <Tr>
                      <Td>Original Price (in Rs.)</Td>
                      <Td>{detail.car_data.og_price} Rs.</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box className="details_page_Dealer_Data">
            <TableContainer className="tables_detailPage">
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>Kms Driven</Th>
                    <Th>No. Major Scratches</Th>
                    <Th>Original Paint</Th>
                    <Th>No. of hands Driven</Th>
                    <Th>Registered Place</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{detail.km_odoMeter}</Td>
                    <Td>{detail.major_scratches}</Td>
                    <Td>{detail.original_paint}</Td>
                    <Td>{detail.previous_buyers}</Td>
                    <Td>{detail.registration_place}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default DetailPage;
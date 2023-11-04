import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
    Box,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";

const OverlayTwo = () => (
    <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
    />
)

function EdtModal({ el }) {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayTwo />)
    const [km_odoMeter, setOdometer] = useState(0);
    const [major_scratches, setmajor_scratches] = useState(0);
    const [original_paint, setoriginal_paint] = useState("");
    const [accidents_reported, setaccidents_reported] = useState(0);
    const [previous_buyers, setprevious_buyers] = useState(0);
    const [registration_place, setregistration_place] = useState("");
    const [dealer_price, setdealer_price] = useState(0);

    useEffect(() => {
        setOdometer(el.km_odoMeter);
        setmajor_scratches(el.major_scratches);
        setoriginal_paint(el.original_paint);
        setaccidents_reported(el.accidents_reported);
        setprevious_buyers(el.previous_buyers);
        setregistration_place(el.registration_place);
        setdealer_price(el.dealer_price);
    }, []);

    // console.log(el);

    const handleUpdate = async (id) => {
        let obj = { km_odoMeter, major_scratches, original_paint, accidents_reported, previous_buyers, registration_place, dealer_price };
        // console.log(el);
        try {
            // console.log(id);
            let res = await axios.patch(`http://localhost:4500/marketplace/${id}`,
                obj,
                {
                    headers: {
                        Authorization: `Barrier ${localStorage.getItem("buyCarToken")}`,
                    },
                }
            );

            console.log(res);

            if(res.status == 200 && res.data == "Updated Successfully"){
                toast({
                    title: "Updated Successfully",
                    description: "Success",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position:"top"
                });
                setTimeout(() => {
                    window.location.reload();
                },[500])
            }else if(res.status == 200 && res.data == 'Not Authorized to Update'){
                toast({
                    title: "You can only update the data which you have added !",
                    description: "Error",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position:"top"
                });

            }
        } catch (error) {
            toast({
                title: "Some Error",
                description: "Error",
                status: "error",
                duration: 2000,
                isClosable: true,
                position:"top"
            });
            console.log(error.message);
        }
    }

    return (
        <>
            <button
                ml='4'
                onClick={() => {
                    setOverlay(<OverlayTwo />)
                    onOpen()
                }}
                className="homepage_icon_btn"
            >
                <MdEdit />
            </button>


            <Modal isCentered isOpen={isOpen} onClose={onClose} >
                {overlay}
                <ModalContent >
                    <ModalHeader>Update Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}  >
                        <Box display={"flex"}  >
                            <Box >
                                <FormControl >
                                    <FormLabel>KMs on Odometer</FormLabel>
                                    <Input value={km_odoMeter} type='number' onChange={(e) => setOdometer(e.target.value)} placeholder='Enter KMs on Odometer' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>No. of Major Scratches</FormLabel>
                                    <Input value={major_scratches} type='number' onChange={(e) => setmajor_scratches(e.target.value)} placeholder='No. of Major Scratches' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Original Paint</FormLabel>
                                    <Input value={original_paint} type='text' onChange={(e) => setoriginal_paint(e.target.value)} placeholder='Original Paint' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Accidents reported</FormLabel>
                                    <Input value={accidents_reported} type='number' onChange={(e) => setaccidents_reported(e.target.value)} placeholder='Accidents reported' />
                                </FormControl>
                            </Box>

                            <Box ml={25}>
                                <FormControl mt={0}>
                                    <FormLabel>No. previous buyers</FormLabel>
                                    <Input value={previous_buyers} type='number' onChange={(e) => setprevious_buyers(e.target.value)} placeholder='Number of previous buyers' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Registration Place</FormLabel>
                                    <Input value={registration_place} type='text' onChange={(e) => setregistration_place(e.target.value)} placeholder='Registration Place' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Enter Price</FormLabel>
                                    <Input value={dealer_price} type='number' onChange={(e) => setdealer_price(e.target.value)} placeholder='Enter Price' />
                                </FormControl>

                            </Box>
                        </Box>

                        {/* </SimpleGrid> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(el._id)}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EdtModal
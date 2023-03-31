import { Box, Flex, Image, Select } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { BASE_URL } from "../../constants/constants";
import Loading from "../components/Loading";
import Paginantion from "../components/Pagination";
import ProductItem from "../components/ProductItem";
import OrderItem from "../components/OrderItem";


export default function ManageOrders(){

    const [cat,setCat] = useState("Vitamins")
    const {token} = useSelector((state)=>state.authReducer)
    const [product,setProduct] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [totalPage,setTotalPage] = useState(0)
    const [refresh,setRefresh] =useState(false)
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [page]);


    useEffect(()=>{

        const getData = async()=>{
            setLoading(true)
            let res = await axios({
                method:"get",
                url:BASE_URL+`/admin/order?page=${page}&limit=7`,
                headers:{
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIyZWFiYTQzNDk0OTgxNDc3ZjVhNzkiLCJpYXQiOjE2ODAyMzg3ODN9.zyLneanO_RUOdLOeUF3Z7nc62EfjcKd6G1Ypx265pbo`
                }
            })


            if(res.data){
              console.log(res.data)
                setProduct(res.data.data)
                setTotalPage(res.data.totalPages)
                setLoading(false)

            }else{
                setLoading(false)

            }

        }
        getData()



    },[cat,page,refresh])

    useEffect(()=>{
        setPage(1)
    },[cat])

    if(loading) return <Loading />

    return<Box padding={"8px 0px"} w={"100%"}>

        <Flex w={"100%"} alignItems={"center"} >
            <Select value={cat} m={"auto"} onChange={(e)=>setCat(e.target.value)}>
                <option value="">Select Category</option>
                <option value={"Vitamins"}>Vitamins</option>
                <option value={"Food"}>Food and Drinks</option>
                <option value={"Ayurveda"}>Ayurveda</option>
                <option value={"Nutrients"}>Nutrients</option>

            </Select>

        </Flex>


        <TableContainer>
  <Table variant='striped' colorScheme='orange'>
    <TableCaption>Filter products category wise</TableCaption>
    <Thead>
      <Tr>
        <Th>User</Th>
        <Th>title</Th>
        <Th isNumeric>Price</Th>
        <Th isNumeric>Quantity</Th>
        <Th isNumeric>Date</Th>
        <Th isNumeric>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      
      {product?.map((el)=><OrderItem key={el._id} setRefresh={setRefresh} {...el} />)}
      
    </Tbody>
    
  </Table>
</TableContainer>

<Paginantion key={page} page={page} setPage={setPage} divide={5} totalPage={totalPage} />
        
       
    </Box>
}
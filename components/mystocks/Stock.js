import React, { useEffect, useState } from "react";
import {
    HStack,
    Text, VStack, Box, Heading, FlatList, Avatar, Spacer, FormControl, Stack, Input, Button
} from "native-base";
import { supabase } from "../../client";
import getStock from "./GetStock";
import axios from "axios";

const Stock = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    async function fetchStocks() {
        const { data } = await supabase.from('mystocks').select();
        setStocks(data);
    }

    async function createStock(data) {
        const response = await supabase.from('mystocks').insert([{item_name: data.item_name, quantity: data.quantity, exp_date: data.exp_date, price: data.price}]);
        if(response.status === 409) {
            alert("Stock already exists!")
        }
        fetchStocks()
    }

    async function addBulkDataFromJSON(data) {
        const response = await supabase.from('mystocks').insert([{item_name: data.item_name, quantity: data.quantity, exp_date: data.exp_date, price: data.price}]);
        fetchStocks()
    }

    useEffect(() => {
        fetchStocks()
    }, []);

    const add = (stock) => {
        createStock(stock)
        console.log(stocks)
    }

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const submitFile = () => {
        const fd = new FormData();
        console.log(selectedFile)
        fd.append("file", selectedFile)
        fd.append("name", selectedFile.name)
        axios.post("http:localhost:3000/bulk", fd)
            .then((res) => console.log(res))
    }

    return <Box>
        {/* <AddDistributor add={add} /> */}
        <Heading fontSize="xl" p="4" pb="3">
            Stocks
        </Heading>
        <form method="POST" action="http://localhost:3000/bulk" enctype='multipart/form-data'>
            <Box space={5} mb={5}>
                <input type="file" name="file" onChange={handleFile}/>
            </Box>
            <button type="submit" onClick={submitFile}>Upload</button>
            {/* <Box alignItems="center">
                <Button onPress={addContact} mt={4}>Add Distributor</Button>
            </Box> */}
        </form>
        <FlatList data={stocks} renderItem={({
            item
        }) => <Box borderBottomWidth="1" _dark={{
            borderColor: "gray.600"
        }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                <HStack space={3} justifyContent="space-between">
                    <Avatar size="48px" source={{
                        uri: ""
                    }} />
                    <VStack>
                        <Text _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            {item.item_name}
                        </Text>
                        <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            {item.quantity}
                        </Text>
                    </VStack>
                    <Spacer />
                    <VStack>
                        <Text fontSize="xs" _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" alignSelf="flex-start">
                            {"+91" + item.exp_date}
                        </Text>
                        <Text fontSize="xs" _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" alignSelf="flex-start">
                            {item.price}
                        </Text>
                    </VStack>
                </HStack>
            </Box>} keyExtractor={item => item.id} />
    </Box>;
}

export default Stock;
import React, {useState,useEffect} from "react";
import {
    HStack,
    Text, VStack, Box, Heading, FlatList, Avatar, Spacer
} from "native-base";

const getStock = () => {
    const [stocks, setStocks] = useState();

    const getApiData = async () => {
        const response = await fetch("http://localhost:3000/products", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => res.json());
        setStocks(response);
    }

    useEffect(() => {
        getApiData();
    }, []);

    return stocks;
}

export default getStock;
import React, { useEffect, useState } from "react";
import {
    HStack,
    Text, VStack, Box, Heading, FlatList, Avatar, Spacer
} from "native-base";
import AddDistributor from "./AddDistributor";
import { supabase } from "../../client";

const Distributor = () => {
    const [distributors, setDistributors] = useState([]);

    async function fetchDistributors() {
        const { data } = await supabase.from('distributor').select();
        setDistributors(data);
    }

    async function createDistributor(data) {
        const response = await supabase.from('distributor').insert([{name: data.name, email: data.email, contact: data.contact, description: data.description}]);
        if(response.status === 409) {
            alert("Number already exists!")
        }
        fetchDistributors()
    }

    useEffect(() => {
        fetchDistributors()
    }, []);

    const add = (distributor) => {
        // setDistributors([...distributors, distributor])
        createDistributor(distributor)
        console.log(distributors)
    }

    return <Box>
        <AddDistributor add={add} />
        <Heading fontSize="xl" p="4" pb="3">
            Distributors
        </Heading>
        <FlatList data={distributors} renderItem={({
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
                            {item.name}
                        </Text>
                        <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            {item.description}
                        </Text>
                    </VStack>
                    <Spacer />
                    <VStack>
                        <Text fontSize="xs" _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" alignSelf="flex-start">
                            {"+91" + item.contact}
                        </Text>
                        <Text fontSize="xs" _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" alignSelf="flex-start">
                            {item.email}
                        </Text>
                    </VStack>
                </HStack>
            </Box>} keyExtractor={item => item.id} />
    </Box>;
}

export default Distributor;
import React, { useState } from "react";
import { Input, Stack, FormControl, Button, Box} from 'native-base';

const AddDistributor = (props) => {
    
    const [contact,setContact] = useState({});

    const addContact = (e) => {
        e.preventDefault();
        console.log(contact)
        if(!(contact.name && contact.description && contact.contact && contact.email)) {
            alert("Enter all fields!")
            return
        }
        if(contact.contact.length != 10) {
            alert("Enter valid contact number!")
            return
        }
        props.add(contact)
    }

    const handleChange = (value, key) => {
        setContact({...contact, ...{[key]: value}});
    }

    return (
        <FormControl mt={10}>
            <Stack space={5}>
                <Stack>
                    <Input variant="underlined" p={2} fontSize={14} placeholder="Name" name="name" onChange={(e) => handleChange(e.target.value,"name")}/>
                </Stack>
                <Stack>
                    <Input variant="underlined" p={2} fontSize={14} placeholder="Description" name="description" onChange={(e) => handleChange(e.target.value,"description")}/>
                </Stack>
                <Stack>
                    <Input variant="underlined" p={2} fontSize={14} placeholder="Contact" name="contact" onChange={(e) => handleChange(e.target.value,"contact")}/>
                </Stack>
                <Stack>
                    <Input variant="underlined" p={2} fontSize={14} placeholder="Email" name="email" onChange={(e) => handleChange(e.target.value,"email")}/>
                </Stack>
            </Stack>
            <Box alignItems="center">
                <Button onPress={addContact} mt={4}>Add Distributor</Button>
            </Box>
        </FormControl>
    );
}

export default AddDistributor;
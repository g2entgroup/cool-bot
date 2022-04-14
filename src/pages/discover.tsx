import { SimpleGrid, Text, Box, Button } from "@chakra-ui/react";
import BrandDiscovery from '../components/common/Cards/branddiscovery';
import FilterTab from "../components/common/FilterTab/FilterTab";
export default function Discover() {
    return(
        <Box
            marginBottom={40}
            width='100vw'
            display='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='center'>
            <Box
                width='100vw'
                display='flex'
                flexDir='column'
                alignItems='flex-start'
                justifyContent='flex-start'>
                <Text as="h1" fontSize="4xl" fontStyle="bold" margin="10">Discover and Explore</Text>
                <FilterTab />
            </Box>
            <Box
                display='flex'
                margin='auto'
                flexDir={['column', 'row']}
                flexWrap={['wrap']}
                alignItems='center'
                justifyContent='center'>
                <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=1" name="NFT Name" description="awesome creative NFT" creator="@creator"/>
                <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=2" name="NFT Name" description="awesome creative NFT" creator="@creator" />
                <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=3" name="NFT Name" description="awesome creative NFT" creator="@creator" />
                <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=4" name="NFT Name" description="awesome creative NFT" creator="@creator" />
                <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=5" name="NFT Name" description="awesome creative NFT" creator="@creator" />
                <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=6" name="NFT Name" description="awesome creative NFT" creator="@creator" />
                <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=7" name="NFT Name" description="awesome creative NFT" creator="@creator" />
                <BrandDiscovery imagelink= "https://picsum.photos/200/300.webp?random=8" name="NFT Name" description="awesome creative NFT" creator="@creator" />
            </Box>
            <Box
                display='flex'
                maxWidth='100vw'
                flexDir={['row']}
                padding={[2, 2, 2, 10]}
                alignItems={['center']}
                justifyContent={['center']}
                flexWrap={['nowrap']}>
                <Button colorScheme="pink" isFullWidth={true}>
                    Load More
                </Button>
            </Box>
        </Box>
    )
}

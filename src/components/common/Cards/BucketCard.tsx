import { providers } from 'ethers';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    HStack,
    Button,
    useToken,
    Badge,
    ButtonGroup,
    Flex,
    IconButton,
    Editable,
    EditableInput,
    EditablePreview,
    useEditableControls,
  } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  createLazyMint, 
  generateTokenId
} from '../../../rarible/createLazyMint';
import Lock from '../Lock/lock';
import Image from 'next/image';
// import { OpenSeaPort, Network } from 'opensea-js';
  
const myLoader = ({ src, width }) => {
  return `${src}?w=${width}&q=${75}`
}

type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: providers.ExternalProvider };
  class StrongType<Definition, Type> {
    // @ts-ignore
    private _type: Definition;
    constructor(public value?: Type) {}
  }

  export class EthereumAddress extends StrongType<'ethereum_address', string> {}
  
  const submitHandler = async () => {
    if (!(window as WindowInstanceWithEthereum).ethereum) {
      throw new Error(
        'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
      );
    }

    console.debug('Initializing web3 provider...');
    // @ts-ignore
    const provider = new providers.Web3Provider((window as WindowInstanceWithEthereum).ethereum);

    // TODO: OpenSea Marketplace Function
    // const seaport = new OpenSeaPort(provider, {
    //   networkName: Network.Main
    // })

    const accounts = await (window as WindowInstanceWithEthereum).ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
      throw new Error('No account is provided. Please provide an account to this application.');
    }

  const address = new EthereumAddress(accounts[0]);
    const contract = "0xB0EA149212Eb707a1E5FC1D2d3fD318a8d94cf05";
    const minter = address;
    const ipfsHash = "QmW5kGG6JPDv7oSVEfP8KTY9rsfQXCHpYJxvdRJrkkzbge";
    const tokenId = await generateTokenId(contract, minter)
    //console.log("Chain ID", chainId);
    const useCreateLazyMint = createLazyMint(tokenId, provider, contract, address.value, ipfsHash );
    console.log(await useCreateLazyMint);
  }

  export default function BrandDiscovery({imagelink, creator, name, description, deleteMedia} ) {
    /* Here's a custom control */
    function EditableControls() {
      const {
        isEditing,  
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()

      return isEditing ? (
        <ButtonGroup 
          justifyContent="center" 
          size="sm">
          <IconButton 
            aria-label="Submit" 
            icon={<CheckIcon />} 
            {...getSubmitButtonProps()} 
          />
          <IconButton 
            aria-label="Close" 
            icon={<CloseIcon />} 
            {...getCancelButtonProps()} 
          />
        </ButtonGroup>
      ) : (
        <Flex justifyContent="center">
          <IconButton 
            aria-label="Edit" 
            size="sm" 
            icon={<EditIcon />} 
            {...getEditButtonProps()} 
          />
        </Flex>
      )
    }

    const truncateText = (text: string, number: number) => {
      if (text.length <= number) {
        return text
      }
      // Return str truncated with '...' concatenated to the end of str.
      return text.slice(0, number) + '...'
    }

    return (
      <>
        <Center>
          <Box
            role={'group'}
            maxW='sm'
            overflow="hidden"
            width='full'
            height='auto'
            margin={5}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            borderWidth="1px"
            rounded="lg"
            pos={'relative'}
            zIndex={0}
            >
              <Center>
            <Box
              rounded={'lg'}
              mt={-12}
              pos={'relative'}
              height={'230px'}
              _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                backgroundImage: `url(${imagelink})`,
                filter: 'blur(15px)',
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: 'blur(20px)',
                },
              }}>
              <Image
                loader={myLoader}
                height={230}
                width={282}
                objectFit={'cover'}
                src={imagelink}
              />
            </Box>
            </Center>
            <Stack 
              pt={10} 
              align={'center'} 
              color={useColorModeValue("black", "white")}>
              <Text
                color={'gray.500'} 
                fontSize={'sm'} 
                textTransform={'uppercase'} 
                defaultValue={creator} />
              <Editable 
                color={'gray.500'} 
                fontSize={'sm'} 
                textTransform={'uppercase'} 
                defaultValue={truncateText(name, 10)} 
                isPreviewFocusable={false}>
                <EditablePreview />
                <EditableInput />
                <EditableControls />
              </Editable>
              <Editable 
                color={'gray.500'} 
                fontSize={'2xl'} 
                fontFamily={'body'} 
                fontWeight={500} 
                defaultValue={truncateText(description, 20)} 
                isPreviewFocusable={false}>
                <EditablePreview />
                <EditableInput />
                <EditableControls />
              </Editable>
            </Stack>

          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'black')}
              fontWeight={'400'}>
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'black')}
              fontWeight={'400'}>
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'black')}
              fontWeight={'400'}>
              #music
            </Badge>
          </Stack>
          <HStack m={4} direction={'row'} spacing={4}>
            <Lock />
          </HStack>
          <HStack m={4} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'md'}
              bg={'red.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'red.500',
              }}
              _focus={{
                bg: 'red.500',
              }}
              onClick={deleteMedia}
              >
              Delete
            </Button>
          </HStack>
          <HStack m={4} direction={'row'} spacing={4}>
          <Button
              flex={1}
              fontSize={'sm'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={void(null)}
              >
              OpenSea Mint
            </Button>
            <Button
              flex={1}
              fontSize={'smaller'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={submitHandler}
              >
              Rarible Mint
            </Button>
          </HStack>
          <HStack m={4} direction={'row'} spacing={4}>
          <Button
              flex={1}
              fontSize={'smaller'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={submitHandler}
              >
              Submit to Campaign
            </Button>
          </HStack>
        </Box>
        </Center>
    </>
    );
  }
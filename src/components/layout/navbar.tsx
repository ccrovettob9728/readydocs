import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  Image,
} from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"
import Link from "next/link"
import cube from '../../../public/images/cuboNew.png'

export function Navbar() {
  return (
    <Box
      bg={{ base: "white", _dark: "gray.800" }}
      px={6}
      borderBottom="1px solid"
      borderColor={{ base: "gray.200", _dark: "gray.700" }}
    >
      
      <Flex h={16} alignItems="center">
        {/* Logo */}
        <Image src={cube.src} alt="Home Hero Image" boxSize="20" objectFit="contain" />
        <Link href="/" passHref>
        
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={{ base: "gray.800", _dark: "white" }}
            cursor="pointer"
          >
            ReadyDocs
          </Text>
        </Link>

        {/* Navegación */}
        <Spacer />

        <HStack gap={8}>
          <Link href="/">
            <Text
              cursor="pointer"
              color={{ base: "gray.700", _dark: "gray.200" }}
              _hover={{ color: "blue.500" }}
            >
              Inicio
            </Text>
          </Link>

          <Link href="/afiliados">
            <Text
              cursor="pointer"
              color={{ base: "gray.700", _dark: "gray.200" }}
              _hover={{ color: "blue.500" }}
            >
              Afiliados
            </Text>
          </Link>

          <Link href="/contacto">
            <Text
              cursor="pointer"
              color={{ base: "gray.700", _dark: "gray.200" }}
              _hover={{ color: "blue.500" }}
            >
              Contacto
            </Text>
          </Link>
        </HStack>

        <Spacer />

        {/* Acciones */}
        <HStack gap={3}>
          <ColorModeButton />

          <Button
            asChild
            colorPalette="blue"
            variant="solid"
            size="sm"
          >
            <Link href="/login">Login</Link>
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}
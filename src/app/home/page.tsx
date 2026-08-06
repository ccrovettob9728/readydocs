'use client'

import { Box, Container, Flex, Heading, Text, Image } from "@chakra-ui/react"
import cube from "../../../public/images/cuboNew.png"

export default function HomePage() {
  return (
    <Container maxW="6xl" py={10}>
      <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap={8}>
        <Box flex="1">
          <Heading as="h1" size="2xl" mb={4}>
            Bienvenido a Nuestra Plataforma
          </Heading>
          <Text fontSize="lg" color="fg.muted">
            La solución integral para la gestión de tus contratistas.
          </Text>
        </Box>
        <Box flex="1">
          <Image src={cube.src} alt="Home Hero Image" boxSize="full" objectFit="contain" />
        </Box>
      </Flex>
    </Container>
  )
}

'use client'

import { Box, Container, Stack, Text } from "@chakra-ui/react"

export function Footer() {
  return (
    <Box 
      bg={{ base: "gray.50", _dark: "gray.900" }} 
      color={{ base: "gray.700", _dark: "gray.200" }} 
      mt="auto"
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: "column", md: "row" }}
        gap={4}
        // En v3 usamos los nombres completos de CSS:
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
      >
        <Text>© {new Date().getFullYear()} ReadyDocs. Todos los derechos reservados.</Text>
      </Container>
    </Box>
  )
}

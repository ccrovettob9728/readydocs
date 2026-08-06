'use client'

import { Button, Container, Heading, Text, SimpleGrid, Box, Table, Stack } from "@chakra-ui/react"
import { ColorModeButton } from "@/components/ui/color-mode"
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const contratistas = [
    { id: 1, empresa: "Constructora Alfabeta", rut: "76.123.456-7", personal: 14, estado: "Aprobado" },
    { id: 2, empresa: "Electricidad Pérez", rut: "77.987.654-K", personal: 5, estado: "Pendiente" },
    { id: 3, empresa: "Servicios Encofrado SpA", rut: "75.456.789-2", personal: 22, estado: "Rechazado" },
  ]

  return (
    <Container maxW="6xl" py={10}>
      {/* Encabezado */}
      <Stack direction="row" justify="space-between" align="center" mb={8}>
        <Box>
          <Heading as="h1" size="xl">Control de Contratistas</Heading>
          <Text color="fg.muted">Panel de acreditación de subcontratos en tiempo real.</Text>
        </Box>
        <Stack direction="row" gap="4" align="center">
          <Button colorPalette="blue" size="lg">
            + Nuevo Contratista
          </Button>
        </Stack>
      </Stack>

      {/* Grid de Tarjetas */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={10}>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="bg.panel">
          <Text fontSize="sm" color="fg.muted" fontWeight="bold">Empresas Activas</Text>
          <Heading size="lg" mt={2}>12</Heading>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="bg.panel">
          <Text fontSize="sm" color="fg.muted" fontWeight="bold">Trabajadores en Obra</Text>
          <Heading size="lg" mt={2}>141</Heading>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="red.900/10" borderColor="red.500/20">
          <Text fontSize="sm" color="red.fg" fontWeight="bold">Documentos Vencidos</Text>
          <Heading size="lg" mt={2} color="red.fg">8</Heading>
        </Box>
      </SimpleGrid>

      {/* Tabla de Datos */}
      <Box borderWidth="1px" borderRadius="md" overflow="hidden" bg="bg.panel" shadow="sm">
        <Table.Root size="md" variant="line">
          <Table.Header bg="bg.muted">
            <Table.Row>
              <Table.ColumnHeader>Razón Social</Table.ColumnHeader>
              <Table.ColumnHeader>RUT</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Personal</Table.ColumnHeader>
              <Table.ColumnHeader>Estado</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Acción</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {contratistas.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell fontWeight="medium">{item.empresa}</Table.Cell>
                <Table.Cell color="fg.muted">{item.rut}</Table.Cell>
                <Table.Cell textAlign="center">{item.personal}</Table.Cell>
                <Table.Cell>
                  <Box
                    as="span"
                    px={2} py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    bg={item.estado === "Aprobado" ? "green.900/20" : item.estado === "Pendiente" ? "orange.900/20" : "red.900/20"}
                    color={item.estado === "Aprobado" ? "green.fg" : item.estado === "Pendiente" ? "orange.fg" : "red.fg"}
                  >
                    {item.estado}
                  </Box>
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/ficha/${item.id}`)}
                  >
                    Ver Ficha
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Container>
  )
}
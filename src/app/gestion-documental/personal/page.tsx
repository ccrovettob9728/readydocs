"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Text,
  Badge,
  IconButton,
  Dialog,
  Portal,
  CloseButton,
  NativeSelect,
} from "@chakra-ui/react";

import {
  Search,
  UserPlus,
  Eye,
  Upload,
  MoreVertical,
  X,
} from "lucide-react";

import { useState } from "react";

type Person = {
  id: number;
  name: string;
  rut: string;
  contractor: string;
  costCenter: string;
  status: "Activo" | "Inactivo";
};

type Document = {
  id: number;
  name: string;
  status: "En línea" | "Sin documento";
  expiration?: string;
  validation?: "Validado" | "Pendiente";
};

const people: Person[] = [
  {
    id: 1,
    name: "Juan Francisco Andres Vega",
    rut: "15594582K",
    contractor: "Seguridad Profesional del Norte SpA",
    costCenter: "I-456 Nueva Arboleda III",
    status: "Activo",
  },
  {
    id: 2,
    name: "Pedro González",
    rut: "18.345.678-2",
    contractor: "Constructora Norte SpA",
    costCenter: "I-456 Nueva Arboleda III",
    status: "Activo",
  },
  {
    id: 3,
    name: "María Pérez",
    rut: "17.234.567-8",
    contractor: "Servicios Generales SpA",
    costCenter: "I-456 Nueva Arboleda III",
    status: "Activo",
  },
];

const fixedDocuments: Document[] = [
  {
    id: 1,
    name: "A1 - Cédula de identidad",
    status: "En línea",
    expiration: "30-07-2033",
    validation: "Validado",
  },
  {
    id: 2,
    name: "A2 - Contrato de trabajo",
    status: "En línea",
    expiration: "30-09-2026",
    validation: "Validado",
  },
  {
    id: 3,
    name: "A9 - Anexo Pacto de horas extra",
    status: "En línea",
    expiration: "30-10-2026",
    validation: "Validado",
  },
  {
    id: 4,
    name: "B9 - Certificación curso OS10",
    status: "En línea",
    expiration: "27-02-2027",
    validation: "Pendiente",
  },
  {
    id: 5,
    name: "Z1 - Formalidades del Término",
    status: "Sin documento",
  },
];

const monthlyDocuments = [
  "M7 - Libro de asistencia del trabajador",
  "M8 - Liquidación de sueldo",
  "M9 - Certificado de pago de Cotizaciones individual",
];

export default function PersonalPage() {
  const [search, setSearch] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [month, setMonth] = useState("Julio de 2026");

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box minH="100vh" bg="gray.50">
      {/* HEADER */}

      <Box
        bg="#1f6f4a"
        color="white"
        px={8}
        py={4}
        boxShadow="sm"
      >
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="sm" opacity={0.8}>
              Gestión documental
            </Text>

            <Heading size="md">
              Personal
            </Heading>
          </Box>

          <Text fontSize="sm">
            Obra: Nueva Arboleda III
          </Text>
        </Flex>
      </Box>

      {/* CONTENIDO */}

      <Box p={{ base: 4, md: 8 }}>
        <Flex
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={4}
          mb={6}
        >
          <Box>
            <Heading size="lg">
              Personal
            </Heading>

            <Text color="gray.500" mt={1}>
              Gestión documental de trabajadores asociados al proyecto.
            </Text>
          </Box>

          <Button
            bg="#35c98a"
            color="white"
            _hover={{ bg: "#2fb57b" }}
          >
            <UserPlus size={17} />
            Agregar persona
          </Button>
        </Flex>

        {/* BUSCADOR */}

        <Flex mb={4}>
          <Box position="relative" maxW="350px" w="full">
            <Box
              position="absolute"
              left="12px"
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              zIndex={1}
            >
              <Search size={17} />
            </Box>

            <Input
              pl="40px"
              bg="white"
              placeholder="Buscar persona..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Flex>

        {/* TABLA PERSONAS */}

        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
          boxShadow="sm"
        >
          <Table.Root size="sm" variant="outline">
            <Table.Header bg="gray.100">
              <Table.Row>
                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                <Table.ColumnHeader>RUT</Table.ColumnHeader>
                <Table.ColumnHeader>Contratista</Table.ColumnHeader>
                <Table.ColumnHeader>Centro de costo</Table.ColumnHeader>
                <Table.ColumnHeader>Estado</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">
                  Documentación
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {filteredPeople.map((person) => (
                <Table.Row key={person.id}>
                  <Table.Cell fontWeight="medium">
                    {person.name}
                  </Table.Cell>

                  <Table.Cell>
                    {person.rut}
                  </Table.Cell>

                  <Table.Cell>
                    {person.contractor}
                  </Table.Cell>

                  <Table.Cell>
                    {person.costCenter}
                  </Table.Cell>

                  <Table.Cell>
                    <Badge
                      colorPalette="green"
                      variant="subtle"
                    >
                      {person.status}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell textAlign="right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPerson(person)}
                    >
                      <Eye size={16} />
                      Ver documentos
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>

      {/* MODAL DOCUMENTACIÓN */}

      <Dialog.Root
        open={!!selectedPerson}
        onOpenChange={(details) => {
          if (!details.open) {
            setSelectedPerson(null);
          }
        }}
        size="xl"
      >
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content
              maxW="1000px"
              maxH="90vh"
              overflow="hidden"
            >
              <Dialog.Header
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Dialog.Title>
                  Documentación
                </Dialog.Title>

                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>

              <Dialog.Body overflowY="auto" p={6}>
                {selectedPerson && (
                  <>
                    {/* INFORMACIÓN PERSONA */}

                    <Box mb={8}>
                      <Table.Root size="sm">
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell
                              fontWeight="600"
                              w="150px"
                            >
                              Nombre
                            </Table.Cell>

                            <Table.Cell>
                              {selectedPerson.name.toUpperCase()}
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell fontWeight="600">
                              RUT
                            </Table.Cell>

                            <Table.Cell>
                              {selectedPerson.rut}
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell fontWeight="600">
                              Contratista
                            </Table.Cell>

                            <Table.Cell>
                              {selectedPerson.contractor}
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell fontWeight="600">
                              Centro Costo
                            </Table.Cell>

                            <Table.Cell>
                              {selectedPerson.costCenter}
                            </Table.Cell>
                          </Table.Row>

                          <Table.Row>
                            <Table.Cell fontWeight="600">
                              Estado
                            </Table.Cell>

                            <Table.Cell>
                              <Text
                                color="green.600"
                                fontWeight="600"
                              >
                                {selectedPerson.status}
                              </Text>
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table.Root>
                    </Box>

                    {/* DOCUMENTOS FIJOS */}

                    <Heading
                      size="sm"
                      pb={3}
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      mb={2}
                    >
                      Documentos Fijos
                    </Heading>

                    <Box overflowX="auto">
                      <Table.Root size="sm">
                        <Table.Header bg="gray.100">
                          <Table.Row>
                            <Table.ColumnHeader>
                              Nombre documento
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Estado
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Vencimiento
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Validación
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Ver
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Cargar
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Más acciones
                            </Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {fixedDocuments.map((document) => (
                            <Table.Row
                              key={document.id}
                              bg={
                                document.validation === "Validado"
                                  ? "green.50"
                                  : "white"
                              }
                            >
                              <Table.Cell
                                fontWeight="600"
                                maxW="220px"
                              >
                                {document.name}
                              </Table.Cell>

                              <Table.Cell>
                                {document.status === "En línea" ? (
                                  <Text
                                    color="green.600"
                                    fontSize="sm"
                                  >
                                    En línea
                                  </Text>
                                ) : (
                                  <Text
                                    color="gray.400"
                                    fontSize="sm"
                                  >
                                    Sin documento
                                  </Text>
                                )}
                              </Table.Cell>

                              <Table.Cell>
                                {document.expiration ?? "-"}
                              </Table.Cell>

                              <Table.Cell>
                                {document.validation === "Validado" ? (
                                  <Text
                                    color="green.600"
                                    fontWeight="600"
                                    fontSize="sm"
                                  >
                                    Validado
                                  </Text>
                                ) : document.validation ===
                                  "Pendiente" ? (
                                  <Text fontSize="sm">
                                    Pendiente
                                  </Text>
                                ) : (
                                  "-"
                                )}
                              </Table.Cell>

                              <Table.Cell>
                                <IconButton
                                  aria-label="Ver documento"
                                  size="sm"
                                  variant="ghost"
                                >
                                  <Eye size={16} />
                                </IconButton>
                              </Table.Cell>

                              <Table.Cell>
                                <IconButton
                                  aria-label="Cargar documento"
                                  size="sm"
                                  bg="#35c98a"
                                  color="white"
                                >
                                  <Upload size={16} />
                                </IconButton>
                              </Table.Cell>

                              <Table.Cell>
                                <IconButton
                                  aria-label="Más acciones"
                                  size="sm"
                                  variant="subtle"
                                >
                                  <MoreVertical size={16} />
                                </IconButton>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </Box>

                    {/* DOCUMENTOS MENSUALES */}

                    <Box mt={10}>
                      <Heading
                        size="sm"
                        pb={3}
                        borderBottom="1px solid"
                        borderColor="gray.200"
                      >
                        Documentos Mensuales
                      </Heading>

                      <Flex
                        align="center"
                        gap={4}
                        py={5}
                      >
                        <Text fontSize="sm" fontWeight="600">
                          Cambiar período
                        </Text>

                        <NativeSelect.Root size="sm" w="180px">
                          <NativeSelect.Field
                            value={month}
                            onChange={(e) =>
                              setMonth(e.target.value)
                            }
                          >
                            <option value="Julio de 2026">
                              Julio de 2026
                            </option>

                            <option value="Junio de 2026">
                              Junio de 2026
                            </option>

                            <option value="Mayo de 2026">
                              Mayo de 2026
                            </option>
                          </NativeSelect.Field>
                        </NativeSelect.Root>
                      </Flex>

                      <Table.Root size="sm">
                        <Table.Header bg="gray.100">
                          <Table.Row>
                            <Table.ColumnHeader>
                              Nombre documento
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Estado
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Validación
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Ver
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Cargar
                            </Table.ColumnHeader>

                            <Table.ColumnHeader>
                              Más acciones
                            </Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {monthlyDocuments.map((document, index) => (
                            <Table.Row key={index}>
                              <Table.Cell fontWeight="600">
                                {document}
                              </Table.Cell>

                              <Table.Cell>-</Table.Cell>

                              <Table.Cell>-</Table.Cell>

                              <Table.Cell>
                                <IconButton
                                  aria-label="Ver documento"
                                  size="sm"
                                  variant="subtle"
                                >
                                  <Eye size={16} />
                                </IconButton>
                              </Table.Cell>

                              <Table.Cell>
                                <IconButton
                                  aria-label="Cargar documento"
                                  size="sm"
                                  bg="#35c98a"
                                  color="white"
                                >
                                  <Upload size={16} />
                                </IconButton>
                              </Table.Cell>

                              <Table.Cell>
                                <IconButton
                                  aria-label="Más acciones"
                                  size="sm"
                                  variant="subtle"
                                >
                                  <MoreVertical size={16} />
                                </IconButton>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </Box>
                  </>
                )}
              </Dialog.Body>

              <Dialog.Footer
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline">
                    Cerrar
                  </Button>
                </Dialog.CloseTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
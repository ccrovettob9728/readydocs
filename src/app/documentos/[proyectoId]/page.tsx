'use client'

import {
  Accordion,
  Box,
  Button,
  Container,
  Heading,
  Table,
  Text,
} from "@chakra-ui/react"

export default function DocumentosProyecto() {

  const grupo1 = [
    {
      nombre: "Contrato de Trabajo",
      descripcion: "Contrato firmado",
      subido: true,
      validado: true
    },
    {
      nombre: "Certificado AFP",
      descripcion: "Pago AFP",
      subido: false,
      validado: false
    },
    {
      nombre: "Certificado Mutual",
      descripcion: "Mutual vigente",
      subido: true,
      validado: false
    }
  ]

  const grupo2 = [
    {
      nombre: "Reglamento Interno",
      descripcion: "Versión vigente",
      subido: true,
      validado: true
    },
    {
      nombre: "Prevención de Riesgos",
      descripcion: "Documento firmado",
      subido: false,
      validado: false
    }
  ]

  return (

    <Container
      maxW="7xl"
      py={10}
    >

      <Heading mb={8}>
        Documentos del Proyecto
      </Heading>

      <Accordion.Root multiple>

        <Accordion.Item value="grupo1">

          <Accordion.ItemTrigger>

            <Box flex="1">
              Grupo de Documentos 1
            </Box>

            <Accordion.ItemIndicator />

          </Accordion.ItemTrigger>

          <Accordion.ItemContent>

            <Accordion.ItemBody>

              <TablaDocumentos documentos={grupo1} />

            </Accordion.ItemBody>

          </Accordion.ItemContent>

        </Accordion.Item>

        <Accordion.Item value="grupo2">

          <Accordion.ItemTrigger>

            <Box flex="1">
              Grupo de Documentos 2
            </Box>

            <Accordion.ItemIndicator />

          </Accordion.ItemTrigger>

          <Accordion.ItemContent>

            <Accordion.ItemBody>

              <TablaDocumentos documentos={grupo2} />

            </Accordion.ItemBody>

          </Accordion.ItemContent>

        </Accordion.Item>

      </Accordion.Root>

    </Container>

  )

}

function TablaDocumentos({
  documentos
}: {
  documentos: any[]
}) {

  return (

    <Table.Root>

      <Table.Header>

        <Table.Row>

          <Table.ColumnHeader>
            Documento
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            Descripción
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            Subido
          </Table.ColumnHeader>

          <Table.ColumnHeader>
            Validado
          </Table.ColumnHeader>

          <Table.ColumnHeader textAlign="end">
            Acciones
          </Table.ColumnHeader>

        </Table.Row>

      </Table.Header>

      <Table.Body>

        {documentos.map((doc) => (

          <Table.Row key={doc.nombre}>

            <Table.Cell>
              {doc.nombre}
            </Table.Cell>

            <Table.Cell>
              {doc.descripcion}
            </Table.Cell>

            <Table.Cell>
              {doc.subido ? "Sí" : "No"}
            </Table.Cell>

            <Table.Cell>
              {doc.validado ? "Sí" : "No"}
            </Table.Cell>

            <Table.Cell textAlign="end">

              <Button
                size="xs"
                colorPalette="blue"
                mr={2}
              >
                Subir
              </Button>

              <Button
                size="xs"
                colorPalette="red"
              >
                Eliminar
              </Button>

            </Table.Cell>

          </Table.Row>

        ))}

      </Table.Body>

    </Table.Root>

  )

}
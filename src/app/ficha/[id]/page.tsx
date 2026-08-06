'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Heading,
    Stack,
    Table,
    Text,
    Dialog,
    Input,
    Textarea,
    CloseButton,
    Field,
    Switch,
    HStack,
    Badge,
} from "@chakra-ui/react"
import { LuTrash2 } from "react-icons/lu";
import { IconButton } from "@chakra-ui/react";

export default function FichaEmpresa() {
    const router = useRouter()
    const [open, setOpen] = useState(false);

    const [proyectos, setProyectos] = useState([
        {
            id: 1,
            nombre: "Construcción Planta Norte",
            descripcion: "Obra civil correspondiente al sector norte.",
            activo: true,
        },
        {
            id: 2,
            nombre: "Mantención Mina",
            descripcion: "Contrato de mantención preventiva.",
            activo: false,
        },
    ]);

    const [nombreProyecto, setNombreProyecto] = useState("");
    const [descripcionProyecto, setDescripcionProyecto] = useState("");
    const [estadoProyecto, setEstadoProyecto] = useState(true);
    const [nuevoProyecto, setNuevoProyecto] = useState({
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "Activo",
    });

    const eliminarProyecto = (id: number) => {
        setProyectos((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <Container maxW="7xl" py={10}>
            {/* Encabezado */}
            <Stack
                direction="row"
                justify="space-between"
                align="center"
                mb={8}
            >
                <Box>
                    <Heading size="xl">
                        Constructora Alfabeta
                    </Heading>

                    <Text color="fg.muted">
                        Proyectos asociados a la empresa.
                    </Text>
                </Box>

                <Button
                    colorPalette="green"
                    onClick={() => setOpen(true)}
                >
                    + Agregar Proyecto
                </Button>
            </Stack>

            {/* Tabla */}
            <Box
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                bg="bg.panel"
            >
                <Table.Root variant="line">
                    <Table.Header bg="bg.muted">
                        <Table.Row>
                            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                            <Table.ColumnHeader>Descripción</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">
                                Estado
                            </Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end">
                                Acciones
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {proyectos.map((proyecto) => (
                            <Table.Row key={proyecto.id}>
                                <Table.Cell fontWeight="medium">
                                    {proyecto.nombre}
                                </Table.Cell>

                                <Table.Cell color="fg.muted">
                                    {proyecto.descripcion}
                                </Table.Cell>

                                <Table.Cell textAlign="center">
                                    <Switch.Root
                                        checked={proyecto.activo}
                                        onCheckedChange={(e) => {
                                            setProyectos((prev) =>
                                                prev.map((p) =>
                                                    p.id === proyecto.id
                                                        ? { ...p, activo: e.checked }
                                                        : p
                                                )
                                            );
                                        }}
                                    >
                                        <Switch.HiddenInput />
                                        <Switch.Control />
                                        <Switch.Label>
                                            <Badge
                                                colorPalette={proyecto.activo ? "green" : "red"}
                                                w="20"
                                                justifyContent="center"
                                            >
                                                {proyecto.activo ? "Activo" : "Inactivo"}
                                            </Badge>
                                        </Switch.Label>
                                    </Switch.Root>
                                </Table.Cell>

                                <Table.Cell textAlign="end">
                                    <HStack justify="flex-end">

                                        <Button
                                            size="sm"
                                            colorPalette="blue"
                                            onClick={() => router.push(`/documentos/${proyecto.id}`)}
                                        >
                                            Ver documentos
                                        </Button>

                                        <IconButton
                                            aria-label="Eliminar proyecto"
                                            colorPalette="red"
                                            variant="ghost"
                                            onClick={() => eliminarProyecto(proyecto.id)}
                                        >
                                            <LuTrash2 />
                                        </IconButton>

                                    </HStack>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>
            <Dialog.Root
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
            >
                <Dialog.Backdrop
                    bg="blackAlpha.800"
                />

                <Dialog.Positioner
                    alignItems="flex-start"
                    pt="8vh"
                >
                    <Dialog.Content
                        maxW="700px"
                        mx={4}
                        borderRadius="xl"
                    >


                        <Dialog.Header>
                            <Dialog.Title>Nuevo Proyecto</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>

                            <Field.Root mb={4}>
                                <Field.Label>Nombre del Proyecto</Field.Label>
                                <Input
                                    value={nombreProyecto}
                                    onChange={(e) => setNombreProyecto(e.target.value)}
                                />


                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Descripción</Field.Label>
                                <Textarea
                                    value={descripcionProyecto}
                                    onChange={(e) => setDescripcionProyecto(e.target.value)}
                                />
                            </Field.Root>

                        </Dialog.Body>

                        <Dialog.Footer>

                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                colorPalette="green"
                                onClick={() => {

                                    setProyectos([
                                        ...proyectos,
                                        {
                                            id: proyectos.length + 1,
                                            nombre: nombreProyecto,
                                            descripcion: descripcionProyecto,
                                            activo: estadoProyecto,
                                        },
                                    ]);

                                    setNombreProyecto("");
                                    setDescripcionProyecto("");
                                    setOpen(false);

                                }}
                            >
                                Guardar
                            </Button>

                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </Container>

    )

}
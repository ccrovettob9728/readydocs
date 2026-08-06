"use client";

import {
    Box,
    Button,
    Card,
    Group,
    Input,
    InputElement,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";
import { LuLock, LuUser } from "react-icons/lu";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function LoginCard() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("token", data.token);

            router.push("/dashboard");
        } else {
            //alert(data.message);
        }
    };
    return (
        <Box className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <Card.Root
                maxW="400px"
                w="full"
                borderRadius="2xl"
                boxShadow="xl"
                bg={{ base: "white", _dark: "gray.800" }}
            >
                <Card.Body p={8}>
                    <Stack gap={6}>
                        <Box textAlign="center">
                            <Text fontSize="2xl" fontWeight="bold">
                                Iniciar sesión
                            </Text>

                            <Text color="gray.500" fontSize="sm" mt={2}>
                                Ingresa tus credenciales
                            </Text>
                        </Box>

                        <Group>
                            <InputElement pointerEvents="none">
                                <LuUser />
                            </InputElement>

                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Usuario"
                                ps="10"
                            />


                        </Group>

                        <Group>
                            <InputElement pointerEvents="none">
                                <LuLock />
                            </InputElement>

                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Contraseña"
                                ps="10"
                            />
                        </Group>

                        <Button onClick={handleLogin}>
                            Login
                        </Button>

                        <Link
                            href="#"
                            color="blue.500"
                            textAlign="center"
                            fontSize="sm"
                        >
                            Recuperar contraseña
                        </Link>
                    </Stack>
                </Card.Body>
            </Card.Root>
        </Box>
    );
}
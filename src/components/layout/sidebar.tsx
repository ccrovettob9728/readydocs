"use client";

import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";

import {
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Building2,
  Home,
  ShieldCheck,
  User,
  Users,
  Car,
  Wallet,
  MapPin,
  Settings,
  Menu,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "./SidebarContext";

const BLUE = "#2563EB";
const BLUE_DARK = "#1D4ED8";

type MenuItemProps = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  collapsed?: boolean;
};

function MenuItem({
  href,
  label,
  icon,
  active = false,
  collapsed = false,
}: MenuItemProps) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        display: "block",
      }}
    >
      <Flex
        align="center"
        justify={collapsed ? "center" : "flex-start"}
        gap={2.5}
        px={collapsed ? 2 : 4}
        py={2.5}
        mx={2}
        mb={1}
        minH="40px"
        borderRadius="7px"
        cursor="pointer"
        color={active ? BLUE : "gray.700"}
        bg={active ? "blue.50" : "transparent"}
        fontSize="13px"
        fontWeight={active ? "600" : "400"}
        transition="all 0.15s ease"
        _hover={{
          bg: active ? "blue.50" : "gray.50",
          color: BLUE,
        }}
      >
        <Icon
          as={icon}
          boxSize="13px"
          strokeWidth={1.8}
          flexShrink={0}
          color={active ? BLUE : BLUE}
        />

        {!collapsed && (
          <Text
            whiteSpace="nowrap"
            lineHeight="1"
          >
            {label}
          </Text>
        )}
      </Flex>
    </Link>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
  collapsed: boolean;
  open: boolean;
  onToggle: () => void;
};

function SidebarSection({
  title,
  children,
  collapsed,
  open,
  onToggle,
}: SectionProps) {
  /*
   * En modo colapsado no mostramos el título.
   * Dejamos los íconos centrados.
   */
  if (collapsed) {
    return (
      <Box mt={4}>
        <Box
          mx={4}
          mb={3}
          borderTop="1px solid"
          borderColor="gray.200"
        />

        {open && children}
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Flex
        align="center"
        justify="space-between"
        px={4}
        mb={2}
        h="22px"
        cursor="pointer"
        onClick={onToggle}
        color={BLUE}
        fontSize="10px"
        fontWeight="700"
        letterSpacing="0.45px"
        textTransform="uppercase"
        userSelect="none"
        _hover={{
          color: BLUE_DARK,
        }}
      >
        <Text>{title}</Text>

        <Icon
          as={open ? ChevronDown : ChevronRight}
          boxSize="12px"
          strokeWidth={2}
        />
      </Flex>

      {open && children}
    </Box>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const {
    collapsed,
    toggleSidebar,
  } = useSidebar();

  const [openSections, setOpenSections] = useState({
    ingresos: true,
    gestionDocumental: true,
    prevencion: true,
  });

  const toggleSection = (
    section: keyof typeof openSections
  ) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      zIndex={1000}
      w={collapsed ? "72px" : "255px"}
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      transition="width 0.2s ease"
      overflow="hidden"
      boxShadow="sm"
    >
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <Flex
        h="64px"
        px={collapsed ? 2 : 4}
        align="center"
        justify={
          collapsed
            ? "center"
            : "space-between"
        }
        bg={BLUE}
        color="white"
      >
        {/* LOGO + TEXTO */}

        {!collapsed && (
          <Flex
            align="center"
            gap={2.5}
            minW={0}
          >
            <Image
              src="/cuboNew.png"
              alt="ReadyDocs"
              w="40px"
              h="40px"
              objectFit="contain"
              flexShrink={0}
            />

            <Box>
              <Text
                fontSize="17px"
                fontWeight="700"
                lineHeight="1"
                letterSpacing="-0.2px"
              >
                ReadyDocs
              </Text>

              <Text
                fontSize="9px"
                opacity={0.8}
                mt="4px"
                lineHeight="1"
              >
                Gestión documental
              </Text>
            </Box>
          </Flex>
        )}

        {/* LOGO COLAPSADO */}

        {collapsed && (
          <Image
            src="/cuboNew.png"
            alt="ReadyDocs"
            w="40px"
            h="40px"
            objectFit="contain"
          />
        )}

        {/* BOTÓN */}

        {!collapsed && (
          <IconButton
            aria-label="Contraer menú"
            variant="ghost"
            color="white"
            size="sm"
            minW="30px"
            w="30px"
            h="30px"
            onClick={toggleSidebar}
            _hover={{
              bg: "whiteAlpha.200",
            }}
          >
            <Menu size={17} />
          </IconButton>
        )}

        {collapsed && (
          <IconButton
            aria-label="Expandir menú"
            variant="ghost"
            color="white"
            size="sm"
            position="absolute"
            right="2px"
            top="17px"
            minW="28px"
            w="28px"
            h="28px"
            opacity={0}
            _hover={{
              opacity: 1,
              bg: "whiteAlpha.200",
            }}
            onClick={toggleSidebar}
          >
            <Menu size={16} />
          </IconButton>
        )}
      </Flex>

      {/* ================================================= */}
      {/* MENU */}
      {/* ================================================= */}

      <Box
        h="calc(100vh - 64px)"
        overflowY="auto"
        py={3}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "#d1d5db",
            borderRadius: "4px",
          },

          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      >
        {/* ================================================= */}
        {/* PRINCIPAL */}
        {/* ================================================= */}

        {!collapsed && (
          <Box
            px={4}
            mb={2}
            color="gray.400"
            fontSize="9px"
            fontWeight="700"
            letterSpacing="0.5px"
            textTransform="uppercase"
          >
            Principal
          </Box>
        )}

        <MenuItem
          href="/dashboard"
          label="Página Principal"
          icon={Home}
          active={isActive("/dashboard")}
          collapsed={collapsed}
        />

        {/* ================================================= */}
        {/* INGRESOS */}
        {/* ================================================= */}

        <SidebarSection
          title="Ingresos"
          collapsed={collapsed}
          open={openSections.ingresos}
          onToggle={() =>
            toggleSection("ingresos")
          }
        >
          <MenuItem
            href="/ingresos"
            label="Ingresos"
            icon={Wallet}
            active={isActive("/ingresos")}
            collapsed={collapsed}
          />
        </SidebarSection>

        {/* ================================================= */}
        {/* GESTIÓN DOCUMENTAL */}
        {/* ================================================= */}

        <SidebarSection
          title="Gestión documental"
          collapsed={collapsed}
          open={openSections.gestionDocumental}
          onToggle={() =>
            toggleSection("gestionDocumental")
          }
        >
          <MenuItem
            href="/gestion-documental/empresa"
            label="Empresa"
            icon={Building2}
            active={isActive(
              "/gestion-documental/empresa"
            )}
            collapsed={collapsed}
          />

          <MenuItem
            href="/gestion-documental/centro-costos"
            label="Centro de costos"
            icon={MapPin}
            active={isActive(
              "/gestion-documental/centro-costos"
            )}
            collapsed={collapsed}
          />

          <MenuItem
            href="/gestion-documental/personal"
            label="Personal"
            icon={Users}
            active={isActive(
              "/gestion-documental/personal"
            )}
            collapsed={collapsed}
          />

          <MenuItem
            href="/gestion-documental/vehiculos"
            label="Vehículos"
            icon={Car}
            active={isActive(
              "/gestion-documental/vehiculos"
            )}
            collapsed={collapsed}
          />

          <MenuItem
            href="/gestion-documental/cumplimiento"
            label="Reporte Cumplimiento"
            icon={ClipboardCheck}
            active={isActive(
              "/gestion-documental/cumplimiento"
            )}
            collapsed={collapsed}
          />
        </SidebarSection>

        {/* ================================================= */}
        {/* PREVENCIÓN */}
        {/* ================================================= */}

        <SidebarSection
          title="Prevención de riesgos"
          collapsed={collapsed}
          open={openSections.prevencion}
          onToggle={() =>
            toggleSection("prevencion")
          }
        >
          <MenuItem
            href="/prevencion/gestion-documental"
            label="Gestión documental"
            icon={ShieldCheck}
            active={isActive(
              "/prevencion/gestion-documental"
            )}
            collapsed={collapsed}
          />
        </SidebarSection>

        {/* ================================================= */}
        {/* SEPARADOR */}
        {/* ================================================= */}

        <Box
          mx={4}
          mt={6}
          mb={3}
          borderTop="1px solid"
          borderColor="gray.200"
        />

        {/* ================================================= */}
        {/* PERFIL */}
        {/* ================================================= */}

        <MenuItem
          href="/perfil"
          label="Perfil"
          icon={User}
          active={isActive("/perfil")}
          collapsed={collapsed}
        />

        {/* ================================================= */}
        {/* CONFIGURACIÓN */}
        {/* ================================================= */}

        <MenuItem
          href="/configuracion"
          label="Configuración"
          icon={Settings}
          active={isActive("/configuracion")}
          collapsed={collapsed}
        />
      </Box>
    </Box>
  );
}
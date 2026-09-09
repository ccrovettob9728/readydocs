"use client";

import { Box } from "@chakra-ui/react";
import Sidebar from "./sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "./SidebarContext";

function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();

  return (
    <Box minH="100vh" bg="gray.50">
      <Sidebar />

      <Box
        ml={collapsed ? "72px" : "255px"}
        transition="margin-left 0.2s ease"
        minH="100vh"
      >
        {children}
      </Box>
    </Box>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <LayoutContent>
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
}
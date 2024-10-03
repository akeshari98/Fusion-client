import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import SidebarContent from "./sidebarContent";

import PropTypes from "prop-types";
import Header from "./header";

export function Layout({ children }) {
  const [opened, { close, open }] = useDisclosure(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    isCollapsed ? open() : close();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AppShell
      layout="alt"
      header={{ height: 64 }}
      navbar={{
        width: isCollapsed ? 60 : 240,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      bg="#fbfbfb"
    >
      <AppShell.Header bg="#fbfbfb">
        <Header opened={opened} toggleSidebar={toggleSidebar} />
      </AppShell.Header>

      <AppShell.Navbar
        pl="xs"
        style={{
          transition: "width 0.5s ease-in-out",
          overflow: "hidden",
        }}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
        />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
import { Menu, MenuContent, MenuFooter, MenuHeader } from "@/components/menu";
import { FindAllChatThreadForCurrentUser } from "@/features/chat/chat-services/chat-thread-service";
import { ThemeToggle } from "@/features/theme/theme-toggle";
import { MenuItems } from "./menu-items";
import { NewChat } from "./new-chat";
import { QA } from "./new-qa";

export const ChatMenu = async () => {
  const items = await FindAllChatThreadForCurrentUser();

  return (
    <Menu>
      <MenuHeader className="justify-end gap-3">
        <QA />
        <NewChat />
      </MenuHeader>
      <MenuContent>
        <MenuItems menuItems={items} />
      </MenuContent>
      <MenuFooter>
        <div className="flex flex-col gap-3">
          <ThemeToggle />
        </div>
      </MenuFooter>
    </Menu>
  );
};

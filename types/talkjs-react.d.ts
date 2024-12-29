declare module "@talkjs/react" {
  import Talk from "talkjs";

  interface ChatboxProps {
    conversationBuilder?: (
      conversationBuilder: Talk.ConversationBuilder
    ) => void;
    className?: string;
    // Include other props as needed
  }
}

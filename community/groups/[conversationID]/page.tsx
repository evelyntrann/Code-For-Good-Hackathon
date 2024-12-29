// app/chat/[conversationID]/page.tsx

"use client";

import React from "react";
import { useParams } from "next/navigation";
import Chat from "./Chat";
import { ChevronRight, CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ChatPage = () => {
  const params = useParams();
  const { conversationID } = params;

  if (!conversationID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pl-20  mx-auto max-w-8xl">
      <section className="flex items-center justify-center py-32">
        <div className="container max-w-8xl">
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="max-h-screen w-full rounded-lg object-cover pl-10 md:w-2/3 md:pr-6">
              <Chat conversationID={conversationID as string} />
            </div>
            <div className="lg:p-6">
              <h2 className="text-balance text-3xl font-medium md:text-5xl">
                Group {conversationID}:
              </h2>
              <p className="mt-1 text-muted-foreground md:mt-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                alias unde et doloremque dignissimos error temporibus quisquam
                porro ducimus esse quod, a officiis.
              </p>
              <Link href={"/resources"}>
                <Button variant={"outline"} className="mt-6">
                  Learn more <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
              <ul className="mt-10 flex-wrap items-center gap-6 space-y-6 md:flex md:space-y-0">
                <li className="flex items-center gap-3">
                  <CircleCheckBig className="size-4" /> Quality
                </li>
                <li className="flex items-center gap-3">
                  <CircleCheckBig className="size-4" />
                  Multi-purpose
                </li>
                <li className="flex items-center gap-3">
                  <CircleCheckBig className="size-4" /> Easy to use
                </li>
                <li className="flex items-center gap-3">
                  <CircleCheckBig className="size-4" /> Fast
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatPage;

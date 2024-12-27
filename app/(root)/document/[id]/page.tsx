import { currentUser } from "@clerk/nextjs/server";
import React, { useRef, useState } from "react";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import ActiveCollaborators from "@/components/ActiveCollaborators";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import DocumentName from "@/components/DocumentName";
import ShareModal from "@/components/ShareModal";
import Document from "@/components/Document";

const page = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const adminEmail = clerkUser.emailAddresses[0].emailAddress;
  return (
    <main className="flex w-full items-center flex-col">
      <Header>
        <DocumentName adminEmail={adminEmail} />
        <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
          <ActiveCollaborators />
          <ShareModal adminEmail={adminEmail} />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      <Document clerkUser={clerkUser} />
    </main>
  );
};

export default page;

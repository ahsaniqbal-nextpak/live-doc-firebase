"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { useSelf } from '@liveblocks/react/suspense';
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
// import UserTypeSelector from "./UserTypeSelector";
// import Collaborator from "./Collaborator";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
// import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({ adminEmail }: any) => {
  //   const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {
    setLoading(true);

    // await updateDocumentAccess({
    //   roomId,
    //   email,
    //   userType: userType as UserType,
    //   updatedBy: user.info,
    // });

    setLoading(false);
  };

  const collaborators: any = [
    {
      userType: "viewer",
      name: "John Doe",
      avatar: "/assets/images/doc.png",
      email: "wQ1Z3@example.com",
      id: 1,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="gradient-blue flex h-9 gap-1 px-4"
          disabled={"editor" !== "editor"}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-dark-400">
            <Input
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>
          <Button
            type="submit"
            onClick={shareDocumentHandler}
            className="gradient-blue flex h-full gap-1 px-5"
            disabled={loading}
          >
            {loading ? "Sending..." : "Invite"}
          </Button>
        </div>

        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator: any) => (
              <Collaborator
                key={collaborator.id}
                creatorId={"12/7/2024 12:00:00"}
                email={collaborator.email}
                collaborator={collaborator}
              />
            ))}
          </ul>
        </div>

        <div className="flex flex-1 rounded-md justify-between items-center bg-[#09111F] w-full py-5 px-4">
          <div className="flex items-center gap-3">
            <span>
              <img src="/assets/icons/icon.svg" alt="" />
            </span>
            Anyone with the link
          </div>
          <div className="flex items-center">
            <UserTypeSelector
              userType={userType as UserType}
              setUserType={setUserType || "viewer"}
              onClickHandler={shareDocumentHandler}
            />
            <Button type="button">Copy Link</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;

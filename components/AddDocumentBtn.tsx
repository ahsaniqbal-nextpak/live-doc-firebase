"use client";

import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createNewDocument, getDocuments } from "@/store/Slices/homeSlice";
import Loading from "./Loading";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const { loading } = useSelector((state: any) => state.home);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();

  const addDocumentHandler = () => {
    const payload = {
      userId,
      adminEmail: email,
      title: "Untitled",
    };

    dispatch(
      createNewDocument({
        payload,
        onSuccess: (id: string) => {
          router.push(`document/${id}`);
        },
      })
    );
  };

  return (
    <>
      {loading && <Loading />}
      <Button
        type="submit"
        onClick={addDocumentHandler}
        className="gradient-blue flex gap-1 shadow-md"
      >
        <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />
        <p className="hidden sm:block">Start a blank document</p>
      </Button>
    </>
  );
};

export default AddDocumentBtn;

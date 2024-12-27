"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import {
  getSingleDocument,
  udpateDocumentName,
} from "@/store/Slices/documentSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "next/navigation";
import { success } from "@/Utilities/toast";

const DocumentName = ({ adminEmail }: any) => {
  const { id } = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const inputRef = useRef<HTMLDivElement>(null);
  const { singleDocument } = useSelector((state: any) => state.document);
  const [documentTitle, setDocumentTitle] = useState(singleDocument.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUserType =
    adminEmail === singleDocument?.adminEmail ? "editor" : "viewer";

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);
      const title = e.currentTarget.value;
      dispatch(
        udpateDocumentName({
          docId: id,
          title,
          onSuccess: () => {
            success("Document title updated successfully");
            setEditing(false);
            setLoading(false);
          },
        })
      );
    }
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    setDocumentTitle(singleDocument.title);
  }, [singleDocument]);

  useEffect(() => {
    dispatch(getSingleDocument({ id }));
  }, []);

  return (
    <div className="flex w-fit items-center justify-center gap-2">
      {editing && !loading ? (
        <Input
          type="text"
          value={documentTitle}
          ref={inputRef}
          placeholder="Enter title"
          onChange={(e:any) => setDocumentTitle(e.target.value)}
          onKeyDown={updateTitleHandler}
          disable={!editing}
          className="document-title-input"
        />
      ) : (
        <>
          <p className="document-title">{singleDocument.title}</p>
        </>
      )}
      {currentUserType === "editor" && !editing && (
        <Image
          src="/assets/icons/edit.svg"
          alt="edit"
          width={24}
          height={24}
          onClick={() => setEditing(true)}
          className="pointer"
        />
      )}
      {currentUserType !== "editor" && !editing && (
        <p className="view-only-tag">View only</p>
      )}

      {loading && <p className="text-sm text-gray-400">saving...</p>}
    </div>
  );
};

export default DocumentName;

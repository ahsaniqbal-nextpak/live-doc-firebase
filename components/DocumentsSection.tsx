"use client";
import React, { useEffect } from "react";
import AddDocumentBtn from "./AddDocumentBtn";
import Image from "next/image";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import { DeleteModal } from "./DeleteModal";
import { getDocuments } from "@/store/Slices/homeSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

interface DocumentsSectionProps {
  userId: string;
  email: string;
}

const DocumentsSection = ({ userId, email }: DocumentsSectionProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { documents, loading } = useSelector((state: any) => state.home);

  useEffect(() => {
    dispatch(getDocuments({ email }));
  }, []);
  return documents?.length > 0 ? (
    <div className="document-list-container">
      {loading && <Loading />}
      <div className="document-list-title">
        <h3 className="text-28-semibold">All documents</h3>
        <AddDocumentBtn userId={userId} email={email} />
      </div>
      <ul className="document-ul">
        {documents?.map(({ id, title, createdAt }: any) => (
          <li key={id} className="document-list-item">
            <Link
              href={`/document/${id}`}
              className="flex flex-1 items-center gap-4"
            >
              <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                <Image
                  src="/assets/icons/doc.svg"
                  alt="file"
                  width={40}
                  height={40}
                />
              </div>
              <div className="space-y-1">
                <p className="line-clamp-1 text-lg">{title}</p>
                <p className="text-sm font-light text-blue-100">
                  Created about {dateConverter(createdAt?.seconds)}
                </p>
              </div>
            </Link>
            <DeleteModal docId={id} email={email} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="document-list-empty">
      <Image
        src="/assets/icons/doc.svg"
        alt="Document"
        width={40}
        height={40}
        className="mx-auto"
      />

      <AddDocumentBtn userId={userId} email={email} />
    </div>
  );
};

export default DocumentsSection;

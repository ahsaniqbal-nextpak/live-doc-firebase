"use client";
import React, { useEffect, useMemo } from "react";
import RichTextEditor from "./RichTextEditor";
import { useParams } from "next/navigation";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setDocumentContent } from "@/store/Slices/documentSlice";
import { useDebounce } from "use-debounce";
const TextEditorComponent = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { id } = useParams();
  const { singleDocument } = useSelector((state: any) => state.document);
  const [content, setContent] = React.useState<string>(singleDocument?.content);
  const [debouncedValue] = useDebounce(content, 1000);
  const memoizedContent = useMemo(() => debouncedValue, [debouncedValue]);

  useEffect(() => {
    if (memoizedContent) {
      dispatch(setDocumentContent({ content, docId: id }));
    }
  }, [memoizedContent]);

  useEffect(() => {
    if (singleDocument?.content) {
      setContent(singleDocument.content);
    }
  }, [singleDocument]);
  return (
    <>
      <form className="w-full">
        <RichTextEditor
          content={content}
          onChange={(value: any) => setContent(value)}
        />
      </form>
    </>
  );
};

export default TextEditorComponent;

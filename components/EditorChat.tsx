"use client";
import { dateConverter } from "@/lib/utils";
import { AddMessage, AddThread, getChats } from "@/store/Slices/documentSlice";
import { error, success } from "@/Utilities/toast";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditorChat = ({ email, clerkId, profileImage, name }: any) => {
  const { id } = useParams();
  const { documentChats } = useSelector((state: any) => state.document);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [message, setMessage] = useState("");
  const [threads, setThreads] = useState<{ [key: string]: string }>({});

  const handleThreadChange = (messageId: string, value: string) => {
    setThreads((prevThreads) => ({
      ...prevThreads,
      [messageId]: value,
    }));
  };

  const submitMessage = () => {
    const payload = {
      email,
      clerkId,
      profileImage,
      name,
      message,
      id,
    };
    if (!message) return error("Please Add Comment");
    dispatch(
      AddMessage({
        payload,
        onSuccess: () => {
          success("Comment added successfully");
        },
      })
    );
    setMessage("");
  };

  const submitThread = (messageId: string) => {
    const payload = {
      email,
      clerkId,
      profileImage,
      name,
      thread: threads[messageId],
      id,
      threadId: messageId,
    };
    if (!threads[messageId]) return error("Please Add Thread");

    dispatch(
      AddThread({
        payload,
        onSuccess: () => {
          success("Thread added successfully");
        },
      })
    );
    setThreads((prevThreads) => ({
      ...prevThreads,
      [messageId]: "",
    }));
  };

  useEffect(() => {
    dispatch(getChats({ id }));
  }, [dispatch, id]);

  return (
    <div className="chat-cover w-full flex flex-col gap-8 mb-10">
      <div className="w-full bg-[#0c1526] h-[150px] rounded-xl overflow-hidden py-2">
        <textarea
          placeholder="Write a Comment..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && submitMessage()}
          className="flex w-full rounded-md border-none outline-none min-h-[120px]bg-[#0c1526] px-3 py-2 text-sm placeholder:text-slate-500 cursor-pointer border border-[#0c1526] bg-[#0c1526] resize-none"
        />
        <div className="flex justify-between px-4">
          <span className="mt-1 text-lg">@</span>
          <span onClick={submitMessage} className="cursor-pointer">
            <Image
              src="/assets/icons/Button.svg"
              alt="Send"
              width={40}
              height={40}
            />
          </span>
        </div>
      </div>

      {documentChats?.map((item: any, index: number) => (
        <div
          className=" w-full bg-[#0c1526] h-auto rounded-xl overflow-hidden pt-2"
          key={index + 100}
        >
          <div className="py-4 px-4" id="message">
            <div className="flex justify-between">
              <div className="flex justify-center items-center gap-3">
                <Image
                  src={item?.profileImage}
                  alt={"Ahsan Iqbal"}
                  width={100}
                  height={100}
                  className="inline-block size-8 rounded-full ring-2 ring-dark-100"
                />
                <span className="text-lg font-semibold">{item?.name}</span>
              </div>
              <div className="text-slate-400 text-sm">
                {dateConverter(item?.createdAt?.seconds)}
              </div>
            </div>
            <div className="flex bg-[#11203d] py-3 px-3 rounded-lg mt-2">
              <h2 className="text-white">{item?.message}</h2>
            </div>
          </div>

          {item?.threads?.map((threadItem: any, threadIndex: number) => (
            <div className="py-4 px-4" id="message" key={threadIndex + 200}>
              <div className="flex justify-between">
                <div className="flex justify-center items-center gap-3">
                  <Image
                    src={threadItem?.profileImage}
                    alt={"Ahsan Iqbal"}
                    width={100}
                    height={100}
                    className="inline-block size-8 rounded-full ring-2 ring-dark-100"
                  />
                  <span className="text-lg font-semibold">
                    {threadItem?.name}
                  </span>
                </div>
                <div className="text-slate-400 text-sm flex flex-col">
                  {dateConverter(threadItem?.createdAt?.seconds)}
                </div>
              </div>
              <div className="flex bg-[#11203d] py-3 px-3 rounded-lg mt-2">
                <h2 className="text-white">{threadItem?.message}</h2>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center bg-[#101b2d] h-[50px] mt-2">
            <textarea
              placeholder="Reply to thread..."
              rows={1}
              value={threads[item.id] || ""}
              onChange={(e) =>
                handleThreadChange(item.id, e.currentTarget.value)
              }
              onKeyDown={(e) => e.key === "Enter" && submitThread(item.id)}
              className="flex w-[90%] rounded-md border-none outline-none min-h-[120px]bg-[#0c1526] px-3 py-2 text-sm placeholder:text-white cursor-pointer border border-[#101b2d] bg-[#101b2d] resize-none text-white"
            />
            <Image
              src="/assets/icons/Button.svg"
              alt="Send"
              width={40}
              height={40}
              onClick={() => submitThread(item.id)}
              className="mt-5 mr-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditorChat;

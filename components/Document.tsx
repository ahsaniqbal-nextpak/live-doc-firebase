import React from "react";
import EditorChat from "./EditorChat";
import TextEditorComponent from "./TextEditorComponent";

const Document = ({ clerkUser }: any) => {
  return (
    <section className="w-full flex flex-col lg:flex-row px-5 sm:px-10">
      <div className="w-full lg:w-[70%] flex justify-center pt-8">
        <TextEditorComponent />
      </div>
      <div className="w-full lg:w-[30%] px-5 py-8 max-h-[100vh] overflow-y-auto">
        <EditorChat
          email={clerkUser.emailAddresses[0].emailAddress}
          clerkId={clerkUser.id}
          profileImage={clerkUser.imageUrl}
          name={clerkUser.firstName + " " + clerkUser.lastName}
        />
      </div>
    </section>
  );
};

export default Document;

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import React from "react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formScheme = z.object({
  document: z.instanceof(File)
  .refine((file) => file.size !== 0, "Please upload a document")
  .refine((file) => file.type === "application/pdf", "Please upload a PDF file")
})

export default function FileInput() {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    mode: "onBlur",
    defaultValues: {
      document: new File([], "")
    }
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      form.setValue("document", acceptedFiles[0]);
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 10000000, // 10MB
      accept: { "application/pdf": [] },
    });

  const onSubmit = (values: z.infer<typeof formScheme>) => {
    console.log(values.document)
    axios.post("users/upload", values.document, {
      headers: {
        "Content-Type": "mutlipart/form-data"
      }
    
    }).then((res) => res.data);
  };

  return (
    <>
    <div className="relative my-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label
            className={`flex cursor-pointer flex-col items-center gap-6 rounded border border-dashed ${isDragActive ? "border-emerald-500" : "border-slate-300"} px-6 py-10 text-center`}
            {...getRootProps({onClick: (event) => event.stopPropagation()})}
      >
        <input
        id="id-dropzone02"
        type="file"
        {...getInputProps()}
        />
        <span className="inline-flex h-12 items-center justify-center self-center rounded bg-slate-100/70 px-3 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="File input icon"
            role="graphics-symbol"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
          </svg>
        </span>
        {isDragActive ? (
          <p className="flex items-center justify-center text-sm text-slate-600">Drop the file here ...</p>
        ): (
          <p className="flex flex-col items-center justify-center gap-1 text-sm">
            <span className="text-emerald-500 hover:text-emerald-500">
              Upload media
              <span className="text-slate-500"> or drag and drop </span>
            </span>
            <span className="text-slate-600"> PDF up to 10MB </span>
          </p>
        )}
          </label>
          <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-600"
          >
            Upload
          </button>
        </form>
        {form.getValues("document").name}
      {form.formState.errors.document && (
        <p className="text-red-500 text-sm">{form.formState.errors.document.message}</p>
      )}
    </div>
    </>
  )
}

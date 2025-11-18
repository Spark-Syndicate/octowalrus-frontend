import { FileUpload } from "@/components/FileUpload";

export const HomePage = () => {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-4xl font-bold">File Upload</h1>
      </div>
      <FileUpload />
    </div>
  );
};


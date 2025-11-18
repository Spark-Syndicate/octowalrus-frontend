import { useState, useRef, useCallback } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UploadCredentials {
  upload_link: string;
  fields: {
    "Content-Type": string;
    key: string;
    AWSAccessKeyId: string;
    policy: string;
    signature: string;
  };
  filename: string;
  expires_in: number;
}

interface UploadStatus {
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_IMPORTER_API_URL || "http://localhost:18080";

export const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadStatus[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUploadCredentials = async (
    filename: string,
    contentType: string
  ): Promise<UploadCredentials> => {
    const url = new URL(`${API_BASE_URL}/importer/file/upload`);
    url.searchParams.append("filename", filename);
    url.searchParams.append("content_type", contentType);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get upload credentials: ${response.statusText}`);
    }

    const credentials = await response.json();
    console.log("Upload token response:", credentials);
    return credentials;
  };

  const uploadFileToMinIO = async (
    file: File,
    credentials: UploadCredentials
  ): Promise<void> => {
    const formData = new FormData();

    // Add all the fields from the credentials
    Object.entries(credentials.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Add the file last (this is important for MinIO)
    formData.append("file", file);

    const response = await fetch(credentials.upload_link, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
      // Get content type immediately
      const contentType = file.type || "application/octet-stream";

      // Add file to uploads list with pending status
      const uploadStatus: UploadStatus = {
        file,
        status: "pending",
      };
      setUploads((prev) => [...prev, uploadStatus]);

      try {
        // Greedily fetch upload credentials immediately (before upload starts)
        console.log(`Fetching upload token for file: ${file.name} (${contentType})`);
        const credentials = await getUploadCredentials(file.name, contentType);

        // Update status to uploading
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file ? { ...u, status: "uploading" } : u
          )
        );

        // Upload to MinIO using the pre-fetched credentials
        await uploadFileToMinIO(file, credentials);

        // Update status to success
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file ? { ...u, status: "success" } : u
          )
        );
      } catch (error) {
        // Update status to error
        setUploads((prev) =>
          prev.map((u) =>
            u.file === file
              ? {
                  ...u,
                  status: "error",
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                }
              : u
          )
        );
      }
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      files.forEach((file) => {
        handleFileUpload(file);
      });
    },
    [handleFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        Array.from(files).forEach((file) => {
          handleFileUpload(file);
        });
      }
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFileUpload]
  );

  const handleRemoveUpload = useCallback((file: File) => {
    setUploads((prev) => prev.filter((u) => u.file !== file));
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors",
              isDragging
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <Upload
              className={cn(
                "mb-4 h-12 w-12",
                isDragging ? "text-primary" : "text-muted-foreground"
              )}
            />
            <p className="mb-2 text-lg font-medium">
              {isDragging ? "Drop files here" : "Drag and drop files here"}
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              or click to browse
            </p>
            <Button variant="outline" type="button">
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {uploads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploads.map((upload, index) => (
                <div
                  key={`${upload.file.name}-${index}`}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex flex-1 items-center gap-3">
                    {upload.status === "uploading" && (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    )}
                    {upload.status === "success" && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {upload.status === "error" && (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                    {upload.status === "pending" && (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{upload.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(upload.file.size)}
                        {upload.status === "error" && upload.error && (
                          <span className="ml-2 text-destructive">
                            - {upload.error}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  {(upload.status === "success" || upload.status === "error") && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveUpload(upload.file)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


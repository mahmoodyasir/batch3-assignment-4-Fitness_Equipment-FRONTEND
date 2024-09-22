import { CancelOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type Props = {
    names?: string[];
    removeName?: (name: string) => void;
    fileType: "images" | "videos"; // Specify the file type
    onFileSelect: (files: any[]) => void;
    className?: string;
    buttonClassName?: string;
    style?: any;
};

function FileUploader(props: Props) {
    const {
        names,
        removeName,
        fileType,
        onFileSelect,
        className,
        buttonClassName,
        style,
    } = props;
    const [files, setFiles] = useState<any[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const inputFileRef = useRef(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || []);

        if (newFiles.length) {
            const imageFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
            const videoFileTypes = ["video/mp4", "video/mpeg4", "video/mkv", "video/wmv", "video/avi"];

            const allowedFileTypes = fileType === "images" ? imageFileTypes : videoFileTypes;

            const filteredFiles = newFiles.filter(
                (file) =>
                    file instanceof File &&
                    allowedFileTypes.includes(file.type)
            );

            setFiles([...files, ...filteredFiles]);
        }
    };

    useEffect(() => {
        // if (files.length) {
            const names = files.map((file: any) => file.name);
            setFileNames(names);
            onFileSelect(files);
        // }
    }, [files]);

    return (
        <div className={className} style={style}>
            <input
                ref={inputFileRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept={fileType === "images" ? "image/*" : "video/*"}
            />

            <Button
                variant="outlined"
                className={buttonClassName}
                onClick={() => (inputFileRef.current as any)?.click()}
            >
                Choose {fileType}
            </Button>
            {fileNames.length > 0 && (
                <section className="flex flex-row flex-wrap gap-x-1" style={{ width: "100%" }}>
                    {fileNames.map((fileName, index) => (
                        <Typography key={index} variant="subtitle1">
                            {fileName}{" "}
                            <CancelOutlined
                                onClick={() => {
                                    const updatedFiles = files.slice(0, index).concat(files.slice(index + 1));
                                    console.log(updatedFiles)
                                    setFiles(updatedFiles); // Update files state
                                    if (updatedFiles.length === 0) {
                                        setFileNames([]); // Clear fileNames if no files left
                                    }
                                }}
                            />
                        </Typography>
                    ))}
                </section>
            )}

            {(names?.length || 0) > 0 && (
                <section className="flex flex-row flex-wrap gap-x-1" style={{ width: "100%" }}>
                    {(names || []).map((name, index) => (
                        <Typography key={index} variant="subtitle1">
                            {name} <CancelOutlined onClick={() => removeName && removeName(name)} />{" "}
                        </Typography>
                    ))}
                </section>
            )}

            {fileNames.length === 0 && (names?.length || 0) === 0 && (
                <Typography variant="subtitle1">No {fileType} selected</Typography>
            )}
        </div>
    );
}

export default FileUploader;

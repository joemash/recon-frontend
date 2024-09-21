import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, AlertTriangle, Check } from "lucide-react";
import { clearError, uploadFiles } from "../../features/recon/reconciliationsSlice";
import { toast } from "react-toastify";
import TitleCard from "../../components/Cards/TitleCard";

const FileUploadForm = () => {
  const [sourceFile, setSourceFile] = useState(null);
  const [targetFile, setTargetFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.reconciliation);

  const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds the maximum limit of 1GB");
        return;
      }
      setFile(file);
    } else {
      toast.error("Please upload a valid CSV file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sourceFile || !targetFile) {
      toast.error("Both files are required!");
      return;
    }

    const formData = new FormData();
    formData.append("source_file", sourceFile);
    formData.append("target_file", targetFile);

    dispatch(uploadFiles({ formData }))
      .unwrap() // Unwrap to get the direct result or error
      .then((result) => {
        const id = result.id;
        navigate(`/app/reconciliations/${id}`);
      })
      .catch((error) => {
        toast.error("Upload failed");
    });

  };


  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <TitleCard title="Upload Files For Reconciliation" topMargin="mt-2">
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* File Upload Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Source File Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center">
                  <FileText className="mr-2" /> Source CSV File
                </span>
              </label>
              <div className="relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-100">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileChange(e, setSourceFile)}
                  className="file-input w-full h-full absolute opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto text-gray-500" size={36} />
                <p className="text-gray-500 mt-2">
                  Click to upload or drag and drop CSV file (max. 1GB)
                </p>
                {sourceFile && (
                  <p className="mt-2 text-green-500 flex justify-center items-center">
                    <Check className="mr-2" /> {sourceFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Target File Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center">
                  <FileText className="mr-2" /> Target CSV File
                </span>
              </label>
              <div className="relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer bg-gray-100">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileChange(e, setTargetFile)}
                  className="file-input w-full h-full absolute opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto text-gray-500" size={36} />
                <p className="text-gray-500 mt-2">
                  Click to upload or drag and drop CSV file (max. 1GB)
                </p>
                {targetFile && (
                  <p className="mt-2 text-green-500 flex justify-center items-center">
                    <Check className="mr-2" /> {targetFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary w-full py-3 text-lg ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Start Reconciliation"}
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error mt-6 flex items-center">
            <AlertTriangle className="mr-2" />
            {error}
          </div>
        )}
      </div>
    </TitleCard>
  );
};

export default FileUploadForm;

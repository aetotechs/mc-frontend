import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Check, TriangleAlert } from "lucide-react";
import { useAuthDialog } from "../../../utils/hooks/useAuthDialog";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dialog_operations } from "../../../utils/constansts/DialogOperations";

function VerificationStatus() {
  const { handleClose, openDialog } = useAuthDialog();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState(""); // "verified" | "unverified" | "error"
  const email = searchParams.get("email") || "";

  useEffect(() => {
    handleVerification();
  }, []);

  const handleVerification = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStatus("verified");
      setIsLoading(false);
    }, 3000);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div>
          <p className="text-blue-600 text-center">Processing, please wait...</p>
        </div>
      );
    }

    if (status === "verified") {
      return (
        <>
          <div className="bg-[#ECF8EF] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
            <div className="bg-[#3DA755] flex justify-center items-center w-10 h-10 p-3 rounded-full">
              <Check className="text-white w-5 h-5" />
            </div>
          </div>
          <p className="text-center font-bold text-xl">Your account has been successfully verified!</p>
          <p className="text-center">You can now log in to your account.</p>
          <div className="flex items-center justify-center my-6">
            <Button
              label="Sign In"
              icon={<ArrowUpRight01Icon />}
              className="flex items-center text-white gap-2 px-4 py-2 bg-[#2F91D7] rounded-full"
              onClick={() => openDialog(dialog_operations.login)}
            />
          </div>
        </>
      );
    }

    if (status === "unverified") {
      return (
        <>
          <div className="bg-[#FDECEC] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
            <div className="bg-[#EE443F] flex justify-center items-center w-10 h-10 p-3 rounded-full">
              <TriangleAlert className="text-white w-5 h-5" />
            </div>
          </div>
          <p className="text-center font-bold text-xl">This link has expired or is already used.</p>
          <p className="text-center">Request a new verification link if needed.</p>
          <div className="flex items-center justify-center my-6">
            <Button
              label="Resend Verification Link"
              icon={<ArrowUpRight01Icon />}
              className="flex items-center gap-2 text-[#2F91D7] bg-white border py-2 px-8 border-[#2F91D7] rounded-full"
            />
          </div>
        </>
      );
    }

    if (status === "error") {
      return (
        <div>
          <p className="text-red-600 text-center">
            Invalid link! Sorry for the inconveniences. Kindly contact support.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog
      visible={visible}
      className="w-[90vw] h-screen"
      onHide={() => {
        setVisible(false);
        handleClose();
      }}
    >
      <div className="flex flex-col h-full justify-center gap-2">{renderContent()}</div>
    </Dialog>
  );
}

export default VerificationStatus;
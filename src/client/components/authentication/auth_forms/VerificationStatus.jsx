import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Check, TriangleAlert } from "lucide-react";
import { useAuthDialog } from "../../../utils/hooks/useAuthDialog";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dialog_operations } from "../../../utils/constansts/DialogOperations";
import { useUsers } from "../../../utils/hooks/useUsers";
import { decodeToken } from "../../../utils/cookies/AuthCookiesManager";

function VerificationStatus() {
  const { verifyUser, resendVerificationToken, loading, success, setSuccess, error, setError } = useUsers();
  const { handleClose, openDialog } = useAuthDialog();
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState(""); // Options "verified" | "unverified" | "error"
  const verificationToken = searchParams.get("Verification-Token") || "";
  const email = decodeToken(verificationToken).email;

  useEffect(() => {
    handleVerification();
  }, []);

  const handleVerification = async () => {
    if(!verificationToken) setStatus("error");
    const res = await verifyUser(verificationToken);
    if(res === "Account verified successfully!") setStatus("verified");
    else setStatus("unverified");
  };

  const handleResendToken = async () => {
    const res = await resendVerificationToken(email);
    if(res === "sent") {
      setSuccess("Link resent"); 
      setTimeout(() => {
        handleClose();
      }, 2000)
    }
  }
  const renderContent = () => {
    if (loading) {
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
              onClick={handleResendToken}
              label="Resend Verification Link"
              icon={<ArrowUpRight01Icon />}
              className="flex items-center gap-2 text-[#2F91D7] bg-white border py-2 px-8 border-[#2F91D7] rounded-full"
            />
          </div>
          <p className={`${!error && "hidden"} text-center text-red-500 font-bold bg-red-100 p-2`}>{error}</p>
          <p className={`${!success && "hidden"} text-center text-green-500 font-bold bg-green-100 p-2`}>{success}</p>
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
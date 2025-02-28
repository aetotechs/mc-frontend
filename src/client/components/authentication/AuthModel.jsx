import { Dialog } from "primereact/dialog";
import { SignUp } from "./auth_forms/SignUp";
import { Login } from "./auth_forms/LogIn";
import { useAuthDialog } from "../../utils/hooks/useAuthDialog";
import { dialog_operations } from "../../utils/constansts/DialogOperations";
import { SendPasswordResetEmail } from "./auth_forms/SendResetLink";
import { ResetPassword } from "./auth_forms/ResetPassword";
import VerificationStatus from "./auth_forms/VerificationStatus";
import { ChangePassword } from "./auth_forms/ChangePassword";
import {ManageNotifications } from "./auth_forms/ManageNotifications";
import { EditProfile } from "./auth_forms/EditProfile";
import UnitDetails from "../details/UnitDetails";
import { useSearchParams } from "react-router-dom";

export default function AuthModel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dialogOpen, operation, handleClose } = useAuthDialog();
  const dialogWidth = searchParams.get('_dialog_width') || '32vw';
  console.log("Dialog width is " + dialogWidth);
  
  return (
    <div className="card flex justify-center">
      <Dialog
        visible={dialogOpen}
        onHide={handleClose}
        content={() => (
          <div className={`grid grid-cols-1 px-8 py-4 gap-1 bg-white rounded-md w-full md:w-auto ${dialogWidth === '90vw' ? 'md:w-[90vw]' : 'md:w-[32vw]'}`}>
            <div className="absolute right-3 top-3">
              <div
                className="cursor-pointer pi pi-times text-sm"
                title="Close"
                onClick={handleClose}
              />
            </div>

            {/* Auth */}
            {operation === dialog_operations.login && <Login />}
            {operation === dialog_operations.signup && <SignUp />}
            {operation === dialog_operations.reset_email && <SendPasswordResetEmail />}
            {operation === dialog_operations.reset_password && <ResetPassword />}
            {operation === dialog_operations.verification_status && <VerificationStatus/>}
            {operation === dialog_operations.change_password && <ChangePassword/>}
            {operation === dialog_operations.manage_notifications && <ManageNotifications/>}
            {operation ===dialog_operations.edit_profile && <EditProfile/>}

            {/* Details */}
            {operation ===dialog_operations.unit_details && <UnitDetails/>}
          </div>
        )}
      >
      </Dialog>
    </div>
  );
}
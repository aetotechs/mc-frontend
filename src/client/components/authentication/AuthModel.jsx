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

export default function AuthModel() {
  const { dialogOpen, operation, handleClose } = useAuthDialog();
  
  return (
    <div className="card flex justify-center">
      <Dialog
        visible={dialogOpen}
        onHide={handleClose}
        content={() => (
          <div className="grid grid-cols-1 px-8 py-4 gap-1 bg-white rounded-md w-full md:w-[32vw] ">
            <div className="absolute right-3 top-3">
              <div
                className="cursor-pointer pi pi-times text-sm"
                title="Close"
                onClick={handleClose}
              />
            </div>

            {operation === dialog_operations.login && <Login />}
            {operation === dialog_operations.signup && <SignUp />}
            {operation === dialog_operations.reset_email && <SendPasswordResetEmail />}
            {operation === dialog_operations.reset_password && <ResetPassword />}
            {operation === dialog_operations.verification_status && <VerificationStatus/>}

            {operation === dialog_operations.change_password && <ChangePassword/>}
            {operation === dialog_operations.manage_notifications && <ManageNotifications/>}

            {operation ===dialog_operations.edit_profile && <EditProfile/>}
          </div>
        )}
      >
      </Dialog>
    </div>
  );
}
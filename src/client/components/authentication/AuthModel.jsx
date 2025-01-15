import { Dialog } from "primereact/dialog";
import { useAuth } from "../../utils/context/AuthContext";
import { SignUp } from "./auth_forms/SignUp";
import { Login } from "./auth_forms/LogIn";

export default function AuthModel() {
  const { login, register, showAuth, dispatchAuth } = useAuth();

  const handleClose = () => {
    dispatchAuth(false, false, false);
  };

  return (
    <div className="card flex justify-center">
      <Dialog
        visible={showAuth}
        onHide={handleClose}
        content={({ hide }) => (
          <div className="grid grid-cols-1 px-8 py-10 gap-1 bg-white rounded-md w-full lg:w-[32vw]">
            <div className="absolute right-3 top-3">
              <div
                className="cursor-pointer pi pi-times text-xl"
                title="Close"
                onClick={handleClose}
              />
            </div>

            {register && <SignUp />}
            {login && <Login />}
          </div>
        )}
      ></Dialog>
    </div>
  );
}

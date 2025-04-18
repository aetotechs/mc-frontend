import { Search01Icon } from 'hugeicons-react'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { isAuthenticated, logout } from '../../../utilities/cookies/AuthCookiesManager'
import { dialog_operations } from '../../../utilities/constants/DialogOperations'
import { useAuthDialog } from '../../../utilities/hooks/client/useAuthDialog'

const MobileAccountMenu = ({ isVisible, setIsVisible }) => {
    const { openDialog } = useAuthDialog();

    const handleLogout = () => {
        logout();
        setIsVisible(false);
      };
  return (
    <div>
      <Sidebar
        visible={isVisible}
        position='right'
        className='w-full block md:hidden bg-white'
        content={({ hide }) => (
            <section className='h-full relative'>
                <div className='flex justify-between items-center px-3 py-6 border-b'>
                    <p></p>
                    <i className='pi pi-times text-lg text-gray-500' onClick={setIsVisible}/>
                </div>

                <div className='grid gap-y-6 px-3 py-6'>
                {!isAuthenticated() ? (
                    <div>
                        <p className="font-semibold"
                            onClick={() => {
                                openDialog(dialog_operations.signup);
                                setIsVisible();
                            }}
                        >
                            SignUp
                        </p>

                        <p className="font-semibold"
                            onClick={() => {
                                openDialog(dialog_operations.login);
                                setIsVisible();
                            }}
                        >
                            Login
                        </p>

                        <NavLink to={"/help"} className="font-semibold">Help / Support</NavLink>
                    </div>
                    ) : (
                    <>
                        <p className="font-semibold"
                            onClick={() => {
                                openDialog(dialog_operations.messages);
                                setIsVisible();
                            }}
                        >
                            Messages
                        </p>

                        <p className="font-semibold"
                            onClick={() => {
                                openDialog(dialog_operations.login);
                                setIsVisible();
                            }}
                        >
                            My rental
                        </p>

                        <NavLink to={"/"} className="font-semibold">My Tours</NavLink>
                        <NavLink to={"/notifications"} className="font-semibold">Notifications</NavLink>
                        <NavLink to={"/"} className="font-semibold">Payment History</NavLink>
                        <NavLink to={"/"} className="font-semibold">Maintenance Requests</NavLink>

                        <NavLink to={"/account"} className="font-semibold">Settings</NavLink>
                        <NavLink to={"/help"} className="font-semibold">Help / Support</NavLink>
                        <hr />
                        <NavLink onClick={handleLogout} className="font-semibold">Sign out</NavLink>
                        <hr />
                    </>
                    )}
                </div>
            </section>
        )}
      />
    </div>
  )
}

export default MobileAccountMenu

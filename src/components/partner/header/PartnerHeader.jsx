import { Notification01Icon } from "hugeicons-react";
import { PartnerAccountPopover } from "./PartnerAccountPopOver";
import { NavLink } from "react-router-dom";

const PartnerHeader = ({ bottomBorder }) => {
    const navItems = [
        { name: "Overview", path: "/" },
        { name: "Properties", path: "/properties" },
        { name: "Tours", path: "/tours" },
        { name: "Messages", path: "/messages" },
    ];

    return (
        <div className={`hidden md:flex justify-between items-center px-[8vw] py-2.5 bg-white ${bottomBorder && "border-b"}`}>
            <NavLink to={'/'} className="h-12 object-contain">
                <img src="/logos/mycrib.png" className="h-full" />
            </NavLink>

            <div className="flex gap-6 text-sm">
                {navItems.map(({ name, path }) => (
                    <NavLink 
                        key={name} 
                        to={path} 
                        className={({ isActive }) => 
                            `relative pb-1 ${isActive ? "text-primary font-medium after:absolute after:content-[''] after:h-1 after:rounded-lg after:bg-primary after:w-1/2 after:left-1/2 after:top-full after:-translate-x-1/2" : "hover:text-gray-600"}`
                        }
                    >
                        {name}
                    </NavLink>
                ))}

                {/* Earnings and Tenants dropdowns */}
                <div to={'/earnings'} className={"flex items-center gap-1 group font-medium cursor-pointer hover:text-gray-600"}>
                    Earnings <span className="pi pi-angle-down text-xs group-hover:rotate-180 transition-transform"></span>
                </div>
                <div to={'/tenants'} className={"flex items-center gap-1 group font-medium cursor-pointer hover:text-gray-600"}>
                    Tenants <span className="pi pi-angle-down text-xs group-hover:rotate-180 transition-transform"></span>
                </div>
            </div>

            <div className="flex gap-6 items-center">
                <div className="relative cursor-pointer">
                    <Notification01Icon size={18} />
                    <span className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0"></span>
                </div>
                <PartnerAccountPopover />
            </div>
        </div>
    );
};

export default PartnerHeader;
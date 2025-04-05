import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontalCircle01Icon } from 'hugeicons-react';
import AvailabilityBadge from '../../../client/components/ui/AvailabilityBadge';
import PropertyTypeBadge from '../ui/PropertyTypeBadge';

const PropertiesTable = ({ data }) => {
    const navigate = useNavigate();
    const [menuIconClicked, setMenuIconClicked] = useState('');

    const propertyBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2 pl-4 max-[w-10%] truncate">
                <img
                    src={rowData?.media?.photos[0]?.url ?? "/images/placeholder.png"}
                    alt={rowData?.name}
                    className="w-16 h-12 object-cover rounded-lg border"
                    onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                />
                <span>{rowData?.name}</span>
            </div>
        );
    };

    const locationBodyTemplate = (rowData) => {
        return (
            <p className='font-[300]'>{rowData.address.street}, {rowData.address.city}</p>
        );
    };

    const rentalTermsBodyTemplate = (rowData) => {
        return <p className='text-black'>UGX {parseFloat(rowData.priceRange).toLocaleString()} 
         <span className='text-xs text-gray-500'> { rowData?.unitsAvailable ? rowData?.units[0]?.paymentCycle?.name?.toLowerCase() : rowData?.unitlessDetails?.paymentCycle?.name?.toLowerCase() }</span>
        </p>;
    };

    const typeBodyTemplate = (rowData) => {
        return <PropertyTypeBadge propertyType={rowData?.propertyType}/>;
    };

    const availabilityBodyTemplate = (rowData) => {
        return <AvailabilityBadge status={rowData.status}/>;
    };

    const actionBodyTemplate = (rowData) => {
        const handleEditProperty = () => {
            console.log("Edit property");
        }
        const handleRemoveProperty = () => {
            console.log("Remove property");
        }
        const handleViewProperty = () => {
            navigate(`/edit/${rowData.id}`);
        }
        return (
            <div className="relative">
                <MoreHorizontalCircle01Icon className='font-bold cursor-pointer' onClick={() => (menuIconClicked === rowData.id) ? setMenuIconClicked(false) : setMenuIconClicked(rowData.id)} />
                {  menuIconClicked === rowData.id &&
                <p className='absolute top-6 right-0 bg-white shadow-6xl rounded shadow z-50 border py-1 flex flex-col gap-2'>
                    <span 
                        className='whitespace-nowrap cursor-pointer hover:bg-gray-200 px-4 py-2'
                        onClick={handleViewProperty}
                    >
                        View property
                    </span>
                    <span 
                        className='whitespace-nowrap cursor-pointer hover:bg-gray-200 px-4 py-2'
                        onClick={handleEditProperty}
                    >
                        Edit property
                    </span>
                    <span 
                        className='whitespace-nowrap cursor-pointer hover:bg-gray-200 px-4 py-2'
                        onClick={handleRemoveProperty}
                    >
                        Remove property
                    </span>
                </p>}
            </div>
        );
    };

    return (
        <DataTable
            value={data}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableClassName='flex-1'
            headerClassName='bg-gray-300 rounded-lg'
            rowClassName={'border-b m-0'}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Page {currentPage} of {totalPages}"
        >
            <Column
                header="Property"
                body={propertyBodyTemplate}
            />
            <Column
                header="Location"
                body={locationBodyTemplate}
            />
            <Column
                header="Rental Terms"
                body={rentalTermsBodyTemplate}
            />
            <Column
                header="Type"
                body={typeBodyTemplate}
            />
            <Column
                header="Availability"
                body={availabilityBodyTemplate}
            />
            <Column
                body={actionBodyTemplate}
            />
        </DataTable>
    );
};

export default PropertiesTable;
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontalCircle01Icon } from 'hugeicons-react';
import AvailabilityBadge from '../../../client/components/ui/AvailabilityBadge';
import PropertyTypeBadge from '../ui/PropertyTypeBadge';
import { Dialog } from 'primereact/dialog';
import api_urls from '../../../client/utils/resources/api_urls';
import Spinner from '../../../globals/ui/Spinner';
import { getUserToken } from '../../../client/utils/cookies/AuthCookiesManager';

const token = getUserToken();

const PropertiesTable = ({ data }) => {
    const navigate = useNavigate();
    const [menuIconClicked, setMenuIconClicked] = useState('');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const [deletingStatus, setDeletingStatus] = useState({ isDeleting: false, error: null, success: null });
    const { isDeleting, error, success } = deletingStatus;
    
    const setIsDeleting = (status) => {
        setDeletingStatus((prevState) => ({
            ...prevState,
            isDeleting: status,
        }));
    };

    const setError = (error) => {
        setDeletingStatus((prevState) => ({
            ...prevState,
            error: error,
        }));
    };

    const setSuccess = (success) => {
        setDeletingStatus((prevState) => ({
            ...prevState,
            success: success,
        }));
    };

    const propertyBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2 pl-4 max-[w-10%] text-black truncate">
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
        return (
            <p className='text-black'>
                UGX {parseFloat(rowData.priceRange).toLocaleString()}{' '}
                <span className='text-xs text-gray-500'>
                    {rowData?.unitsAvailable
                        ? rowData?.units[0]?.paymentCycle?.name?.toLowerCase()
                        : rowData?.unitlessDetails?.paymentCycle?.name?.toLowerCase()}
                </span>
            </p>
        );
    };

    const typeBodyTemplate = (rowData) => {
        return <PropertyTypeBadge propertyType={rowData?.propertyType} />;
    };

    const availabilityBodyTemplate = (rowData) => {
        return <AvailabilityBadge status={rowData.status} />;
    };

    const handleEditProperty = (rowData) => {
        console.log("Edit property:", rowData);
    };

    const handleRemoveProperty = (rowData) => {
        setPropertyToDelete(rowData);
        setShowDeleteDialog(true);
        setMenuIconClicked('');
    };

    const confirmDelete = async () => {
        if (propertyToDelete) {
            console.log("Removing property:", propertyToDelete);
            try {
                setIsDeleting(true);
                const response = await fetch(api_urls.listings.delete_listing(propertyToDelete?.propertyId), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const res = await response.text();
                if (!response.ok) {
                    setError(res);
                } else {
                    setSuccess(res);
                    console.log("Property deleted successfully:", res);
                    setShowDeleteDialog(false);
                    setPropertyToDelete(null); 
                }
            }
            catch (error) {
                setError(error.message);
                console.error("Error deleting property:", error);
            }
            finally {
                setIsDeleting(false);
            }
        }
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
        setPropertyToDelete(null); 
    };

    const handleViewProperty = (rowData) => {
        
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="relative">
                <MoreHorizontalCircle01Icon
                    className="font-bold cursor-pointer"
                    onClick={() =>
                        menuIconClicked === rowData.id
                            ? setMenuIconClicked('')
                            : setMenuIconClicked(rowData.id)
                    }
                />
                {menuIconClicked === rowData.id && (
                    <div className="absolute top-6 right-0 bg-white shadow-lg rounded border py-1 flex flex-col gap-2 z-50">
                        <span
                            className="whitespace-nowrap cursor-pointer hover:bg-gray-200 px-4 py-2"
                            onClick={() => handleViewProperty(rowData)}
                        >
                            View property
                        </span>
                        <span
                            className="whitespace-nowrap cursor-pointer hover:bg-gray-200 px-4 py-2"
                            onClick={() => handleEditProperty(rowData)}
                        >
                            Edit property
                        </span>
                        <span
                            className="whitespace-nowrap cursor-pointer hover:bg-gray-200 px-4 py-2"
                            onClick={() => handleRemoveProperty(rowData)}
                        >
                            Remove property
                        </span>
                    </div>
                )}
            </div>
        );
    };

    const dialogFooter = (
        <div className="flex justify-between gap-2">
            <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
            >
                Cancel
            </button>
            <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
            >
                Remove Property
            </button>
        </div>
    );

    return (
        <div className="relative">
            <DataTable
                value={data}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableClassName="flex-1"
                headerClassName="bg-gray-300 rounded-lg"
                rowClassName="border-b m-0"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Page {currentPage} of {totalPages}"
            >
                <Column header="Property" body={propertyBodyTemplate} />
                <Column header="Location" body={locationBodyTemplate} />
                <Column header="Rental Terms" body={rentalTermsBodyTemplate} />
                <Column header="Type" body={typeBodyTemplate} />
                <Column header="Availability" body={availabilityBodyTemplate} />
                <Column body={actionBodyTemplate} />
            </DataTable>

            <section className='rounded-lg'>
                <Dialog
                    header="Remove Property"
                    visible={showDeleteDialog}
                    className='w-[90vw] md:w-[50vw] lg:w-[30vw] rounded-xl'
                    footer={dialogFooter}
                    onHide={cancelDelete}
                    content={() => (
                        <div className="px-8 py-4 gap-1 bg-white rounded-xl w-full">
                            <h1 className='text-lg text-black'>Remove property</h1>
                            <div
                                className="absolute right-6 top-3 cursor-pointer pi pi-times text-sm"
                                title="Close"
                                onClick={cancelDelete}
                            />
                            
                            <p className='text-gray-700 py-6'>
                                This action is permanent and will archive "{propertyToDelete?.name}" with all data.
                                <p className='text-xs text-gray-500 mt-4'>Note: Item can be restored later on request within 30 days.</p>
                            </p>

                            <div className="flex justify-between gap-2">
                            <button
                                onClick={cancelDelete}
                                className="py-2 text-gray-600 hover:text-gray-800 text-sm font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 min-w-32 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600"
                            >
                                { isDeleting ? <Spinner color='white' size={5}/> : "Remove Property"}
                            </button>
                        </div>
                        </div>
                    )}
                >
                </Dialog>
            </section>
        </div>
    );
};

export default PropertiesTable;
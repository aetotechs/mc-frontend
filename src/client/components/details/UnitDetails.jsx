import React, { useEffect, useState } from 'react'
import { decryptParams } from '../../utils/helpers/EncryptionHelper';

const UnitDetails = () => {
    const [unit, setUnit] = useState(null);
    const searchParams = new URLSearchParams(window.location.search);

    const getDecryptedParams = () => {
        const encryptedParams = searchParams.get("params");
        return encryptedParams ? decryptParams(encryptedParams) : null;
    };

    useEffect(() => {
        const decryptedParams = getDecryptedParams();
        if (decryptedParams) {
            setUnit(decryptedParams);
        }
    }, []);

  return (
    <div className='h-[80vh]'>
      Details for { unit?.name }
    </div>
  )
}

export default UnitDetails

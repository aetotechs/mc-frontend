import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { encryptParams } from "../helpers/EncryptionHelper";

export function useAuthDialog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dialogOpen = searchParams.get('_auth_dia') === 'open';
  const operation = searchParams.get('_op') || '_loginf';

  useEffect(() => {
    // Ensure `_op` is set when `_auth_dia` is open
    if (dialogOpen && !searchParams.get('_op')) {
      searchParams.set('_op', '_loginf');
      setSearchParams(searchParams);
    }
  }, [dialogOpen, searchParams, setSearchParams]);

  const handleClose = () => {
    searchParams.set('_auth_dia', 'closed');
    searchParams.delete('_op');
    searchParams.delete('_dialog_width');
    searchParams.delete('params');
    setSearchParams(searchParams);
  };

  const openDialog = (op = '_loginf', dialog_width, params) => {
    searchParams.set('_auth_dia', 'open');
    searchParams.set('_op', op);
    searchParams.set('_dialog_width', dialog_width);
    if (params) {
      searchParams.set("params", encryptParams(params));
    }
    setSearchParams(searchParams);
  };

  return useMemo(
    () => ({ dialogOpen, operation, handleClose, openDialog }),
    [ dialogOpen, operation, handleClose, openDialog ]
  );
}

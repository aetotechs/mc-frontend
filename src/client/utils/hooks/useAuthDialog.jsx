import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

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
    setSearchParams(searchParams);
  };

  const openDialog = (op = '_loginf') => {
    searchParams.set('_auth_dia', 'open');
    searchParams.set('_op', op);
    setSearchParams(searchParams);
  };

  return useMemo(
    () => ({ dialogOpen, operation, handleClose, openDialog }),
    [dialogOpen, operation, handleClose, openDialog]
  );
}

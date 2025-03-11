import * as React from "react";
import { Button, Stack, TextField, MenuItem } from "@mui/material";

export function PaymentFilters(): React.JSX.Element {
  const [paymentStatus, setPaymentStatus] = React.useState("");

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        select
        label="Estado de pago"
        variant="outlined"
        size="small"
        value={paymentStatus}
        onChange={(event) => setPaymentStatus(event.target.value)}
      >
        <MenuItem value="">Todos</MenuItem>
        <MenuItem value="Pendiente">Pendiente</MenuItem>
        <MenuItem value="Completado">Completado</MenuItem>
        <MenuItem value="Fallido">Fallido</MenuItem>
      </TextField>
      <Button variant="contained" color="primary">
        Filtrar
      </Button>
    </Stack>
  );
}

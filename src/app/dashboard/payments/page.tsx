"use client";

import * as React from "react";
import { Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from "@mui/material";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import dayjs from "dayjs";

import { PaymentsTable } from "@/components/dashboard/payments/payments-table";
import { PaymentFilters } from "@/components/dashboard/payments/payments-filter";
import type { Payment } from "@/components/dashboard/payments/payments-table";

export default function Page(): React.JSX.Element {
  const [payments, setPayments] = React.useState<Payment[]>([
    {
      id: "PAY-001",
      studentName: "Juan Pérez",
      amount: 100,
      date: dayjs().subtract(2, "days").toDate(),
      status: "Completado",
    },
    {
      id: "PAY-002",
      studentName: "Ana Gómez",
      amount: 50,
      date: dayjs().subtract(5, "days").toDate(),
      status: "Pendiente",
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [newPayment, setNewPayment] = React.useState<Payment>({
    id: "",
    studentName: "",
    amount: 0,
    date: new Date(),
    status: "Pendiente",
  });

  const handleAddPayment = () => {
    setPayments([...payments, { ...newPayment, id: `PAY-${payments.length + 1}` }]);
    setOpen(false);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Gestión de Pagos</Typography>
        </Stack>
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={() => setOpen(true)}>
          Agregar Pago
        </Button>
      </Stack>
      <PaymentFilters />
      <PaymentsTable count={payments.length} page={0} rows={payments} rowsPerPage={5} />

      {/* Diálogo para agregar pago */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Pago</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nombre del Estudiante"
              variant="outlined"
              fullWidth
              value={newPayment.studentName}
              onChange={(e) => setNewPayment({ ...newPayment, studentName: e.target.value })}
            />
            <TextField
              label="Monto"
              variant="outlined"
              fullWidth
              type="number"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) })}
            />
            <TextField
              select
              label="Estado"
              variant="outlined"
              fullWidth
              value={newPayment.status}
              onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value as "Pendiente" | "Completado" | "Fallido" })}
            >
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Completado">Completado</MenuItem>
              <MenuItem value="Fallido">Fallido</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleAddPayment}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

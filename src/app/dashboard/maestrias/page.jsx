'use client';

import React, { useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust the path to your Firebase config
import QRCode from 'react-qr-code';

const MaestriasPage = () => {
  const [maestrias, setMaestrias] = useState([]);
  const [open, setOpen] = useState(false); // State for the dialog
  const [isLoading, setIsLoading] = useState(false);

  // State for the new maestria form
  const [nuevaMaestria, setNuevaMaestria] = useState({
    Nombre: '',
    Mencion: '',
    Modalidad: '',
    Duracion: '',
    NombreCoordinador: '',
    TelefonoCoordinador: '',
    CorreoCoordinador: '',
  });

  // Fetch maestrias from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'maestrias'), (snapshot) => {
      const maestriasData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMaestrias(maestriasData);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaMaestria({ ...nuevaMaestria, [name]: value });
  };

  // Add a new maestria to Firestore
  const agregarMaestria = async () => {
    if (
      !nuevaMaestria.Nombre ||
      !nuevaMaestria.Mencion ||
      !nuevaMaestria.Modalidad ||
      !nuevaMaestria.Duracion ||
      !nuevaMaestria.NombreCoordinador ||
      !nuevaMaestria.TelefonoCoordinador ||
      !nuevaMaestria.CorreoCoordinador
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'maestrias'), nuevaMaestria);
      // Reset the form
      setNuevaMaestria({
        Nombre: '',
        Mencion: '',
        Modalidad: '',
        Duracion: '',
        NombreCoordinador: '',
        TelefonoCoordinador: '',
        CorreoCoordinador: '',
      });
      setOpen(false); // Close the dialog
    } catch (error) {
      alert('Error al agregar maestría: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={3} sx={{ p: 4 }}>
      {/* Header */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography variant="h4" color="primary">
          Maestrías Disponibles
        </Typography>
        <Button
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          sx={{ backgroundColor: '#197030', color: 'white' }}
          onClick={() => setOpen(true)} // Open the dialog
        >
          Agregar Maestría
        </Button>
      </Stack>

      {/* Maestrias Grid */}
      <Grid container spacing={3}>
        {maestrias.length === 0 ? (
          <Typography align="center" sx={{ width: '100%' }}>
            No hay maestrías disponibles.
          </Typography>
        ) : (
          maestrias.map((maestria) => (
            <Grid item xs={12} sm={6} md={4} key={maestria.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                <CardContent>
                  {/* Nombre */}
                  <Typography variant="h6" align="center" gutterBottom>
                    {maestria.Nombre}
                  </Typography>

                  {/* Mencion */}
                  <Typography variant="subtitle1" align="center" gutterBottom>
                    Mención: {maestria.Mencion}
                  </Typography>

                  {/* Modalidad */}
                  <Typography variant="body2" align="center" gutterBottom>
                    Modalidad: {maestria.Modalidad}
                  </Typography>

                  {/* Duracion */}
                  <Typography variant="body2" align="center" gutterBottom>
                    Duración: {maestria.Duracion}
                  </Typography>

                  {/* Nombre del Coordinador */}
                  <Typography variant="body2" align="center" gutterBottom>
                    Coordinador: {maestria.NombreCoordinador}
                  </Typography>

                  {/* Teléfono del Coordinador */}
                  <Typography variant="body2" align="center" gutterBottom>
                    Teléfono: {maestria.TelefonoCoordinador}
                  </Typography>

                  {/* Correo del Coordinador */}
                  <Typography variant="body2" align="center" gutterBottom>
                    Correo: {maestria.CorreoCoordinador}
                  </Typography>

                  {/* QR Code (Same for all maestrias) */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <QRCode value="https://espe-el.espe.edu.ec/posgrados-latacunga/" size={90} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Dialog for Adding a New Maestria */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Nueva Maestría</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {/* Nombre */}
            <TextField
              label="Nombre"
              name="Nombre"
              variant="outlined"
              fullWidth
              value={nuevaMaestria.Nombre}
              onChange={handleInputChange}
            />

            {/* Mencion */}
            <TextField
              label="Mención"
              name="Mencion"
              variant="outlined"
              fullWidth
              value={nuevaMaestria.Mencion}
              onChange={handleInputChange}
            />

            {/* Modalidad */}
            <TextField
              label="Modalidad"
              name="Modalidad"
              variant="outlined"
              fullWidth
              value={nuevaMaestria.Modalidad}
              onChange={handleInputChange}
            />

            {/* Duracion */}
            <TextField
              label="Duración"
              name="Duracion"
              variant="outlined"
              fullWidth
              value={nuevaMaestria.Duracion}
              onChange={handleInputChange}
            />

            {/* Nombre del Coordinador */}
            <TextField
              label="Nombre del Coordinador"
              name="NombreCoordinador"
              variant="outlined"
              fullWidth
              value={nuevaMaestria.NombreCoordinador}
              onChange={handleInputChange}
            />

            {/* Teléfono del Coordinador */}
            <TextField
              label="Teléfono del Coordinador"
              name="TelefonoCoordinador"
              variant="outlined"
              fullWidth
              value={nuevaMaestria.TelefonoCoordinador}
              onChange={handleInputChange}
            />

            {/* Correo del Coordinador */}
            <TextField
              label="Correo del Coordinador"
              name="CorreoCoordinador"
              variant="outlined"
              fullWidth
              value={nuevaMaestria.CorreoCoordinador}
              onChange={handleInputChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={agregarMaestria}
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default MaestriasPage;

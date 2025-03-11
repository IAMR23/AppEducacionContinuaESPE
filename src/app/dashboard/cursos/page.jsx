'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { addDoc, collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import QRCode from 'react-qr-code';

const CursoScreen = () => {
  const [cursos, setCursos] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para almacenar los datos del curso tanto al crear como al editar
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Activo',
    googleFormLink: '',
  });

  // Estado para almacenar la referencia del curso que se está editando (solo para obtener la id)
  const [cursoEditado, setCursoEditado] = useState(null);

  // Cargar cursos en tiempo real desde Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cursos'), (snapshot) => {
      setCursos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Agregar un nuevo curso
  const agregarCurso = async () => {
    if (
      !nuevoCurso.nombre ||
      !nuevoCurso.descripcion ||
      !nuevoCurso.fechaInicio ||
      !nuevoCurso.fechaFin ||
      !nuevoCurso.googleFormLink
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'cursos'), {
        ...nuevoCurso,
        fecha: new Date().toISOString(),
      });
      // Reiniciar el formulario
      setNuevoCurso({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        estado: 'Activo',
        googleFormLink: '',
      });
      setOpen(false);
    } catch (error) {
      alert('Error al agregar curso: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar un curso
  const eliminarCurso = async (cursoId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      try {
        await deleteDoc(doc(db, 'cursos', cursoId));
        alert('Curso eliminado');
      } catch (error) {
        alert('Error al eliminar curso: ' + error.message);
      }
    }
  };

  // Editar un curso utilizando los valores de "nuevoCurso" y la id de "cursoEditado"
  const editarCurso = async () => {
    if (
      !nuevoCurso.nombre ||
      !nuevoCurso.descripcion ||
      !nuevoCurso.fechaInicio ||
      !nuevoCurso.fechaFin ||
      !nuevoCurso.googleFormLink
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    try {
      await updateDoc(doc(db, 'cursos', cursoEditado.id), {
        ...nuevoCurso,
      });
      setCursoEditado(null);
      // Reiniciar el formulario
      setNuevoCurso({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        estado: 'Activo',
        googleFormLink: '',
      });
      setOpen(false);
    } catch (error) {
      alert('Error al actualizar curso: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Al hacer clic en "Editar", se carga el curso seleccionado en "nuevoCurso" y se guarda su id en "cursoEditado"
  const handleEditarClick = (curso) => {
    setCursoEditado(curso);
    setNuevoCurso({
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      fechaInicio: curso.fechaInicio,
      fechaFin: curso.fechaFin,
      estado: curso.estado,
      googleFormLink: curso.googleFormLink || '',
    });
    setOpen(true);
  };

  return (
    <Stack spacing={3} sx={{ p: 4 }}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4" color="primary">
            Gestión de Cursos
          </Typography>
        </Stack>
        <Button
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          sx={{ backgroundColor: '#197030', color: 'white' }}
          onClick={() => {
            // Al agregar, reiniciamos el formulario y dejamos cursoEditado en null
            setNuevoCurso({
              nombre: '',
              descripcion: '',
              fechaInicio: '',
              fechaFin: '',
              estado: 'Activo',
              googleFormLink: '',
            });
            setCursoEditado(null);
            setOpen(true);
          }}
        >
          Agregar Curso
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {cursos.length === 0 ? (
          <Typography>No hay cursos disponibles</Typography>
        ) : (
          cursos.map((curso) => (
            <Grid item xs={12} sm={6} md={4} key={curso.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {curso.nombre}
                  </Typography>
                  <Typography variant="body2">{curso.descripcion}</Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    Fecha de Inicio: {new Date(curso.fechaInicio).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2">
                    Fecha de Fin: {new Date(curso.fechaFin).toLocaleDateString()}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <QRCode value={curso.googleFormLink || ''} size={90} />
                  </div>
                  <Typography variant="caption" sx={{ mt: 1 }} color="gray">
                    Estado: {curso.estado} | ID: {curso.id}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary" onClick={() => handleEditarClick(curso)}>
                    Editar
                  </Button>
                  <Button size="small" color="error" onClick={() => eliminarCurso(curso.id)}>
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{cursoEditado ? 'Editar Curso' : 'Agregar Curso'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nombre del Curso"
              variant="outlined"
              fullWidth
              value={nuevoCurso.nombre}
              onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={nuevoCurso.descripcion}
              onChange={(e) => setNuevoCurso({ ...nuevoCurso, descripcion: e.target.value })}
            />
            <TextField
              label="Fecha de Inicio"
              type="date"
              variant="outlined"
              fullWidth
              value={nuevoCurso.fechaInicio}
              onChange={(e) => setNuevoCurso({ ...nuevoCurso, fechaInicio: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Fecha de Fin"
              type="date"
              variant="outlined"
              fullWidth
              value={nuevoCurso.fechaFin}
              onChange={(e) => setNuevoCurso({ ...nuevoCurso, fechaFin: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Enlace de Google Forms"
              variant="outlined"
              fullWidth
              value={nuevoCurso.googleFormLink}
              onChange={(e) => setNuevoCurso({ ...nuevoCurso, googleFormLink: e.target.value })}
            />
            <TextField
              select
              label="Estado"
              variant="outlined"
              fullWidth
              value={nuevoCurso.estado}
              onChange={(e) => setNuevoCurso({ ...nuevoCurso, estado: e.target.value })}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={cursoEditado ? editarCurso : agregarCurso}
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : cursoEditado ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default CursoScreen;

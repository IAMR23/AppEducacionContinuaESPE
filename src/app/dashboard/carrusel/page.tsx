'use client';

import React, { useEffect, useState } from 'react';
import { Stack, Typography, Container } from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import CarouselCourses from '@/components/dashboard/carrusel/CarouselCourses';

// Definir el tipo de un curso
type Curso = {
  id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
};

const CarouselPage = () => {
  const [cursos, setCursos] = useState<Curso[]>([]); // <--- TIPAR EL ESTADO

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cursos'), (snapshot) => {
      setCursos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Curso))); // <--- CONVERTIR A TIPO Curso
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container sx={{ paddingTop: '20px' }}>
      <Typography variant="h4" color="primary" align="center">
        Carrusel de Cursos
      </Typography>
      <Stack spacing={3} sx={{ marginTop: '20px' }}>
        <CarouselCourses title="Cursos Populares" courses={cursos} />
        <CarouselCourses title="Nuevos Cursos" courses={cursos} />
        <CarouselCourses title="Recomendados para Ti" courses={cursos} />
      </Stack>
    </Container>
  );
};

export default CarouselPage;

'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import QRCode from 'react-qr-code';

// Definir el tipo de un curso
type Curso = {
  id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
};

// Definir los props del componente
interface CarouselCoursesProps {
  title: string;
  courses: Curso[];
}

const CarouselCourses: React.FC<CarouselCoursesProps> = ({ title, courses }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => scrollNext(), 3000);
      return () => clearInterval(interval);
    }
  }, [emblaApi, scrollNext]);

  return (
    <Box sx={{ marginBottom: '40px', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ marginBottom: '10px' }}>
        {title}
      </Typography>
      <div style={{ overflow: 'hidden' }} ref={emblaRef}>
        <div style={{ display: 'flex', gap: '10px' }}>
          {courses.map((curso) => (
            <div key={curso.id} style={{ flex: '0 0 33.33%', minWidth: '300px' }}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, padding: '10px' }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {curso.nombre}
                  </Typography>
                  <Typography variant="body2">{curso.descripcion}</Typography>
                  <Typography variant="subtitle2">
                    {new Date(curso.fechaInicio).toLocaleDateString()} - {new Date(curso.fechaFin).toLocaleDateString()}
                  </Typography>

                  {/* Agregar el código QR */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <QRCode value={curso.id} size={80} />
                  </Box>

                  <Typography variant="caption" sx={{ mt: 1 }} color="gray">
                    Estado: {curso.estado} | ID: {curso.id}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default CarouselCourses;

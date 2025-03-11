'use client';

import React, { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import Slider from 'react-slick';
import { db } from '../../../firebase';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import qrcode from 'qrcode';

const CursoCarousel = () => {
  const [cursos, setCursos] = useState([]);

  // Cargar cursos en tiempo real desde Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'cursos'), (snapshot) => {
      setCursos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // ✅ Configuración del carrusel
  const settings = {
    dots: true,
    infinite: cursos.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: cursos.length > 1,
    autoplaySpeed: 3000,
  };

  // ✅ FUNCIÓN PARA GENERAR EL PDF MEJORADO (Texto y QR más pequeños)
  const generatePDF = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let yOffset = 20; // Posición inicial en el PDF

    // ✅ Título del reporte
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18); // 🔹 Fuente reducida
    pdf.text("Reporte de Cursos", 105, yOffset, { align: "center" });
    yOffset += 10;

    // ✅ Logo centrado (solo una vez)
    const logoPath = "/assets/logoeducacion2.png";  
    try {
      pdf.addImage(logoPath, "PNG", 80, yOffset, 40, 15); // 🔹 Logo más pequeño
      yOffset += 25;
    } catch (error) {
      console.log("Error al cargar el logo:", error);
    }

    // ✅ Recorrer los cursos y agregarlos en tarjetas con mejor distribución del texto
    for (const curso of cursos) {
      pdf.setFillColor(240, 240, 240);  // Fondo gris claro
      pdf.rect(10, yOffset, 190, 45, "F"); // 🔹 Tamaño de tarjeta reducido

      // ✅ Título del curso en azul oscuro
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12); // 🔹 Fuente más pequeña
      pdf.setTextColor(0, 0, 139);
      pdf.text(curso.nombre, 15, yOffset + 8);

      // ✅ Descripción del curso distribuida correctamente
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9); // 🔹 Fuente más pequeña
      pdf.setTextColor(0, 0, 0);
      pdf.text(curso.descripcion, 15, yOffset + 15, { maxWidth: 110 });

      // ✅ Fechas de inicio y fin alineadas
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9); // 🔹 Fuente más pequeña
      pdf.text(`Inicio: ${curso.fechaInicio}   |   Fin: ${curso.fechaFin}`, 15, yOffset + 30);

      // ✅ Agregar código QR alineado a la derecha sin desbordar texto
      if (curso.googleFormLink) {
        const qrDataUrl = await qrcode.toDataURL(curso.googleFormLink, { width: 100 });
        pdf.addImage(qrDataUrl, "PNG", 155, yOffset + 5, 25, 25); // 🔹 QR más pequeño
      } else {
        pdf.text("No hay enlace disponible", 155, yOffset + 15);
      }

      yOffset += 55; // 🔹 Espaciado entre tarjetas reducido

      // Si el contenido excede la página, agregar nueva
      if (yOffset > 270) {
        pdf.addPage();
        yOffset = 20;
      }
    }

    pdf.save("Reporte_Cursos.pdf");
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={generatePDF} 
        sx={{ mb: 2 }}>
        Generar Reporte
      </Button>

      {/* ✅ Carrusel Restaurado */}
      <Slider {...settings}>
        {cursos.map((curso) => (
          <Card key={curso.id} sx={{ p: 3, m: 2, textAlign: 'center' }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* Información del Curso */}
                <Grid item xs={6}>
                  <Typography variant="h5" color="primary">
                    {curso.nombre}
                  </Typography>
                  <Typography variant="body2">{curso.descripcion}</Typography>
                  <Typography variant="subtitle2">
                    Inicio: {new Date(curso.fechaInicio).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2">
                    Fin: {new Date(curso.fechaFin).toLocaleDateString()}
                  </Typography>
                </Grid>

                {/* QR y Logo */}
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src="/assets/logoeducacion2.png" alt="edu-continua" width={'120px'} style={{ marginBottom: '10px' }} /> 
                  
                  {curso.googleFormLink ? (
                    <QRCode value={curso.googleFormLink} size={100} /> // 🔹 QR más pequeño en la interfaz
                  ) : (
                    <Typography variant="body2" color="error">No hay enlace disponible</Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default CursoCarousel;

/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Viewer, Worker, RenderPageProps } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Main from '@/components/shared/layout/Main';
import { Box, Typography } from '@mui/material';
import GeneratedPdf from '@/assets/mockData/generatedPdf.pdf';

const PdfRenderer = () => {
  const { t } = useTranslation(['mailRender']);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Main>
      <Box sx={{ marginTop: 3 }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
          <Viewer
            fileUrl={GeneratedPdf}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={1}
          />
        </Worker>
      </Box>
    </Main>
  );
};

export default PdfRenderer;

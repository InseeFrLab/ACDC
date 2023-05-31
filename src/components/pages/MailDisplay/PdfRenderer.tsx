/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Main from '@/components/shared/layout/Main';
import { Box } from '@mui/material';
import GeneratedPdf from '@/assets/mockData/generatedPdf.pdf';
import { useLocation } from 'react-router-dom';
import generateMailFromXml from '@/lib/api/remote/mailGeneration';

const PdfRenderer = () => {
  const { t } = useTranslation(['mailRender']);
  const locationState = useLocation().state;

  const location: string =
    locationState && locationState.xmlString
      ? locationState.xmlString
      : GeneratedPdf;
  const { data, error, isLoading, isSuccess, mutate } =
    useMutation(generateMailFromXml);
  const [pdfState, setPdfState] = useState(GeneratedPdf);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (locationState && locationState.xmlString) {
      mutate(location);
    }
  }, [locationState, mutate, location]);

  useEffect(() => {
    if (isSuccess) {
      setPdfState(URL.createObjectURL(data));
    }
  }, [isSuccess, data]);
  if (error || isLoading) {
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
  }

  return (
    <Main>
      <Box sx={{ marginTop: 3 }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfState}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={1}
          />
        </Worker>
      </Box>
    </Main>
  );
};

export default PdfRenderer;

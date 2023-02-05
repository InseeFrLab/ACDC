/* eslint-disable @typescript-eslint/no-shadow */
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableId,
  DroppableId,
} from 'react-beautiful-dnd';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CollectionEvent from '../../../lib/model/collectionEvents';

interface DragDropCollectionEventProps {
  collectionEvents: CollectionEvent[];
  setCollectionEvents: (collectionEvents: CollectionEvent[]) => void;
}

interface DraggableLocation {
  droppableId: string;
  index: number;
}

interface Combine {
  draggableId: string;
  droppableId: string;
}

interface DragResult {
  reason: 'DROP' | 'CANCEL';
  destination?: DraggableLocation;
  source: DraggableLocation;
  combine?: Combine;
  mode: 'FLUID' | 'SNAP';
  draggableId: DraggableId;
}

const DragDropCollectionEvent = (props: DragDropCollectionEventProps) => {
  const { t, i18n } = useTranslation(['userAttributeForm', 'form']);
  const { collectionEvents, setCollectionEvents } = props;

  const onDragEnd = (result: any) => {
    // TODO: reorder our column
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="collectionEvent">
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {collectionEvents.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    sx={{
                      p: 1,
                      my: 1,
                      width: '45%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="text.secondary"
                          sx={{ marginLeft: 1 }}
                        >
                          {`${item.collectionEventName[i18n.language]} `}
                        </Typography>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ mx: 2 }}
                        />

                        <Typography variant="body1" fontWeight="xl">
                          {`${item.label[i18n.language]} `}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropCollectionEvent;

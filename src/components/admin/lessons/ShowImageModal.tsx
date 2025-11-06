import { Card, Modal, Image, Group, Text, Badge, Button } from "@mantine/core";
import { setShowMediaModal } from "../../../features/categoryLessonSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import MapPicker from "../../map/MapPicker";

interface ShowImageModalProps {
  open: boolean;
  source: string;
  title: string;
  content: string;
  latitude?: number;
  longitude?: number;
}

const ShowImageModal = ({open, source, title, content, latitude, longitude} : ShowImageModalProps) => {
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(setShowMediaModal(false));
    };
    return (
        <Modal opened={open} onClose={handleClose} title={title}>
            <Card shadow="sm" padding="lg" radius="md">
                <Card.Section>
                    <Image
                        src={source}
                        height={'400'}
                        fit="contain"
                        radius={'md'}
                        p={10}
                    />
                </Card.Section>
            </Card>
            <Group justify="space-between" mt="md" mb="xs">
                <Badge color="pink">{content}</Badge>
            </Group>
            <Button color="blue" fullWidth mt="md" radius="md" onClick={() => handleClose()}>
                close
            </Button>
        </Modal>
    )
}

export default ShowImageModal;
import * as Dialog from "@radix-ui/react-dialog";
import Filters from "@/components/common/Filters";
import { Button } from "react-bootstrap";

export default function SidePortal(
  props: Readonly<{
    isOpen: boolean;
    toggleOpen: (val: boolean) => void;
  }>,
) {
  const { isOpen, toggleOpen } = props;
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#00000077",
            zIndex: 1000,
          }}
        />
        <Dialog.Content
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "75vw",
            backgroundColor: "#fff",
            zIndex: 1001,
          }}
        >
          <div style={{ height: "100%", maxHeight: "100%", overflow: "auto" }}>
            <Filters />
          </div>
        </Dialog.Content>
        <Dialog.Close asChild>
          <Button
            variant="light"
            className="fs-5"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1001,
            }}
          >
            <i className="ti ti-x"></i>
          </Button>
        </Dialog.Close>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

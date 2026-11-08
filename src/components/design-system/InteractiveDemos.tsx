"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";

const DEMO_PAGE_COUNT = 12;

export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={isOpen}
        onClose={close}
        title="Add a service"
        description="Services are what clients can book with your organization."
        footer={
          <>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>Save service</Button>
          </>
        }
      >
        <Input label="Service name" placeholder="e.g. Initial consultation" />
      </Modal>
    </>
  );
}

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={DEMO_PAGE_COUNT} onPageChange={setPage} />;
}

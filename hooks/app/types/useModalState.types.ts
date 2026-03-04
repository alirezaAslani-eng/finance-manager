interface UseModalStateProps<TInfo = unknown> {
  isParentModal?: boolean;
  initialModalState?: boolean | (() => boolean);
  initialModalInfo?: TInfo | (() => TInfo) | null;
}

interface UseModalStateReturn<TInfo = unknown> {
  isOpenModal: boolean;
  modalInfo: TInfo | null;
  openModal(info: TInfo): void;
  closeModal(): void;
}
export type { UseModalStateProps, UseModalStateReturn };

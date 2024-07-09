import { FC } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from "@radix-ui/react-icons";
import Select, { SingleValue } from 'react-select';
import { ACCEPTED_FILE_TYPES } from "@/shared/configs/files";
import { useExportMapStore } from "@/shared/store/export";
import { cx } from "class-variance-authority";

export const ExportDialog: FC = () => {
    const { setScreening, type, setType } = useExportMapStore();

    return (
        <Dialog.Portal>
        <Dialog.Overlay className="inset-0 w-screen h-screen bg-base-100/20 fixed anumate-[overlayShow_150ms_cubic-bezier(0.16,_1,_0.3,_1)]" />
        <Dialog.Content className="card gap-3 bg-base-100 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-[contentShow_150ms_cubic-bezier(0.16,_1,_0.3,_1)] p-3 shadow-lg rounded">
          <Dialog.Title className="text-3xl">Настройки экспорта</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Выберите расширение для сохранения изображения карты
          </Dialog.Description>
          <Select
            unstyled
            value={ACCEPTED_FILE_TYPES.find(({value}) => value === type)}
            onChange={(e: SingleValue<{ label: string, value: string }>) => setType(e!.value)}
            classNames={{
                control: () => 'flex items-center justify-between h-12 px-3 rounded border-2 border-stone-300 text-stone-400 font-medium bg-base-300',
                option: ({ isFocused, isSelected }) =>
                    cx(
                      'flex items-center px-3 py-2 bg-base-100 text-stone-400 font-nornmal my-auto',
                      isSelected && 'bg-base-300',
                      isFocused && !isSelected && 'bg-base-300'
                    ),
                menu: () => 'rounded shadow-md bg-base-100 flex flex-col'
            }}
            options={ACCEPTED_FILE_TYPES}
          />
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <button className="btn !rounded btn-accent btn-sm w-full" onClick={() => setScreening(true)}>Сохранить</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="btn btn-ghost btn-sm p-1 absolute top-4 right-4" aria-label="Close">
              <Cross2Icon className="w-5 h-5 hover:text-red-500" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    );
}
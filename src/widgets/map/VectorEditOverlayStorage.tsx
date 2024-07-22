import { VectorLayer } from "@/shared/deck";
import { useEditMapStore } from "@/shared/store/edit";
import { getBaseStylesForObject } from "@/shared/utils";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import * as  ScrollArea from "@radix-ui/react-scroll-area";
import { cx } from "class-variance-authority";
import { Fragment, useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";
import { ColorChangerInput } from "./ColorChangerInput";

type VectorEditOverlayStorageProps = { layer?: VectorLayer; featureId: number, featureType: any };

export const VectorEditOverlayStorage = ({
  layer,
  featureId, featureType
}: VectorEditOverlayStorageProps) => {
  const baseLayerStyles = getBaseStylesForObject(featureType);



  const { editableLayer } = useEditMapStore();
  if (!editableLayer) return null;

  const properties = editableLayer.featureCollection.features.find(
    f => f.id === featureId
  )?.properties;

  console.log(editableLayer.featureCollection.features);
  const methods = useForm<any>({
    defaultValues: {
      fields: properties
        ? Object.entries(properties).map(property => ({
          key: property[0],
          value: property[1],
        }))
        : [],
    },
  });

  useEffect(() => {
    methods.setValue(
      'fields',
      properties
        ? Object.entries(properties).map(property => ({
          key: property[0],
          value: property[1],
        }))
        : []
    );
  }, [layer, featureId]);

  const { fields, append, remove } = useFieldArray<any>({
    control: methods.control,
    name: 'fields',
  });

  const f = useWatch({
    control: methods.control,
    name: 'fields',
  });

  useEffect(() => {
    const canAddBaseLayerStyles = baseLayerStyles.some(
      s => !fields.map(f => f.key).includes(s.key)
    );
    setCanAddBaseStyles(canAddBaseLayerStyles);

    const props: Record<string, any> = {};
    f.filter(({ key }) => !!key).forEach(({ key, value }) => {
      props[`${key}`] = value;
    });

    useEditMapStore.getState().setPropertiesToFeature(featureId, props);
  }, [f]);

  const addBaseLayerStyles = () => {
    append(
      baseLayerStyles.filter(s => !fields.map(f => f.key).includes(s.key))
    );
  };

  const [canAddBaseLayerStyles, setCanAddBaseStyles] = useState(false);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2 justify-between items-center'>
        <p className='text-xs font-medium'>Хранилище</p>
        {!!fields.length && (
          <button className="btn btn-error btn-outline btn-xs p-1"
            onClick={() => methods.setValue('fields', [])}
          >
            <TiDeleteOutline className='w-3 h-3' />
            <p>Очистить хранилище</p>
          </button>
        )}
      </div>

      <ScrollArea.Root className='w-full'>
        <ScrollArea.Viewport
          className={cx(
            'max-h-[140px]',
            fields.length > 4 && 'overflow-hidden pr-3'
          )}
        >
          <div className='grid grid-cols-[144px_144px_24px] gap-2 items-center'>
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                {field.key === 'fill' || field.key === 'stroke' ? (
                  <>
                    <Controller
                      control={methods.control}
                      name={`fields.${index}.key`}
                      render={({ field }) => (
                        <input
                          className="input input-xs input-bordered w-full max-w-xs !outline-none" {...field} placeholder='Ключ' />
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name={`fields.${index}.value`}
                      render={({ field }) => (
                        <ColorChangerInput
                          color={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </>
                ) : (
                  <>
                    <Controller
                      control={methods.control}
                      name={`fields.${index}.key`}
                      render={({ field }) => (
                        <input
                          className="input input-xs input-bordered w-full max-w-xs !outline-none" {...field} placeholder='Ключ' />
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name={`fields.${index}.value`}
                      render={({ field }) => (
                        <input
                          className="input input-xs input-bordered w-full max-w-xs !outline-none" {...field} placeholder='Значение' />
                      )}
                    />
                  </>
                )}
                <button className="btn btn-ghost btn-xs p-1"
                  onClick={() => remove(index)}
                >
                  <Cross1Icon className='w-4 h-4' />
                </button>
              </Fragment>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation='vertical'
          className='flex select-none touch-none bg-gray-300 w-[6px] rounded overflow-hidden'
        >
          <ScrollArea.Thumb className='bg-gray-600 flex-1 rounded' />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <div className='flex gap-4 justify-between'>
        <button className="btn btn-ghost btn-xs p-1" onClick={() => append({ key: '', value: '' })}>
          <PlusIcon className='w-3 h-3' />
          <p>Добавить поле</p>
        </button>
        {canAddBaseLayerStyles && (
          <button className="btn btn-ghost btn-xs p-1 gap-1 items-center"
            onClick={addBaseLayerStyles}>
            <PlusIcon className='w-3 h-3' />
            <p>Добавить базовые стили</p>
          </button>
        )}
      </div>
    </div>
  );
};

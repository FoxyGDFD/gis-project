import { baseLayerStyles } from "@/shared/data";
import { VectorLayer } from "@/shared/deck";
import { useEditMapStore } from "@/shared/store/edit";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Fragment, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";

type VectorStorageFields = {
  fields: {
    key: string;
    value: string;
  }[];
};

type VectorEditOverlayStorageProps = { layer?: VectorLayer; featureId: number };

export const VectorEditOverlayStorage = ({
  layer,
  featureId,
}: VectorEditOverlayStorageProps) => {
  const properties = layer?.props.getProperties(featureId);

  console.log(properties, layer, featureId);

  const methods = useForm<VectorStorageFields>({
    defaultValues: {
      fields: properties
        ? Object.entries(properties).map((property) => ({
            key: property[0],
            value: property[1],
          }))
        : [],
    },
  });

  useEffect(() => {
    methods.setValue(
      "fields",
      properties
        ? Object.entries(properties).map((property) => ({
            key: property[0],
            value: property[1],
          }))
        : []
    );
  }, [layer, featureId]);

  const { fields, append, remove } = useFieldArray<VectorStorageFields>({
    control: methods.control,
    name: "fields",
  });

  const f = useWatch({
    control: methods.control,
    name: "fields",
  });

  useEffect(() => {
    const canAddBaseLayerStyles = baseLayerStyles.some(
      (s) => !fields.map((f) => f.key).includes(s.key)
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
      baseLayerStyles.filter((s) => !fields.map((f) => f.key).includes(s.key))
    );
  };

  const [canAddBaseLayerStyles, setCanAddBaseStyles] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between items-center">
        <p className="text-xs font-medium">Хранилище</p>
        {!!fields.length && (
          <button className="btn btn-ghost btn-xs p-1">
            <TiDeleteOutline className="w-3 h-3 fill-red-500" />
            <p>Очистить хранилище</p>
          </button>
        )}
      </div>

      <div className="grid grid-cols-[.5fr_.5fr_24px] gap-2 items-center">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <Controller
              control={methods.control}
              name={`fields.${index}.key`}
              render={({ field }) => (
                <input
                  className="input input-xs input-bordered w-full max-w-xs !outline-none"
                  {...field}
                  placeholder="Ключ"
                />
              )}
            />
            <Controller
              control={methods.control}
              name={`fields.${index}.value`}
              render={({ field }) => (
                <input
                  className="input input-xs input-bordered w-full max-w-xs !outline-none"
                  {...field}
                  placeholder="Значение"
                />
              )}
            />
            <button
              className="btn btn-ghost btn-xs p-1"
              onClick={() => remove(index)}
            >
              <Cross1Icon className="w-4 h-4" />
            </button>
          </Fragment>
        ))}
      </div>

      <div className="flex gap-4 justify-between">
        <button
          className="btn btn-xs"
          onClick={() => append({ key: "", value: "" })}
        >
          <PlusIcon className="w-3 h-3" />
          <p>Добавить поле</p>
        </button>
        {canAddBaseLayerStyles && (
          <button className="btn btn-xs" onClick={addBaseLayerStyles}>
            <PlusIcon className="w-3 h-3" />
            <p>Добавить базовые стили</p>
          </button>
        )}
      </div>
    </div>
  );
};

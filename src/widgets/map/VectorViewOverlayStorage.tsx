import { VectorLayer } from "@/shared/deck";
import { Fragment } from "react";

type VectorEditOverlayStorageProps = { layer?: VectorLayer; featureId: number };

export const VectorViewOverlayStorage = ({
  layer,
  featureId,
}: VectorEditOverlayStorageProps) => {
  const properties = layer?.props.getProperties(featureId);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium">Хранилище</p>

      <div className="grid grid-cols-[1fr_1fr] gap-2 items-center">
        {properties && Object.keys(properties).length ? (
          Object.entries(properties).map(([key, value], index) => (
            <Fragment key={index}>
              <input
                className="input input-xs !text-white input-bordered w-full max-w-xs"
                value={key}
                placeholder="Ключ"
                disabled
              />
              <input
                className="input input-xs !text-white input-bordered w-full max-w-xs"
                value={value}
                placeholder="Значение"
                disabled
              />
            </Fragment>
          ))
        ) : (
          <p className="text-xs">Данных не найдено</p>
        )}
      </div>
    </div>
  );
};

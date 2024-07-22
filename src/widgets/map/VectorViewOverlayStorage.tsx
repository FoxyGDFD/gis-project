import { baseLayerStyles } from '@/shared/data';
import { VectorLayer } from '@/shared/deck';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { cx } from 'class-variance-authority';
import { Fragment } from 'react';

type VectorViewOverlayStorageProps = { layer?: VectorLayer; featureId: string };

export const VectorViewOverlayStorage = ({
  layer,
  featureId,
}: VectorViewOverlayStorageProps) => {
  const properties = Object.entries(
    layer?.props.getProperties(featureId) || {}
  )?.filter(p => !baseLayerStyles.map(s => s.key).includes(p[0] as any));

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-xs font-medium'>Хранилище</p>

      <ScrollArea.Root className='w-full'>
        <ScrollArea.Viewport
          className={cx(
            'max-h-[140px]',
            properties.length > 6 && 'overflow-hidden pr-3'
          )}
        >
          <div className='grid grid-cols-[150px_150px] gap-2 items-center'>
            {properties.length ? (
              properties.map(([key, value], index) => (
                <Fragment key={index}>
                  <input
                    className="input input-xs input-bordered w-full max-w-xs !outline-none disabled:!text-white" value={key} placeholder='Ключ' disabled />
                  <input
                    className="input input-xs input-bordered w-full max-w-xs !outline-none disabled:!text-white"
                    value={value}
                    placeholder='Значение'
                    disabled
                  />
                </Fragment>
              ))
            ) : (
              <p className='text-xs'>Данных не найдено</p>
            )}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation='vertical'
          className='flex select-none touch-none bg-gray-300 w-[6px] rounded overflow-hidden'
        >
          <ScrollArea.Thumb className='bg-gray-600 flex-1 rounded' />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

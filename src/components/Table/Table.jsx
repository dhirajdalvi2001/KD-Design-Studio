import {
  Table as NextUITable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from '@nextui-org/react';
import classNames from 'classnames';

export default function Table({
  className,
  headers = [],
  body = [],
  isLoading,
  isListPage,
}) {
  const loadingRows = Array(10).fill(null);

  if (!headers || !body) {
    return null;
  }

  return (
    <div className="relative">
      <NextUITable
        aria-label="Table"
        classNames={{
          wrapper: classNames(
            'p-0 rounded-none',
            isListPage
              ? 'max-h-[calc(100vh-154px)]'
              : 'max-h-[calc(100vh-100px)]',
            className
          ),
          base: 'overflow-auto bg-transparent shadow-none ',
          table:
            'text-foreground-500 border-2 border-foreground-200 rounded-lg',
          th: '!h-[40px]',
          tr: '!h-[40px] border-b-2',
          td: '!py-0 !h-[40px]',
        }}
        shadow="none"
      >
        <TableHeader>
          {headers.map((header, index) => (
            <TableColumn
              key={index}
              className={classNames(
                'sticky top-0 bg-background z-10',
                header?.className
              )}
            >
              {header?.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={'No data to display'}>
          {isLoading
            ? loadingRows.map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="h-8 w-full rounded-lg" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : body.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="!text-xs py-2">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </NextUITable>
    </div>
  );
}

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HStack } from '@chakra-ui/react';
import { DOTS, usePagination } from './hook/use-pagination.hook';
import { PageButton } from './table-button';

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
  onPageChange?: (n: number) => void;
}

export const Pagination = (props: UsePaginationProps) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range, we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange && onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange && onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <HStack spacing="6px" rounded="md" shadow="sm" aria-label="Pagination">
      <PageButton roundedLeft="md" onClick={onPrevious} isDisabled={currentPage === 1}>
        <FiChevronLeft size={20} color="gray.400" aria-hidden="true" />
      </PageButton>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <PageButton key={`${pageNumber}-${i}-dots`} isDisabled={true} dots={true}>
              <span>&#8230;</span>
            </PageButton>
          );
        }
        return (
          <PageButton
            key={`${pageNumber}-${i}`}
            selected={pageNumber === currentPage}
            textAlign="center"
            onClick={() => onPageChange && onPageChange(Number(pageNumber))}
          >
            <span>{pageNumber}</span>
          </PageButton>
        );
      })}
      <PageButton roundedRight="md" onClick={onNext} isDisabled={currentPage === lastPage}>
        <FiChevronRight size={20} color="gray.400" aria-hidden="true" />
      </PageButton>
    </HStack>
  );
};

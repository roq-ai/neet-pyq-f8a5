import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

interface BreadcrumbsProps {
  items?: {
    label: string;
    link?: string;
    isCurrent?: boolean;
  }[];
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const { items } = props;
  return (
    <Breadcrumb spacing="8px" separator={<FiChevronRight color="base.400" />} mb={6}>
      {items.map((item, i) => (
        <BreadcrumbItem key={i}>
          <BreadcrumbLink
            as={item.isCurrent ? Link : NextLink}
            href={item.isCurrent ? undefined : item.link}
            isCurrentPage={item.isCurrent}
            color={item.isCurrent ? 'base.content' : 'base.400'}
            fontSize={{ base: '0.875rem', md: '1rem' }}
          >
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

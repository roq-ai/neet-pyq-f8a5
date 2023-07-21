import { Box } from '@chakra-ui/react';
import { DropdownCloseIcon } from 'icons/dropdown-close-icon';
import { DropdownOpenIcon } from 'icons/dropdown-open-icon';
import ReactSelect, { Props, StylesConfig, ActionMeta } from 'react-select';

export interface SelectPropsInterface extends Props {}

const CustomIndicator = (props: any) => {
  const { selectProps, isMenuOpen } = props;
  const isOpen = selectProps.menuIsOpen || isMenuOpen;

  return (
    <Box display="flex" paddingX={2}>
      {isOpen ? (
        <DropdownOpenIcon color="base.400" width="1.25rem" height="1.25rem" />
      ) : (
        <DropdownCloseIcon color="base.400" width="1.25rem" height="1.25rem" />
      )}
    </Box>
  );
};

export function Select(props: SelectPropsInterface) {
  const basic = {
    background: 'base.200',
    color: 'base.content',
    borderRadius: '4px',
    ...(props.isMulti
      ? {
          minHeight: '2.5rem',
        }
      : {
          height: '2.5rem',
        }),
    width: '100%',
  };
  const customStyles: StylesConfig<any, false> = {
    container: (styles) => ({
      ...styles,
      ...basic,
    }),
    singleValue: (styles) => ({
      ...styles,
      paddingBottom: '4px',
      color: 'var(--chakra-colors-base-content)',
    }),
    placeholder: (styles) => ({
      ...styles,
      paddingBottom: '4px',
    }),
    valueContainer: (styles) => ({
      ...styles,
      paddingTop: '0px',
      paddingBottom: '0px',
    }),
    control: (styles) => ({
      ...styles,
      ...basic,
      border: '0px',
      borderRadius: '4px',
      backgroundColor: 'var(--chakra-colors-base-200)',
      ':hover': {
        borderColor: 'var(--chakra-colors-whiteAlpha-400)',
      },
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      visibility: 'hidden',
    }),
    input: (styles) => ({ ...styles }),
    menuList: (styles) => ({
      ...styles,
      background: 'var(--chakra-colors-base-100)',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? 'var(--chakra-colors-primary-transparent)'
          : isFocused
          ? 'var(--chakra-colors-primary-transparent)'
          : 'var(--chakra-colors-base-100)',
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? 'var(--chakra-colors-base-content)'
          : 'var(--chakra-colors-base-content)',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled ? (isSelected ? data.color : 'var(--chakra-colors-primary-main)') : undefined,
          color: !isDisabled ? (isSelected ? data.color : 'var(--chakra-colors-primary-content)') : undefined,
        },
      };
    },
    multiValue: (style) => ({
      ...style,
      paddingLeft: '4px',
      color: 'var(--chakra-colors-neutral-main) !important',
      display: 'flex',
      height: '1.5rem',
      alignItems: 'center',
      borderRadius: '9999px',
      background: 'var(--chakra-colors-neutral-transparent)',
      '& div': {
        color: 'var(--chakra-colors-neutral-main) !important',
      },
    }),
    multiValueRemove: (style) => ({
      ...style,
      borderRadius: '50%',
      width: '1.5rem',
      height: '1.5rem',
    }),
  };

  return (
    <>
      <ReactSelect
        {...props}
        styles={customStyles}
        components={{
          IndicatorsContainer: CustomIndicator,
        }}
      />
    </>
  );
}

import { Box, IconButton, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { CalendarLeftIcon } from 'icons/calendar-left-icon';
import { CalendarRightIcon } from 'icons/calendar-right-icon';
import { forwardRef } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { FiCalendar } from 'react-icons/fi';

const customDateInput = ({ value, onClick, onChange }: any, ref: any) => (
  <Input
    autoComplete="off"
    background="base.200"
    color="base.content"
    height="2.5rem"
    borderRadius="4px"
    border="0px"
    padding="0.75rem 1rem"
    value={value}
    ref={ref}
    onClick={onClick}
    onChange={onChange}
  />
);
customDateInput.displayName = 'DateInput';
const CustomInput = forwardRef(customDateInput);

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => {
  return (
    <Stack pb={2} isInline alignItems="center" textAlign="left" px={0}>
      <IconButton
        aria-label="Previous Month"
        sx={{
          minWidth: 'unset !important',
          height: 'unset !important',
        }}
        icon={
          <CalendarLeftIcon
            width="2rem"
            height="2rem"
            bg="var(--chakra-colors-base-300)"
            color="var(--chakra-colors-base-content)"
          />
        }
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <Text color="base.content" flex={1} fontSize="1.125rem" fontWeight={700} textAlign={'center'}>
        {new Intl.DateTimeFormat('en-AU', {
          year: 'numeric',
          month: 'long',
        }).format(date)}
      </Text>
      <IconButton
        aria-label="Next Month"
        sx={{
          minWidth: 'unset !important',
          height: 'unset !important',
        }}
        icon={
          <CalendarRightIcon
            width="2rem"
            height="2rem"
            bg="var(--chakra-colors-base-300)"
            color="var(--chakra-colors-base-content)"
          />
        }
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </Stack>
  );
};

interface DatePickerProps extends ReactDatePickerProps {}

const DatePicker = ({ selected, onChange, ...props }: DatePickerProps) => {
  const datePickerStyles = {
    '& .react-datepicker': {
      backgroundColor: 'base.100',
      borderColor: 'base.300',
      '&__triangle': {
        visibility: 'hidden',
      },
      '&__month-container': {
        border: '1px',
        borderRadius: '0px',
        borderColor: 'base.300',
      },
      '&__header': {
        bg: 'none',
        borderBottom: 'none',
        p: 3,
      },
      '&__month': {
        mt: 0,
      },
      '&__day-name': {
        color: 'base.content',
        fontWeight: 600,
        w: { base: 8, md: 9 },
        fontSize: '1rem',
      },
      '&__day': {
        lineHeight: '28px',
        color: 'base.content',
        fontSize: '0.875rem',
        w: { base: 8, md: 9 },
        h: 8,
        borderRadius: '4px',
        '&--selected': {
          backgroundColor: 'primary.main',
          color: 'primary.content',
        },
        '&--keyboard-selected': {
          backgroundColor: 'secondary.main',
          color: 'secondary.content',
          ':hover': {
            backgroundColor: 'primary.main',
            color: 'primary.content',
          },
        },
        '&--outside-month': {
          opacity: '0.5',
        },
      },
      '&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover': {
        backgroundColor: 'primary.focus',
        color: 'primary.content',
      },
      '&__day--today': {},
      '&__day--selected, &__day--keyboard-selected': {},
    },
  };
  return (
    <>
      <Box display="flex" alignItems="center" sx={datePickerStyles}>
        <InputGroup style={{ zIndex: 999 }}>
          <ReactDatePicker
            wrapperClassName="w-full"
            selected={selected}
            onChange={onChange}
            customInput={<CustomInput />}
            dateFormat="dd-MM-yyyy"
            renderCustomHeader={CustomHeader}
            {...props}
          />
          <InputRightElement pointerEvents="none">
            <IconButton
              aria-label="Calendar"
              icon={<FiCalendar fontSize="sm" color="var(--chakra-colors-base-400)" />}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
};

export default DatePicker;

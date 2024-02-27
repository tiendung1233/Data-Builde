import React, { useState, useRef, useEffect } from "react";
import {
  Popover,
  Button,
  TextField,
  Icon,
  Scrollable,
  OptionList,
  InlineGrid,
  Box,
  Select,
  BlockStack,
  InlineStack,
  DatePicker,
  useBreakpoints,
} from "@shopify/polaris";
import { CalendarMinor } from "@shopify/polaris-icons";

type DateRange = {
  title: string;
  alias: string;
  period: {
    since: Date;
    until: Date;
  };
};

interface DateRangePickerProps {
  inputValues: {
    since?: string | undefined;
    until?: string | undefined;
  };
  setInputValues: React.Dispatch<
    React.SetStateAction<{
      since?: string | undefined;
      until?: string | undefined;
    }>
  >;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  inputValues,
  setInputValues,
}) => {
  const { mdDown, lgUp } = useBreakpoints();
  const shouldShowMultiMonth = lgUp;
  const allDay = new Date(1970, 0, 1);
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const yesterday = new Date(
    new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0),
  );
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const ranges: DateRange[] = [
    {
      title: "All",
      alias: "all",
      period: {
        since: allDay,
        until: today,
      },
    },
    {
      title: "Today",
      alias: "today",
      period: {
        since: today,
        until: today,
      },
    },
    {
      title: "Yesterday",
      alias: "yesterday",
      period: {
        since: yesterday,
        until: yesterday,
      },
    },
    {
      title: "Last 7 days",
      alias: "last7days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 7)).setHours(
            0,
            0,
            0,
            0,
          ),
        ),
        until: yesterday,
      },
    },
    {
      title: "Last month",
      alias: "last30days",
      period: {
        since: lastMonth,
        until: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0),
      },
    },
  ];

  const [popoverActive, setPopoverActive] = useState(false);
  const [activeDateRange, setActiveDateRange] = useState<DateRange>(ranges[0]);

  const [{ month, year }, setDate] = useState({
    month: activeDateRange?.period?.since?.getMonth(),
    year: activeDateRange?.period?.since?.getFullYear(),
  });
  const datePickerRef = useRef<HTMLDivElement>(null);
  const VALID_YYYY_MM_DD_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}/;

  function isDate(date: string): boolean {
    return !isNaN(new Date(date).getDate());
  }

  function isValidYearMonthDayDateString(date: string): boolean {
    return VALID_YYYY_MM_DD_DATE_REGEX.test(date) && isDate(date);
  }

  function isValidDate(date: string): boolean {
    return date.length === 10 && isValidYearMonthDayDateString(date);
  }

  function parseYearMonthDayDateString(input: string): Date {
    const [year, month, day] = input.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  function formatDateToYearMonthDayDateString(date: Date): string {
    const year = String(date?.getFullYear());
    let month = String(date?.getMonth() + 1);
    let day = String(date?.getDate());
    if (month.length < 2) {
      month = String(month).padStart(2, "0");
    }
    if (day.length < 2) {
      day = String(day).padStart(2, "0");
    }
    return [year, month, day].join("-");
  }

  function formatDate(date: Date): string {
    return formatDateToYearMonthDayDateString(date);
  }

  function nodeContainsDescendant(
    rootNode: Node,
    descendant: Node | null,
  ): boolean {
    if (!descendant) return false;
    if (rootNode === descendant) {
      return true;
    }
    let parent = descendant.parentNode;
    while (parent != null) {
      if (parent === rootNode) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }

  function isNodeWithinPopover(node: Node | null): boolean {
    return datePickerRef?.current
      ? nodeContainsDescendant(datePickerRef.current, node)
      : false;
  }

  function handleStartInputValueChange(value: string) {
    setInputValues((prevState) => {
      return { ...prevState, since: value };
    });
    if (isValidDate(value)) {
      const newSince = parseYearMonthDayDateString(value);
      setActiveDateRange((prevState) => {
        const newPeriod =
          prevState.period && newSince <= prevState.period.until
            ? { since: newSince, until: prevState.period.until }
            : { since: newSince, until: newSince };
        return {
          ...prevState,
          period: newPeriod,
        };
      });
    }
  }

  function handleEndInputValueChange(value: string) {
    setInputValues((prevState) => ({ ...prevState, until: value }));
    if (isValidDate(value)) {
      const newUntil = parseYearMonthDayDateString(value);
      setActiveDateRange((prevState) => {
        const newPeriod =
          prevState.period && newUntil >= prevState.period.since
            ? { since: prevState.period.since, until: newUntil }
            : { since: newUntil, until: newUntil };
        return {
          ...prevState,
          period: newPeriod,
        };
      });
    }
  }

  function handleInputBlur({
    relatedTarget,
  }: React.FocusEvent<HTMLInputElement>) {
    const isRelatedTargetWithinPopover =
      relatedTarget != null && isNodeWithinPopover(relatedTarget);
    if (isRelatedTargetWithinPopover) {
      return;
    }
    setPopoverActive(false);
  }

  function handleMonthChange(month: number, year: number) {
    setDate({ month, year });
  }

  function handleCalendarChange({ start, end }: { start: Date; end: Date }) {
    const newDateRange = ranges.find((range) => {
      return (
        range.period.since.valueOf() === start.valueOf() &&
        range.period.until.valueOf() === end.valueOf()
      );
    }) || {
      alias: "custom",
      title: "Custom",
      period: {
        since: start,
        until: end,
      },
    };
    setActiveDateRange(newDateRange);
  }

  function apply() {
    setPopoverActive(false);
  }

  function cancel() {
    setPopoverActive(false);
  }

  useEffect(() => {
    if (activeDateRange) {
      setInputValues({
        since: formatDate(activeDateRange.period.since),
        until: formatDate(activeDateRange.period.until),
      });
      function monthDiff(
        referenceDate: { month: number; year: number },
        newDate: { month: number; year: number },
      ): number {
        return (
          newDate.month -
          referenceDate.month +
          12 * (referenceDate.year - newDate.year)
        );
      }
      const monthDifference = monthDiff(
        { year, month },
        {
          year: activeDateRange.period.until?.getFullYear(),
          month: activeDateRange.period.until?.getMonth(),
        },
      );
      if (monthDifference > 1 || monthDifference < 0) {
        setDate({
          month: activeDateRange.period.until?.getMonth(),
          year: activeDateRange.period.until?.getFullYear(),
        });
      }
    }
  }, [activeDateRange]);

  const buttonValue =
    activeDateRange.title === "Custom"
      ? activeDateRange.period.since?.toDateString() +
        " - " +
        activeDateRange.period.until?.toDateString()
      : activeDateRange.title;

  return (
    <Popover
      active={popoverActive}
      autofocusTarget="none"
      preferredAlignment="left"
      preferredPosition="below"
      fluidContent
      sectioned={false}
      fullHeight
      activator={
        <Button
          size="slim"
          icon={CalendarMinor}
          onClick={() => setPopoverActive(!popoverActive)}
        >
          {buttonValue}
        </Button>
      }
      onClose={() => setPopoverActive(false)}
    >
      <Popover.Pane fixed>
        <div ref={datePickerRef}>
          <InlineGrid
            columns={{
              xs: "1fr",
              md: "max-content max-content",
            }}
            gap={"0"}
          >
            <Box
              maxWidth={mdDown ? "516px" : "212px"}
              width={mdDown ? "100%" : "212px"}
              padding={{ xs: "500", md: "0" }}
              paddingBlockEnd={{ xs: "100", md: "0" }}
            >
              {mdDown ? (
                <Select
                  label="dateRangeLabel"
                  labelHidden
                  onChange={(value) => {
                    const result = ranges.find(
                      ({ title, alias }) => title === value || alias === value,
                    );
                    setActiveDateRange(result!);
                  }}
                  value={activeDateRange?.title || activeDateRange?.alias || ""}
                  options={ranges.map(({ alias, title }) => title || alias)}
                />
              ) : (
                <Scrollable style={{ height: "334px" }}>
                  <OptionList
                    options={ranges.map((range) => ({
                      value: range.alias!,
                      label: range.title,
                    }))}
                    selected={activeDateRange.alias as any}
                    onChange={(value) => {
                      setActiveDateRange(
                        ranges.find((range) => range.alias === value[0])!,
                      );
                    }}
                  />
                </Scrollable>
              )}
            </Box>
            <Box padding={{ xs: "500" }} maxWidth={mdDown ? "320px" : "516px"}>
              <BlockStack gap="400">
                <InlineStack gap="200">
                  <div style={{ flexGrow: 1 }}>
                    <TextField
                      role="combobox"
                      label={"Since"}
                      labelHidden
                      prefix={<Icon source={CalendarMinor} />}
                      value={inputValues.since}
                      onChange={handleStartInputValueChange}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                  </div>
                  {/* <Icon source={ArrowRightIcon} /> */}
                  <div style={{ flexGrow: 1 }}>
                    <TextField
                      role="combobox"
                      label={"Until"}
                      labelHidden
                      prefix={<Icon source={CalendarMinor} />}
                      value={inputValues.until}
                      onChange={handleEndInputValueChange}
                      onBlur={handleInputBlur}
                      autoComplete="off"
                    />
                  </div>
                </InlineStack>
                <div>
                  <DatePicker
                    month={month}
                    year={year}
                    selected={{
                      start: activeDateRange.period.since,
                      end: activeDateRange.period.until,
                    }}
                    onMonthChange={handleMonthChange}
                    onChange={handleCalendarChange}
                    multiMonth={shouldShowMultiMonth}
                    allowRange
                  />
                </div>
              </BlockStack>
            </Box>
          </InlineGrid>
        </div>
      </Popover.Pane>
      <Popover.Pane fixed>
        <Popover.Section>
          <InlineStack align="end">
            <Button onClick={cancel}>Cancel</Button>
            <Button variant="primary" onClick={apply}>
              Apply
            </Button>
          </InlineStack>
        </Popover.Section>
      </Popover.Pane>
    </Popover>
  );
};

export default DateRangePicker;

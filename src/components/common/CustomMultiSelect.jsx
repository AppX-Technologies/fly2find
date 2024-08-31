import React, { useMemo, useCallback, useState } from "react";
import Select, { components } from "react-select";

const CustomMultiSelect = ({
  items,
  selectedItems = [],
  onChange,
  includeSelectAll = false,
  maxToShow = 10,
  placeholder = "",
  height = "30px",
  showMessageOnlyOnOverflow = false,
  maxItemCustomMessage = (length) =>
    `+ ${length} user${length === 1 ? "" : "s"} selected`,
  selectAllLabel = "All Items",
  isMulti = true,
  isGroupped = false,
  closeMenuOnSelect = false,
  closeMenuOnScroll = true,
  fieldColors,
  isClearable = false,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState("");
  const selectAllOption = useMemo(
    () => ({ label: selectAllLabel, value: "all" }),
    [selectAllLabel]
  );

  const handleBlur = () => {
    const selectedOption =
      !isMulti &&
      inputValue &&
      items?.find(
        (i) =>
          i?.value === inputValue ||
          i.id === inputValue ||
          (!isNaN(i?.value) &&
            !isNaN(inputValue) &&
            Number(i?.value) === Number(inputValue)) ||
          Number(i?.id) === Number(inputValue)
      );
    if (selectedOption) {
      onChange(selectedOption?.value || selectedOption?.id);
    }
  };

  const hiddenOptions = useMemo(() => {
    return selectedItems?.length > maxToShow
      ? selectedItems.slice(0, maxToShow)
      : [];
  }, [selectedItems, maxToShow]);

  const options = useMemo(() => {
    const baseOptions =
      isMulti && !isGroupped
        ? items
            .filter((x) => !hiddenOptions.includes(x.value))
            .map((item) => ({
              label: item?.label || item?.name,
              value: item.value || item._id,
            }))
        : items;
    if (includeSelectAll) {
      return [selectAllOption, ...baseOptions];
    }
    return baseOptions;
  }, [items, hiddenOptions, includeSelectAll, isMulti, isGroupped]);

  const handleChange = useCallback(
    (selectedOptions) => {
      if (isMulti && selectedOptions.some((option) => option.value === "all")) {
        onChange(items.map((item) => item._id || item?.value));
      } else {
        onChange(
          isMulti
            ? selectedOptions.map((option) => option.value)
            : selectedOptions?.value
        );
      }
    },
    [onChange, isMulti, items]
  );

  const value = useMemo(() => {
    if (!isMulti && isGroupped) {
      return items
        .flatMap((item) => item?.options)
        .filter((item) => item?.value === selectedItems);
    }
    if (isMulti && isGroupped) {
      return items
        .flatMap((item) => item?.options)
        .filter((item) => selectedItems.includes(item?.value));
    }
    if (includeSelectAll && selectedItems.length === items.length) {
      return [selectAllOption];
    }
    return items
      .filter((item) => selectedItems.includes(item?.value || item._id))
      .map((item) => ({
        label: item?.label || item?.name,
        value: item?.value || item._id,
      }));
  }, [items, selectedItems, isMulti, isGroupped, includeSelectAll]);

  const MoreSelectedBadge = ({ items }) => {
    const title = items.join(", ");
    const length = items.length;
    const label = maxItemCustomMessage(length);

    return (
      <div
        className="smallFont fw-bold text-dark"
        style={{ margin: "1px 1px", fontSize: "12px" }}
        title={title}
      >
        {label}
      </div>
    );
  };

  const MultiValue = ({ index, getValue, ...props }) => {
    const overflow = getValue()
      .slice(maxToShow)
      .map((x) => x.label);

    return index < maxToShow ? (
      <components.MultiValue {...props} />
    ) : index === maxToShow ? (
      <MoreSelectedBadge
        items={showMessageOnlyOnOverflow ? getValue() : overflow}
      />
    ) : null;
  };

  return (
    <Select
      isDisabled={disabled}
      components={{ MultiValue }}
      styles={{
        control: (provided, state) => ({
          ...provided,
          background: fieldColors?.backgroundColor || "#fff",
          borderColor: "#ced9d9",
          minHeight: height,
          // height: height,
          fontSize: 12,
        }),
        menuList: (provided, state) => ({
          ...provided,
          fontSize: "12px",
          maxHeight: "200px",
          overflowY: "auto",
          textWrap: "wrap",
          zIndex: 9999999999,
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          minHeight: height,
          padding: "0px 5px",
          marginTop: "0px",
        }),
        input: (provided, state) => ({
          ...provided,
          margin: "0px",
          padding: "0px",
        }),
        indicatorSeparator: (state) => ({
          display: "none",
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          maxHeight: 20,
          margin: "auto 0px",
          padding: "0px",
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,

          width: "fit-content",
          padding: 0,
        }),
        multiValue: (provided, state) => ({
          ...provided,
          fontSize: "12px",
          height: "20px",
        }),
        placeholder: (provided, state) => ({
          ...provided,
          fontSize: "12px",
          margin: "1px 1px",
        }),
        menuPortal: (provided, state) => ({
          ...provided,
          zIndex: 9999999999,
          minWidth: "80px",
        }),
        option: (provided, { data, isDisabled, isFocused, isSelected }) => {
          let { backgroundColor, textColor, hoverColor } = data;
          return {
            ...provided,
            borderBottom:
              isGroupped && hoverColor
                ? `1px solid ${hoverColor}` || "gray"
                : undefined,
            backgroundColor:
              isGroupped && isSelected
                ? hoverColor || "#d89e31"
                : isGroupped
                ? backgroundColor || "#fff"
                : isSelected
                ? "#d89e31"
                : undefined,
            color: isGroupped
              ? textColor || "black"
              : isSelected
              ? textColor || "white"
              : undefined,
            fontSize: 12,
            ":hover": {
              backgroundColor: isFocused ? hoverColor || "#d89e31" : undefined,
              color: isFocused ? "white" : undefined,
            },
          };
        },
        singleValue: (base) => ({
          ...base,
          color: fieldColors?.textColor || "black",
        }),
        groupHeading: (base) => ({
          ...base,
          fontWeight: 600,
          fontSize: "12px",
        }),
        group: (base) => ({
          ...base,
          paddingTop: 0,
          background: "rgb(237, 237, 237)",
        }),
      }}
      isMulti={isMulti}
      options={options}
      value={value}
      onInputChange={setInputValue}
      onBlur={handleBlur}
      isClearable={isClearable}
      placeholder={placeholder}
      className="basic-multi-select"
      classNamePrefix="select"
      menuPortalTarget={document.body}
      onChange={handleChange}
      hideSelectedOptions={false}
      closeMenuOnSelect={closeMenuOnSelect}
      closeMenuOnScroll={closeMenuOnScroll}
      menuPlacement="auto"
    />
  );
};

export default CustomMultiSelect;

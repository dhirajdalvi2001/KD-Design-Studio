import { useState } from "react";
import {
  Breadcrumbs as NextUIBreadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import Typography from "../Typography/Typography";

export default function Breadcrumbs({ options }) {
  const navigate = useNavigate();
  const firstOption = options[options.length - 1].label;
  const [currentPage, setCurrentPage] = useState(firstOption);

  return (
    <NextUIBreadcrumbs
      onAction={(key) => setCurrentPage(key)}
      itemClasses={{
        item: "text-foreground-500 hover:text-text-foregroun-900 hover:underline data-[current=true]:text-foreground-800 data-[current=true]:font-semibold",
        separator: "text-foreground-500",
      }}
    >
      {options.map((option) => {
        return (
          <BreadcrumbItem
            key={option.label}
            isCurrent={currentPage === option.label}
            onPress={() => option.allowClick && navigate(option.value)}
          >
            {option.label}
          </BreadcrumbItem>
        );
      })}
    </NextUIBreadcrumbs>
  );
}

"use client";

import React, { JSX } from "react";

interface ClientHeadingProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

function ClientHeading({
  id,
  level,
  children,
  className,
  ...rest
}: ClientHeadingProps & React.HTMLAttributes<HTMLHeadingElement>) {
  // Create the heading based on the level without click handler
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return React.createElement(
    HeadingTag,
    {
      id,
      className,
      ...rest,
    },
    children,
  );
}

export function H1(
  props: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
  },
) {
  const id =
    typeof props.children === "string"
      ? props.children
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

  return (
    <ClientHeading
      id={id}
      level={1}
      className="mt-10 mb-4 text-3xl font-bold text-white"
      {...props}
    />
  );
}

export function H2(
  props: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
  },
) {
  const id =
    typeof props.children === "string"
      ? props.children
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

  return (
    <ClientHeading
      id={id}
      level={2}
      className="mt-8 mb-4 text-2xl font-bold text-white"
      {...props}
    />
  );
}

export function H3(
  props: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
  },
) {
  const id =
    typeof props.children === "string"
      ? props.children
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

  return (
    <ClientHeading
      id={id}
      level={3}
      className="mt-6 mb-3 text-xl font-bold text-white"
      {...props}
    />
  );
}

export function H4(
  props: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
  },
) {
  const id =
    typeof props.children === "string"
      ? props.children
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

  return (
    <ClientHeading
      id={id}
      level={4}
      className="mt-5 mb-2 text-lg font-bold text-white"
      {...props}
    />
  );
}

export function H5(
  props: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
  },
) {
  const id =
    typeof props.children === "string"
      ? props.children
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

  return (
    <ClientHeading
      id={id}
      level={5}
      className="mt-4 mb-2 text-base font-bold text-white"
      {...props}
    />
  );
}

export function H6(
  props: React.HTMLAttributes<HTMLHeadingElement> & {
    children: React.ReactNode;
  },
) {
  const id =
    typeof props.children === "string"
      ? props.children
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "";

  return (
    <ClientHeading
      id={id}
      level={6}
      className="text-foreground mt-4 mb-2 text-sm font-bold"
      {...props}
    />
  );
}

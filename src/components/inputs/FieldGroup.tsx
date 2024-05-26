import { Field, Label, Input } from "@headlessui/react";
import React from "react";

interface FieldGroupProps {
  label?: string;
  value: string | number;
}
const FieldGroup = ({ label, value }: FieldGroupProps) => (
  <Field>
    {label && <Label className="font-semibold">{label}</Label>}
    <Input className="mt-1 block" type="readonly" value={value} />
  </Field>
);

export default FieldGroup;

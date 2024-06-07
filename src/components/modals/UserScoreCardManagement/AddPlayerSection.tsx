"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";

interface AddPlayerSectionProps {
  errors: { name?: string; email?: string };
}

const AddPlayerSection: React.FC<AddPlayerSectionProps> = ({ errors }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <h3 className="font-bold text-lg">Add New Player!</h3>
      <div className="flex flex-col gap-4 p-2">
        <Input
          type="text"
          label="Name:"
          placeholder="First Last"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          container="w-full"
        />
        <Input
          type="email"
          label="Email:"
          placeholder="Optional@example.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          container="w-full"
        />
      </div>
    </>
  );
};

export default AddPlayerSection;

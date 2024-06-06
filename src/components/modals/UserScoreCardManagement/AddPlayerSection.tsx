"use client";

import React, { useEffect, useState, useCallback } from "react";

interface AddPlayerSectionProps {}

const AddPlayerSection: React.FC<AddPlayerSectionProps> = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  return (
    <>
      <h3 className="font-bold text-lg">Add New Player!</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Player Name</label>
        <input
          type="text"
          className={`input input-bordered w-full mt-1 ${errors.name ? "border-red-500" : ""}`}
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Player Email</label>
        <input
          type="email"
          className={`input input-bordered w-full mt-1 ${errors.email ? "border-red-500" : ""}`}
          placeholder="Player Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
    </>
  );
};

export default AddPlayerSection;

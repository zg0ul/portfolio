"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TECHNOLOGIES } from "@/components/TechIcons";

interface TechnologySelectorProps {
  value: string[];
  error?: string;
  onChange: (technologies: string[]) => void;
}

export default function TechnologySelector({
  value,
  error,
  onChange,
}: TechnologySelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTechToggle = (techId: string) => {
    if (value.includes(techId)) {
      onChange(value.filter((id) => id !== techId));
    } else {
      onChange([...value, techId]);
    }
  };

  return (
    <div className="bg-navy-800/50 border-navy-600 relative z-50 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
      <h3 className="text-foreground mb-4 text-lg font-semibold">
        Technologies <span className="text-red-500">*</span>
      </h3>

      {/* Selected Technologies */}
      <div className="mb-4">
        {value.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {value.map((techId) => {
              const tech = TECHNOLOGIES.find((t) => t.id === techId);
              const TechIcon = tech?.icon;
              return (
                <div
                  key={techId}
                  className="bg-neon/20 border-neon/30 flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
                >
                  {TechIcon && <TechIcon />}
                  <span>{tech?.name || techId}</span>
                  <button
                    onClick={() => handleTechToggle(techId)}
                    className="ml-1 transition-colors hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-navy-400 text-sm">No technologies selected</p>
        )}
      </div>

      {/* Add Technologies */}
      <div className="relative" ref={dropdownRef}>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="border-navy-600 bg-navy-700/50 hover:bg-navy-600 w-full justify-start"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Technologies
        </Button>

        {isDropdownOpen && (
          <div className="bg-navy-700/95 border-navy-600 fixed inset-x-4 z-[100] mt-2 max-h-60 overflow-y-auto rounded-lg border shadow-xl backdrop-blur-sm">
            <div className="p-2">
              {TECHNOLOGIES.map((tech) => {
                const isSelected = value.includes(tech.id);
                const TechIcon = tech.icon;
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => handleTechToggle(tech.id)}
                    className={`flex w-full items-center gap-2 rounded-md p-2 text-left transition-colors ${
                      isSelected
                        ? "bg-neon/20 text-neon"
                        : "hover:bg-navy-600/50"
                    }`}
                  >
                    <TechIcon />
                    <span>{tech.name}</span>
                    {isSelected && <Check className="ml-auto h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 flex items-center text-sm text-red-400">
          <AlertCircle className="mr-1 h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

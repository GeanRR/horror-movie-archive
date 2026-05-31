"use client";

import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme-store";
import {
  VISUAL_THEMES,
  VISUAL_THEME_LABELS,
  type VisualTheme,
} from "@/types/theme";

export function VisualThemeSettings() {
  const visualTheme = useThemeStore((s) => s.visualTheme);
  const setVisualTheme = useThemeStore((s) => s.setVisualTheme);

  return (
    <div className="space-y-2">
      <Label>Visual theme</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {VISUAL_THEME_LABELS[visualTheme]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={visualTheme}
            onValueChange={(v) => setVisualTheme(v as VisualTheme)}
          >
            {VISUAL_THEMES.map((theme) => (
              <DropdownMenuRadioItem key={theme} value={theme}>
                {VISUAL_THEME_LABELS[theme]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

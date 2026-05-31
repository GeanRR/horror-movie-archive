import { VisualThemeSettings } from "@/components/settings/visual-theme-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
      </div>
      <section className="max-w-md space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Appearance</h3>
        <VisualThemeSettings />
      </section>
    </div>
  );
}

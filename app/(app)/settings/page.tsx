import { ImportCsvSection } from "@/components/settings/import-csv-section";
import { BackupRestoreSection } from "@/components/settings/backup-restore-section";
import { LogoutSection } from "@/components/settings/logout-section";
import { StremioWatchedSyncSection } from "@/components/settings/stremio-watched-sync-section";

export default function SettingsPage() {
 return (
 <div className="space-y-10">
 <section
 className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-[24px] bg-cover bg-center px-6"
 style={{ backgroundImage: "url('/images/settings.png')" }}
 >
 <div className="absolute inset-0 bg-black/60" />
 <h1 className="relative z-10 archive-display-title text-center text-[4.75rem] md:text-[7rem] xl:text-[7.45rem]">
 Settings
 </h1>
 </section>

 <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 md:px-8">
 <section className="space-y-4 rounded-[24px] bg-black p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
 <div>
 <p className="font-sans text-sm text-[#6f6c7a]">
 Sync watched Stremio movies into Awaiting Review.
 </p>
 <h2 className="archive-anton mt-2 text-4xl uppercase leading-none text-[#e9e3d4] md:text-5xl">
 Stremio
 </h2>
 </div>
 <StremioWatchedSyncSection />
 </section>

 <section className="space-y-4 rounded-[24px] bg-black p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
 <div>
 <p className="font-sans text-sm text-[#6f6c7a]">
 Import, export and restore your archive data.
 </p>
 <h2 className="archive-anton mt-2 text-4xl uppercase leading-none text-[#e9e3d4] md:text-5xl">
 Data Management
 </h2>
 </div>
 <div className="max-w-2xl space-y-5">
 <ImportCsvSection />
 <BackupRestoreSection />
 </div>
 </section>

 <section className="space-y-4 rounded-[24px] bg-black p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
 <div>
 <p className="font-sans text-sm text-[#6f6c7a]">
 End this browser session.
 </p>
 <h2 className="archive-anton mt-2 text-4xl uppercase leading-none text-[#e9e3d4] md:text-5xl">
 Security
 </h2>
 </div>
 <LogoutSection />
 </section>
 </div>
 </div>
 );
}

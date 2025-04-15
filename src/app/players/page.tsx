import Player from "@/components/ui/player";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return (
    <div className="grid grid-rows-[5%_1fr_5%] items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
        <Player />
      </main>
    </div>
  );
}

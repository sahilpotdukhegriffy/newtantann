import dynamic from "next/dynamic";

// Dynamically import TinderCards component with SSR disabled
const TinderCards = dynamic(() => import("./components/TinderCards"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <TinderCards />
    </div>
  );
}

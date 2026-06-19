import SceneOpening from "./components/SceneOpening";
import SceneDream from "./components/SceneDream";
import SceneEconomy from "./components/SceneEconomy";
import SceneGap from "./components/SceneGap";
import SceneWhy from "./components/SceneWhy";
import SceneWord from "./components/SceneWord";
import SceneModel from "./components/SceneModel";
import SceneVision from "./components/SceneVision";
import SceneCall from "./components/SceneCall";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative">
      <div className="grain" aria-hidden="true" />
      <CursorGlow />
      <ScrollProgress />

      {/* 1. The dream — you've been wanting to build something */}
      <SceneOpening />

      {/* 2. What are you building? Personal connection */}
      <SceneDream />

      {/* 3. Why it matters — the economic case for builders */}
      <SceneEconomy />

      {/* 4. The gap — what stops most men */}
      <SceneGap />

      {/* 5. Our conviction — why we exist */}
      <SceneWhy />

      {/* 6. Our name is our model */}
      <SceneWord />

      {/* 7. How we work */}
      <SceneModel />

      {/* 8. What it becomes */}
      <SceneVision />

      {/* 9. The call */}
      <SceneCall />

      <Footer />
    </main>
  );
}

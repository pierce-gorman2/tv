import SceneOpening from "./components/SceneOpening";
import SceneDream from "./components/SceneDream";
import SceneProblem from "./components/SceneProblem";
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

      <SceneOpening />
      <SceneDream />
      <SceneProblem />
      <SceneWhy />
      <SceneWord />
      <SceneModel />
      <SceneVision />
      <SceneCall />
      <Footer />
    </main>
  );
}

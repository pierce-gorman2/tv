import SceneOpening from "./components/SceneOpening";
import SceneProblem from "./components/SceneProblem";
import SceneWhy from "./components/SceneWhy";
import SceneWord from "./components/SceneWord";
import SceneModel from "./components/SceneModel";
import SceneVision from "./components/SceneVision";
import SceneCall from "./components/SceneCall";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      <SceneOpening />
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

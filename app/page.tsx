import SceneOpening from "./components/SceneOpening";
import SceneManifesto from "./components/SceneManifesto";
import SceneDream from "./components/SceneDream";
import SceneStatGDP from "./components/SceneStatGDP";
import SceneStatJobs from "./components/SceneStatJobs";
import SceneStatNewJobs from "./components/SceneStatNewJobs";
import SceneGap from "./components/SceneGap";
import SceneWhy from "./components/SceneWhy";
import SceneWord from "./components/SceneWord";
import SceneModel from "./components/SceneModel";
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

      {/* 1. You've been dreaming about building something */}
      <SceneOpening />

      {/* 2. You were not created to consume — you were created to build */}
      <SceneManifesto />

      {/* 3. What is it you're building? */}
      <SceneDream />

      {/* 4–6. Three full-screen animated stat scenes */}
      <SceneStatGDP />
      <SceneStatJobs />
      <SceneStatNewJobs />

      {/* 7. The gap — what stops most men */}
      <SceneGap />

      {/* 8. Our conviction */}
      <SceneWhy />

      {/* 9. Our name is our model */}
      <SceneWord />

      {/* 10. How we work */}
      <SceneModel />

      {/* 11. The call */}
      <SceneCall />

      <Footer />
    </main>
  );
}

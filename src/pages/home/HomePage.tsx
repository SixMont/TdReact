import Credits from "../../components/common/Credits";
import InfoBar from "../../components/common/InfoBar";
import PlayButton from "../../components/common/PlayButton";

export default function HomePage() {
  return (
    <div>
      <header>
        <InfoBar />
      </header>
      <PlayButton />
      <footer>
        <Credits />
      </footer>
    </div>
  )
}

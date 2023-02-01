import BrushTeethVideo from "../Components/Kids/BrushTeethVideo";
import WashHandsVideo from "../Components/Kids/WashHandsVideo";
import Effect from "../Components/Kids/Effect";
import PageParticles from "../Components/Kids/PageParticles";

function Kids() {
  const play_hand_wash_video = false;
  const play_teeth_video = true;
  return (
    <>
      <h1>Kids</h1>
      {play_hand_wash_video ? (
        <div>
          <PageParticles />
          <Effect />
          <WashHandsVideo />
        </div>
      ) : (
        <div>
          <PageParticles />
          <Effect />
          <BrushTeethVideo />
        </div>
      )}
    </>
  );
}

export default Kids;

import ConferenceRoom from "@/components/NewDesk";
import TopBar from "@/components/Topbar";

export default function Room() {
  return (
    <>
      <TopBar />
      <ConferenceRoom
        deskId={0}
        userId={""}
        userName={""}
        onClickReserve={() => {}}
        onClickUnreserve={() => {}}
      />
    </>
  );
}

import { useTranslation } from "react-i18next";
import { Button } from "../../components/atoms";
import { Navbar } from "../../components/organisms";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../../contexts";
import axiosInstance from "../../services/axios-instance";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setTitle, setLoading } = useSpinner();

  const createRoom = async () => {
    setTitle(t("screens.home.creating_room"));
    setLoading(true);

    try {
      const response = await axiosInstance.post("/scrumPoker/create");

      navigate(`/room/${response.data.roomId}`);
    } catch (error) {
      alert(t("screens.home.error_creating_room"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center w-full h-screen">
      <Navbar />
      <section className="flex items-center justify-center w-full h-full bg-gray-700">
        <Button onClick={createRoom}>{t("screens.home.new_room")}</Button>
      </section>
    </main>
  );
}

export default Home;

import { useForm } from "react-hook-form";
import { Board, Button, Deck, FormInput, Player } from "../../components/atoms";
import { useEffect, useState } from "react";

function Room() {
  const roomForm = useForm();

  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [playerCards, setPlayerCards] = useState({});

  useEffect(() => {
    // socket.on('updatePlayers', (rooms) => {
    //   setPlayers(Object.keys(rooms));
    // });
    // socket.on('cardChosen', (playerName, cardValue) => {
    //   setPlayerCards((prevPlayerCards) => ({
    //     ...prevPlayerCards,
    //     [playerName]: cardValue,
    //   }));
    // });
    // socket.on('reveal', () => {
    //   setShowCards(true);
    // });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const handleCreateRoom = (data: any) => {
    console.log("handleJoin", data);
    // socket.emit('join', playerName);
  };

  const handleJoinRoom = (data: any) => {
    console.log("handleJoin", data);
    // socket.emit('join', playerName);
  };

  const handleCardSelect = (cardValue: any) => {
    console.log("handleCardSelect", cardValue);
    setSelectedCard(cardValue);
    // socket.emit('chooseCard', playerName, cardValue);
  };

  const handleRevealCards = () => {
    console.log("handleRevealCards");
    // socket.emit('revealCards');
  };

  const handleRestartVoting = () => {
    console.log("handleRestartVoting");
    // socket.emit('restartVoting');
  };

  return (
    <div className="flex w-full h-screen justify-evenly">
      <div>
        <p>Player module</p>
        <Deck onCardSelect={handleCardSelect} />
        <Player name={playerName} selectedCard={selectedCard} />
        <Board
          players={players}
          playerCards={playerCards}
          showCards={showCards}
        />
      </div>
      <div>
        <p>room module</p>
        <p>New room:</p>
        <form onSubmit={roomForm.handleSubmit(handleCreateRoom)}>
          <FormInput
            id="roomName"
            type="text"
            label="Room name:"
            register={roomForm.register("roomName")}
            error={roomForm.formState.errors.roomName}
          />

          <Button type="submit">Create room</Button>
        </form>

        <p>Join room:</p>
        <form onSubmit={roomForm.handleSubmit(handleJoinRoom)}>
          <FormInput
            id="roomId"
            type="number"
            label="Room id:"
            register={roomForm.register("roomId")}
            error={roomForm.formState.errors.roomId}
          />

          <FormInput
            id="playerName"
            type="text"
            label="Player name:"
            register={roomForm.register("playerName")}
            error={roomForm.formState.errors.playerName}
          />

          <Button type="submit">Enter room</Button>
        </form>
      </div>
      <div>
        <p>Room administrator module</p>
        <p>All players:</p>

        <p>Actions:</p>
        <Button onClick={handleRevealCards}>Reveal cards</Button>
        <Button onClick={handleRestartVoting}>Restart round</Button>
        <Button onClick={handleRevealCards}>End room</Button>
      </div>
    </div>
  );
}

export default Room;

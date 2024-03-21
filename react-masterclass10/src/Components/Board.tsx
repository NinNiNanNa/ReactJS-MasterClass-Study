import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFormThis: boolean;
}

const Area = styled.div<IAreaProps>`
  padding: 20px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#dfe6e9"
      : props.$isDraggingFormThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
  // toDos: string[];
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    console.log(toDo);
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        // 새로 생성한 todo가 맨 아래에 오고 싶을때
        // [boardId]: [...allBoards[boardId], newToDo],
        // 새로 생성한 todo가 맨 위에 오고 싶을때
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFormThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              // <DraggableCard key={toDo} toDo={toDo} index={index} />
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

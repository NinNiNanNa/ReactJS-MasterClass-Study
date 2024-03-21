import React from "react";
import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  // 🟡 인자를 받는 함수를 만들어서
  // const onClick = (newCategory: IToDo["category"]) => {
  //   console.log("I wanna to ", newCategory);
  // };

  // 🔵 일반 함수를 만들어서
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("I wanna to ", event.currentTarget.name);
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      /*
      target의 경로 찾기
      oldToDos의 array를 받아오고 있고
      이 array에서 toDo의 index를 찾기 위해
      toDo의 id가 props에서 오는 id와 같은지 비교
      */
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // console.log(targetIndex);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      // console.log(oldToDo, newToDo);
      // console.log(
      //   "replace the to do in the index ",
      //   targetIndex,
      //   " width ",
      //   newToDo
      // );

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>

      {/* 🟡 새 익명 함수를 선언해 인자를 넘겨주는 방법 */}
      {/* 
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
       */}

      {/* 🔵 event를 통해 button의 name속성을 받아오는 방법 */}
      {/* 
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
       */}

      {/* enum 사용 */}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;

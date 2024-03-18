import { useState } from "react";
import { useForm } from "react-hook-form";
/* 
function ToDoList() {
  const [toDo, setTodo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
    setToDoError("");
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(toDo);

    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write a to do"
        />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}
*/

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password1: string;
  password2: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    // console.log(data);
    if (data.password1 !== data.password2) {
      setError(
        "password2",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
  // console.log(register("toDo"));
  // console.log(watch());
  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* <input {...register("toDo")} placeholder="Write a to do" /> */}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed.",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message as string}</span>
        <input
          {...register("firstName", {
            required: "Write here",
            // validate: (value) => value.includes("nico") ? "no nicos allowed" : true,
            // 두가지 이상을 검사할때 객체리터럴을 사용하면 된다.
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nicks allowed" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message as string}</span>
        <input
          {...register("lastName", { required: "Write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message as string}</span>
        <input
          {...register("userName", { required: "Write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.userName?.message as string}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message as string}</span>
        <input
          {...register("password2", { required: "Write here", minLength: 5 })}
          placeholder="Password2"
        />
        <span>{errors?.password2?.message as string}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message as string}</span>
      </form>
    </div>
  );
}

export default ToDoList;
